"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MCPMessage } from "@/types/mcp.types";
import { cn } from "@/lib/utils";

export function ChatbotDialog() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MCPMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available tools and show as initial message
  // IMPORTANT: This useEffect must be called before any conditional returns
  // to comply with the Rules of Hooks
  useEffect(() => {
    // Only run if we have a valid session
    if (!session) return;
    
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/mcp-client");
        const data = await response.json();
        
        if (data.tools && data.tools.length > 0) {
          const toolsList = data.tools
            .map((tool: any) => `• **${tool.name}**: ${tool.description}`)
            .join("\n");
          
          const welcomeMessage: MCPMessage = {
            role: "assistant",
            content: `Hi! I'm your CRM assistant. Here's what I can help you with:\n\n${toolsList}\n\nFeel free to ask me anything!`,
          };
          
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      }
    };

    // Only fetch tools if messages are empty (first load)
    if (messages.length === 0) {
      fetchTools();
    }
  }, [messages, session]);

  // Early returns AFTER all hooks have been called
  if (status === "loading") {
    return null; 
  }

  if (!session) {
    return null; 
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: MCPMessage = {
      role: "user",
      content: input,
    };

 
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/mcp-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: MCPMessage = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      
      
      const errorMessage: MCPMessage = {
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}. Please try again or contact support if the issue persists.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Chatbot card */}
      <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">CRM Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">
              Hi! I'm your CRM assistant. Ask me anything about your projects,
              tasks, or let me help you with emails and invoices.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-muted"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          size="icon"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
    </>
  );
}
