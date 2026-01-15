// MCP Client Types
export interface MCPMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MCPChatRequest {
  message: string;
  history?: MCPMessage[];
  projectSlug?: string;  // Current project context from URL
  userId?: string;        // User ID for fetching user projects
}

export interface MCPChatResponse {
  message: string;
  error?: string;
}

export interface MCPToolCall {
  name: string;
  arguments: Record<string, any>;
}

export interface MCPToolResult {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

// Client configuration
export interface MCPClientConfig {
  serverCommand: string;
  serverArgs?: string[];
  userId?: string;
  role?: string;
}
