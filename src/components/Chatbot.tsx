"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Phone, MessageCircle, ShieldCheck, Sparkles, MapPin, ChevronRight, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
  contactButtons?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Welcome to Odisha Institute of Computer Applications (OICA)! I am your AI Virtual Assistant. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: [
        { label: "🎓 PGDCA & DCA Details", action: "courses_pgdca" },
        { label: "💻 Frontend, Backend & DevOps", action: "courses_dev" },
        { label: "⚡ How to Verify Certificate?", action: "verify_info" },
        { label: "👤 Contact Manager & Phone", action: "contact_info" },
        { label: "📍 Institute Address", action: "address_info" }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse: Message;

      if (lower.includes("pgdca") || lower.includes("dca") || lower.includes("course") || lower.includes("program")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "📘 Here are our top certified computer programs:\n\n1. PGDCA (1 Year Post Graduate Diploma)\n2. DCA (6 Months Diploma)\n3. Frontend Web Development (4 Months)\n4. Backend & Database Systems (4 Months)\n5. DevOps & Cloud Engineering (6 Months)\n6. Full Stack Software Engineering (6 Months)\n\nAll courses include capstone projects and 100% verifiable online credentials!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "👤 Speak with Manager", action: "contact_info" },
            { label: "⚡ Certificate Verification", action: "verify_info" }
          ]
        };
      } else if (lower.includes("verify") || lower.includes("certificate") || lower.includes("check") || lower.includes("number")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "⚡ Verification is simple!\n\n1. Scroll to the Verification Section on top.\n2. Enter your Certificate Registration Number (e.g., OICA-2026-CS0001).\n3. Click 'Verify Now' to view the authentic grade sheet, QR code, and download official PDF certificates.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "🔍 Try Sample ID: OICA-2026-CS0001", action: "sample_verify" },
            { label: "📞 Contact Support", action: "contact_info" }
          ]
        };
      } else if (lower.includes("address") || lower.includes("location") || lower.includes("where") || lower.includes("nirakarpur") || lower.includes("khordha")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "📍 Official Institute Address:\n\nAt- Nanapada, PO/PS- Nirakarpur, Dist- Khrodha, PIN- 752019, Odisha, India.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "📞 Call Manager", action: "contact_info" },
            { label: "💬 Open WhatsApp Chat", action: "whatsapp_action" }
          ]
        };
      } else if (lower.includes("manager") || lower.includes("sanjit") || lower.includes("contact") || lower.includes("phone") || lower.includes("mobile") || lower.includes("call") || lower.includes("whatsapp")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "👤 Institute Management Details:\n\n• Managed by: Sanjit Kumar Rautaray\n• Mobile Number: +91 9777735527\n• WhatsApp: Instant Chat Available\n\nYou can call directly or connect via WhatsApp below:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          contactButtons: true,
          options: [
            { label: "🎓 View Certified Courses", action: "courses_pgdca" }
          ]
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Thank you for your message! OICA Institute offers certified programs in PGDCA, DCA, Frontend, Backend, DevOps, and Full Stack Development. We are managed by Sanjit Kumar Rautaray (+91 9777735527) at At- Nanapada, PO/PS- Nirakarpur, Dist- Khrodha, PIN- 752019.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          contactButtons: true,
          options: [
            { label: "🎓 PGDCA & DCA", action: "courses_pgdca" },
            { label: "⚡ Verify Certificate", action: "verify_info" }
          ]
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  const handleOptionClick = (action: string) => {
    if (action === "courses_pgdca") {
      handleSendMessage("Tell me about PGDCA and DCA courses");
    } else if (action === "courses_dev") {
      handleSendMessage("What are the Web Development & DevOps programs?");
    } else if (action === "verify_info") {
      handleSendMessage("How can I verify a certificate?");
    } else if (action === "contact_info") {
      handleSendMessage("Give me the manager contact details and phone number");
    } else if (action === "address_info") {
      handleSendMessage("What is the official institute address?");
    } else if (action === "sample_verify") {
      setIsOpen(false);
      const verifyInput = document.getElementById("certificate-search-input") as HTMLInputElement;
      if (verifyInput) {
        verifyInput.value = "OICA-2026-CS0001";
        verifyInput.scrollIntoView({ behavior: "smooth" });
        verifyInput.focus();
      } else {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }
    } else if (action === "whatsapp_action") {
      window.open("https://wa.me/919777735527?text=Hello%20OICA%20Institute%2C%20I%20have%20an%20inquiry", "_blank");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="relative group">
          {/* Welcome Tooltip Badge */}
          <div className="absolute right-0 bottom-16 w-60 p-3 rounded-xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950 backdrop-blur-lg text-slate-200 text-xs flex items-center gap-2.5 animate-bounce">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
            <span>Need assistance? Chat with <strong>OICA AI Bot</strong> 👋</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-cyan-500/30 transition-all duration-300 ring-2 ring-white/20 group"
            aria-label="Open OICA Assistant"
          >
            <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </button>
        </div>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl shadow-cyan-950/50 backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5 font-mono">
                  OICA AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[11px] text-slate-400">Online • Odisha Institute Support</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setMessages([
                  {
                    id: Date.now().toString(),
                    sender: "bot",
                    text: "Conversation refreshed. How can I help you with PGDCA, DCA, or Certificate Verification?",
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    options: [
                      { label: "🎓 PGDCA & DCA Details", action: "courses_pgdca" },
                      { label: "👤 Manager & Contact", action: "contact_info" }
                    ]
                  }
                ])}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Refresh Chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-indigo-600"
                      : "bg-gradient-to-tr from-cyan-500 to-blue-600"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 space-y-2 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none shadow-md"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Contact Action Buttons inside message if applicable */}
                  {msg.contactButtons && (
                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href="tel:9777735527"
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Sanjit Kumar Rautaray (9777735527)</span>
                      </a>
                      <a
                        href="https://wa.me/919777735527?text=Hello%20OICA%20Institute%2C%20I%20have%20an%20inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Chat Now</span>
                      </a>
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800/80">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionClick(opt.action)}
                          className="px-2.5 py-1 rounded-full bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3 h-3 text-cyan-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] text-slate-400 text-right opacity-75">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-150" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-300" />
                  <span className="ml-1 text-[11px]">OICA Bot is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Drawer Footer Input */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about courses, verification, manager..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-40 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Managed by Sanjit Kumar Rautaray</span>
              <span className="text-emerald-400 font-mono">● Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
