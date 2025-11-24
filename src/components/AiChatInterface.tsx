"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ImageIcon, 
  Lightbulb, 
  Sparkles, 
  FileText, 
  Search, 
  Languages,
  Send,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui";
import ModelSelectorModal from "./ModelSelectorModal";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AiChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("chatgpt-5-mini");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestionButtons = [
    { icon: ImageIcon, label: "Create an image", color: "text-purple-600" },
    { icon: Lightbulb, label: "Give advice", color: "text-blue-600" },
    { icon: Sparkles, label: "Generate ideas", color: "text-pink-600" },
    { icon: FileText, label: "Summarize text", color: "text-indigo-600" },
    { icon: Search, label: "Analyze this data", color: "text-blue-500" },
    { icon: Languages, label: "Translate this", color: "text-purple-500" },
  ];

  const handleSuggestionClick = (label: string) => {
    setInputValue(label);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageContent = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModelDisplayName = () => {
    const modelNames: Record<string, string> = {
      "chatgpt-5-mini": "ChatGPT-5-mini",
      "stable-diffusion": "Stable Diffusion",
      "gemini": "Gemini",
      "claude": "Claude",
      "dall-e-3": "Dall-e-3",
      "perplexity": "Perplexity",
      "grok": "Grok",
      "chatgpt-4o-mini": "ChatGPT-4o-mini",
      "flux": "Flux",
    };
    return modelNames[selectedModel] || "ChatGPT-5-mini";
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-4 py-8">
      {/* Messages Area */}
      {messages.length > 0 && (
        <div className="w-full max-w-4xl mb-8 space-y-4 flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-gray-900 pb-6">
            What can I help with?
          </h1>
        </div>
      )}

      {/* Input Area */}
      <div className="w-full max-w-4xl mb-6">
        <div className="relative border-2 border-gray-200 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center px-4 py-3">
            <ImageIcon className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="flex-1 outline-none text-gray-700 placeholder:text-gray-400"
            />
            <div className="flex items-center gap-2 ml-3">
              <button 
                onClick={() => setIsModelModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">{getModelDisplayName()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Buttons */}
      {messages.length === 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl">
          {suggestionButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(button.label)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow"
              >
                <Icon className={`w-4 h-4 ${button.color}`} />
                <span className="text-sm font-medium text-gray-700">
                  {button.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />
    </div>
  );
};

export default AiChatInterface;
