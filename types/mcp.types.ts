// MCP Client Types
export interface MCPMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MCPChatRequest {
  message: string;
  history?: MCPMessage[];
  projectSlug?: string;  
  userId?: string;      
}

export interface MCPChatResponse {
  message: string;
  error?: string;
  toolCalls?: MCPToolCall[];
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


export interface MCPClientConfig {
  serverCommand: string;
  serverArgs?: string[];
  userId?: string;
  role?: string;
}
