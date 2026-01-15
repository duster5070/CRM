import { NextRequest, NextResponse } from "next/server";
import { mcpClient } from "@/lib/mcp-client.service";
import OpenAI from "openai";
import { MCPChatRequest } from "@/types/mcp.types";
import { getServerSession } from "next-auth";
import { getUserProjects } from "@/actions/projects";

/**
 * POST /api/mcp-client
 * Chatbot endpoint that uses OpenAI with MCP tools
 */
export async function POST(req: NextRequest) {
  try {
    // Get user session for context
    const session = await getServerSession();
    
    const body: MCPChatRequest = await req.json();
    const { message, history = [], projectSlug, userId } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check for API keys - support both OpenAI and Groq (free alternative)
    const useGroq = !process.env.OPENAI_API_KEY && process.env.GROQ_API_KEY;
    
    if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          error: "No AI API key configured. Please add OPENAI_API_KEY or GROQ_API_KEY (free) to your environment variables.",
          message: "I'm not fully configured yet. Please contact your administrator to set up the AI service."
        },
        { status: 503 }
      );
    }

    // Initialize AI client (OpenAI or Groq)
    const openai = new OpenAI({
      apiKey: useGroq ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY,
      baseURL: useGroq ? "https://api.groq.com/openai/v1" : undefined,
    });

    // Connect to MCP server if not already connected
    if (!mcpClient.isClientConnected()) {
      const serverCommand = process.env.MCP_SERVER_COMMAND || "node";
      const serverPath = process.env.MCP_SERVER_PATH;

      if (!serverPath) {
        return NextResponse.json(
          { error: "MCP server path not configured. Please add MCP_SERVER_PATH to your environment variables." },
          { status: 500 }
        );
      }

      await mcpClient.connect({
        serverCommand,
        serverArgs: [serverPath],
        userId: session?.user?.email || "anonymous",
        role: "USER",
      });
    }

    // Get available tools from MCP server
    const availableTools = await mcpClient.listTools();

    // Convert MCP tools to OpenAI function format
    const openaiTools: OpenAI.Chat.ChatCompletionTool[] = availableTools.map((tool: any) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));

    // Fetch project details and user projects for context
    let projectContext = "";
    
    if (projectSlug) {
      // Fetch full project details to get the project ID and other info
      try {
        const projectDetails = await (await import("@/actions/projects")).getProjectDetailsBySlug(projectSlug);
        
        if (projectDetails) {
          projectContext = `\n\nCONTEXT: The user is currently viewing project "${projectDetails.name}" (ID: ${projectDetails.id}, slug: ${projectSlug}, status: ${projectDetails.status}). When answering questions, assume they are asking about this specific project unless they specify otherwise. You can use the project ID "${projectDetails.id}" when calling MCP tools like get_project_summary or get_project_risk.`;
        } else {
          projectContext = `\n\nCONTEXT: The user is currently viewing a project page with slug "${projectSlug}", but project details could not be loaded.`;
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    } else if (userId && userId.trim()) {
      // Fetch all user projects for selection (only if userId is valid)
      try {
        const userProjects = await getUserProjects(userId);
        if (userProjects && userProjects.length > 0) {
          const projectsList = userProjects
            .map(p => `- **${p.name}** (ID: ${p.id}, slug: ${p.slug}, status: ${p.status})`)
            .join("\n");
          projectContext = `\n\nAVAILABLE PROJECTS: The user has the following projects:\n${projectsList}\n\nIf the user asks about projects or wants to summarize a project, you can refer to these projects by name or slug. When using MCP tools, use the project ID.`;
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    }

    // Build conversation messages
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a helpful CRM assistant. Use the available tools to help users with their projects, tasks, emails, and invoices. Be concise and professional.${projectContext}`
      },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Call AI with tools (use Groq model if using Groq, otherwise OpenAI)
    const modelName = useGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
    
    let response = await openai.chat.completions.create({
      model: modelName,
      messages,
      tools: openaiTools,
      tool_choice: "auto",
    });

    // Handle tool calls in a loop (agentic behavior)
    while (response.choices[0].finish_reason === "tool_calls") {
      const toolCalls = response.choices[0].message.tool_calls;
      
      if (!toolCalls || toolCalls.length === 0) break;

      // Add assistant's message with tool calls to history
      messages.push(response.choices[0].message as any);

      // Execute each tool call
      for (const toolCall of toolCalls) {
        // Type guard to ensure it's a function tool call
        if (toolCall.type !== "function") continue;
        
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        // Call the MCP tool
        const toolResult = await mcpClient.callTool({
          name: functionName,
          arguments: functionArgs,
        });

        // Extract text from tool result
        const toolResultText = toolResult.content
          .map((c) => c.text)
          .join("\n");

        // Add tool result to messages
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: toolResultText,
        });
      }

      // Get next response
      response = await openai.chat.completions.create({
        model: modelName,
        messages,
        tools: openaiTools,
        tool_choice: "auto",
      });
    }

    // Extract final text response
    const finalMessage = response.choices[0].message.content || "I couldn't generate a response.";

    return NextResponse.json({
      message: finalMessage,
    });
  } catch (error: any) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json(
      { 
        error: "Failed to process message",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/mcp-client
 * Get available MCP tools
 */
export async function GET() {
  try {
    // Connect to MCP server if not already connected
    if (!mcpClient.isClientConnected()) {
      const serverCommand = process.env.MCP_SERVER_COMMAND || "node";
      const serverPath = process.env.MCP_SERVER_PATH;

      if (!serverPath) {
        return NextResponse.json(
          { error: "MCP server path not configured" },
          { status: 500 }
        );
      }

      await mcpClient.connect({
        serverCommand,
        serverArgs: [serverPath],
      });
    }

    const tools = await mcpClient.listTools();

    return NextResponse.json({
      tools,
      connected: mcpClient.isClientConnected(),
    });
  } catch (error: any) {
    console.error("Error getting MCP tools:", error);
    return NextResponse.json(
      { error: "Failed to get tools", details: error.message },
      { status: 500 }
    );
  }
}
