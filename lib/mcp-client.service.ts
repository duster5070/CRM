import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCPClientConfig, MCPToolCall, MCPToolResult } from "@/types/mcp.types";

/**
 * MCP Client Service
 * Manages connection to the MCP server and handles tool calls
 */
class MCPClientService {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private isConnected: boolean = false;

  /**
   * Initialize and connect to the MCP server
   */
  async connect(config: MCPClientConfig): Promise<void> {
    if (this.isConnected) {
      console.log("MCP client already connected");
      return;
    }

    try {
      // Create stdio transport to communicate with the server
      this.transport = new StdioClientTransport({
        command: config.serverCommand,
        args: config.serverArgs || [],
        env: {
          ...process.env,
          MOCKED_USER_ID: config.userId || process.env.MOCKED_USER_ID || "",
          MOCKED_USER_ROLE: config.role || process.env.MOCKED_USER_ROLE || "",
        },
      });

      // Create MCP client
      this.client = new Client(
        {
          name: "CRM-Chatbot-Client",
          version: "1.0.0",
        },
        {
          capabilities: {},
        }
      );

      // Connect client to transport
      await this.client.connect(this.transport);
      this.isConnected = true;

      console.log("MCP client connected successfully");
    } catch (error) {
      console.error("Failed to connect MCP client:", error);
      throw new Error(`MCP connection failed: ${error}`);
    }
  }

  /**
   * Disconnect from the MCP server
   */
  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      if (this.client) {
        await this.client.close();
      }
      this.isConnected = false;
      this.client = null;
      this.transport = null;
      console.log("MCP client disconnected");
    } catch (error) {
      console.error("Error disconnecting MCP client:", error);
    }
  }

  /**
   * List available tools from the MCP server
   */
  async listTools(): Promise<any[]> {
    if (!this.client || !this.isConnected) {
      throw new Error("MCP client not connected");
    }

    try {
      const response = await this.client.listTools();
      return response.tools || [];
    } catch (error) {
      console.error("Error listing tools:", error);
      throw error;
    }
  }

  /**
   * Call a tool on the MCP server
   */
  async callTool(toolCall: MCPToolCall): Promise<MCPToolResult> {
    if (!this.client || !this.isConnected) {
      throw new Error("MCP client not connected");
    }

    try {
      const result = await this.client.callTool({
        name: toolCall.name,
        arguments: toolCall.arguments,
      });

      return result as MCPToolResult;
    } catch (error) {
      console.error(`Error calling tool ${toolCall.name}:`, error);
      throw error;
    }
  }

  /**
   * Check if client is connected
   */
  isClientConnected(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const mcpClient = new MCPClientService();
