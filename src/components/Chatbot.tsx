import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquareCode,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "../types";
import { CHAT_PROMPT_SUGGESTIONS, PORTFOLIO_INFO } from "../data/portfolioData";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
  onPromptConsumed?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialPrompt,
  onPromptConsumed,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: `Hello! 👋 I'm **RoiBot**, John Roi Magnaye's AI portfolio assistant powered by **Gemini 3.8 Flash**.

I'm ready to answer any questions about John Roi's:
- 🚀 **Projects & Architecture**
- ⚡ **Technical Skills & Tooling**
- 💼 **Work Experience & Impact**
- 📬 **Availability & Contact Info**

Feel free to ask a question or pick one of the quick suggestions below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Handle external prompts sent into the chatbot
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onPromptConsumed) {
        onPromptConsumed();
      }
    }
  }, [initialPrompt]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply: string = data.reply || "Sorry, I couldn't process that response.";

      const assistantMessage: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: `I'm having a brief connection hitch. You can also reach John directly at **${PORTFOLIO_INFO.email}**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-cleared",
        role: "assistant",
        content: `Chat history cleared. How can I assist you with John Roi's portfolio today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <button
          id="floating-chat-trigger"
          onClick={onOpen}
          aria-label="Open Portfolio AI Chatbot"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group cursor-pointer border border-emerald-400/40"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
            </span>
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-xs font-bold leading-tight flex items-center gap-1">
              Ask RoiBot
              <Sparkles className="w-3 h-3 text-emerald-200" />
            </span>
            <span className="text-[10px] text-emerald-100 opacity-90 leading-tight">
              Portfolio AI Assistant
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden ${
            isExpanded
              ? "inset-4 sm:inset-10 rounded-3xl"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[88vh] rounded-2xl"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-stone-100">RoiBot</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    Gemini 3.8
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">John Roi's Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-stone-400">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg hover:text-stone-200 hover:bg-stone-800 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-stone-200 hover:bg-stone-800 transition-colors hidden sm:block"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:text-stone-200 hover:bg-stone-800 transition-colors"
                title="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggested Prompts Pill Bar */}
          <div className="px-3 py-2 bg-stone-950/60 border-b border-stone-800/70 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider pl-1 shrink-0">
              Suggestions:
            </span>
            {CHAT_PROMPT_SUGGESTIONS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600/50 border border-stone-700/60 text-stone-300 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-900/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? msg.isError
                          ? "bg-rose-950/40 border border-rose-800/60 text-rose-200"
                          : "bg-stone-950/90 border border-stone-800 text-stone-200 shadow-sm"
                        : "bg-emerald-600 text-white shadow-sm rounded-tr-sm"
                    }`}
                  >
                    {isAssistant ? (
                      <div className="markdown-body space-y-2 prose prose-invert max-w-none text-xs sm:text-sm">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-2 mt-1 border-t border-stone-800/40 text-[10px] text-stone-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {isAssistant && (
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="hover:text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 text-stone-400 text-xs pl-1">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-[11px] text-stone-400 ml-1">RoiBot is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-stone-950 border-t border-stone-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about John Roi's skills, projects, or experience..."
                className="flex-1 max-h-24 p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none leading-normal transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-stone-400 px-1 pt-2 font-mono">
              <span>Press Enter to send</span>
              <span>Gemini 3.8 Flash</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
