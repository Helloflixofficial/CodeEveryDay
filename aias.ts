import React, { useState, useRef, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Tab } from "../App";
import { Send, Bot, User, Copy, Check, Sparkles } from "lucide-react";
import clsx from "clsx";

interface AIAssistantProps {
  activeTab?: Tab;
  onCodeSuggestion: (code: string) => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  language?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  activeTab,
  onCodeSuggestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await invoke<string>("get_ai_suggestion", {
        prompt: input.trim(),
        language: activeTab?.language || "javascript",
        context: activeTab?.content || null,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response,
        timestamp: new Date(),
        language: activeTab?.language,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI request failed:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const insertCode = (code: string) => {
    onCodeSuggestion(code);
  };

  const extractCodeFromMessage = (content: string): string | null => {
    const codeBlockRegex = /``````/;
    const match = content.match(codeBlockRegex);
    return match ? match[1] : null;
  };

  const getQuickPrompts = () => [
    "Explain this code",
    "Add error handling",
    "Optimize performance",
    "Add unit tests",
    "Fix bugs",
    "Add documentation",
  ];

  return (
    <div className="h-full flex flex-col bg-sidebar-bg border-l border-gray-700">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-medium text-gray-200">AI Assistant</h3>
        </div>
        {activeTab && (
          <p className="text-xs text-gray-500 mt-1">
            Context: {activeTab.language}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          {getQuickPrompts().map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p className="text-sm">Ask me anything about your code!</p>
            <p className="text-xs mt-2">I can help with:</p>
            <ul className="text-xs mt-2 space-y-1">
              <li>• Code explanations</li>
              <li>• Bug fixes</li>
              <li>• Optimizations</li>
              <li>• Documentation</li>
            </ul>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "flex space-x-3",
              message.type === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.type === "ai" && (
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}

            <div
              className={clsx(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>

              {message.type === "ai" && (
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-600">
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {copiedId === message.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {extractCodeFromMessage(message.content) && (
                    <button
                      onClick={() => {
                        const code = extractCodeFromMessage(message.content);
                        if (code) insertCode(code);
                      }}
                      className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Insert Code</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {message.type === "user" && (
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div className="bg-gray-700 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask about ${activeTab?.language || "your code"}...`}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
