"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const FAQS: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["price", "cost", "fee", "pay", "upfront", "pricing"],
    answer:
      "Yopo operates on a performance-based model for energy. There's no upfront cost. You pay a share of the verified savings only. If we don't reduce your energy bill, you don't pay a thing. Building access (face recognition + resident app) is priced separately as a monthly subscription.",
  },
  {
    patterns: ["how", "work", "bms", "connect", "install", "setup"],
    answer:
      "We install a read-only gateway that connects to your existing BMS via BACnet/IP or Modbus. It takes 1–2 days and doesn't disrupt operations. Our AI then continuously monitors every data point, detects inefficiencies, and surfaces recommendations to your team. No writing to the BMS, your existing contractors stay in full control.",
  },
  {
    patterns: ["saving", "save", "reduction", "kwh", "percent", "%"],
    answer:
      "On average, Yopo buildings see a 10–15% reduction in common-area energy consumption. Savings are measured against a weather-adjusted baseline so the numbers are honest and auditable. The biggest wins typically come from HVAC scheduling, pump management, and lighting optimisation.",
  },
  {
    patterns: ["co2", "carbon", "environment", "green", "planet", "emission", "net zero", "climate"],
    answer:
      "Every building on Yopo contributes to the UAE's Net Zero 2050 strategy. A typical 50,000 sq ft residential tower saves around 200–300 tonnes of CO₂ per year, which is to planting over 10,000 trees annually. We provide monthly carbon impact reports you can use for ESG reporting.",
  },
  {
    patterns: ["face", "access", "recognition", "door", "entry", "resident", "app"],
    answer:
      "Yopo installs camera-based face recognition at building entrances. Residents enrol via a mobile app (iOS & Android) in under 2 minutes. The same app handles intercom calls routed to their phone, community announcements, and building updates. Property managers get a unified dashboard for access events and tenant communication.",
  },
  {
    patterns: ["dubai", "uae", "dewa", "local", "where"],
    answer:
      "We're based in Dubai and built specifically for the UAE market: DEWA tariffs, BACnet/IP BMS systems, and the high-rise residential and commercial buildings typical of Dubai Marina, JBR, Business Bay, and beyond. We were built here.",
  },
  {
    patterns: ["demo", "trial", "test", "see", "meet", "book", "contact", "talk"],
    answer:
      "Absolutely, we'd love to show you. Head to the Contact section on this page and fill in your details, or just tell me your email and I'll flag your interest directly to our team. A demo typically takes 30 minutes and covers both the energy dashboard and the access platform.",
  },
  {
    patterns: ["time", "long", "onboard", "start", "begin", "quick"],
    answer:
      "Onboarding is fast. BMS gateway installation takes 1–2 days. You'll start seeing live data within 24 hours and typically see your first optimisation recommendations within the first week. For building access, hardware installation and resident enrolment can be completed within a week.",
  },
  {
    patterns: ["security", "safe", "data", "privacy", "hack", "secure"],
    answer:
      "Security is built into the architecture. Our BMS gateway is read-only, we cannot write commands to your building systems. All data is encrypted in transit and at rest. Facial recognition data is stored securely and governed by UAE data protection regulations. We're happy to share our security documentation on request.",
  },
];

const FALLBACK =
  "Great question! I don't have a specific answer for that right now, but our team will. Head to the Contact section and drop us a message and we typically respond within a few hours.";

const SUGGESTIONS = [
  "How does Yopo connect to my BMS?",
  "What savings can I expect?",
  "How does face recognition work?",
  "Is there an upfront cost?",
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQS) {
    if (faq.patterns.some((p) => lower.includes(p))) return faq.answer;
  }
  return FALLBACK;
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm the Yopo AI assistant. Ask me anything about energy savings, building access, pricing, or how Yopo works.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 900 + Math.random() * 400);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Yopo AI chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #1B5E20, #C59E3C)" }}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute w-full h-full rounded-full animate-ping opacity-30"
            style={{ backgroundColor: "#C59E3C" }} />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ border: "1px solid rgba(27,94,32,0.15)", maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4"
            style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(197,158,60,0.25)" }}>
              <svg className="w-5 h-5" fill="none" stroke="#C59E3C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Yopo AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={m.role === "user"
                    ? { backgroundColor: "#1B5E20", color: "white", borderBottomRightRadius: 4 }
                    : { backgroundColor: "#f3f4f6", color: "#111", borderBottomLeftRadius: 4 }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-gray-100 flex gap-1 items-center" style={{ borderBottomLeftRadius: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-gray-400"
                      style={{ animation: `bounce 1s infinite ${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only when 1 message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 bg-white flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-green-50"
                  style={{ borderColor: "rgba(27,94,32,0.3)", color: "#1B5E20" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2 px-4 py-3 bg-white border-t border-gray-100"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Yopo…"
              className="flex-1 text-sm px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-green-600 bg-gray-50 text-gray-900"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: "#1B5E20" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
