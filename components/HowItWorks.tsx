"use client";

import { useEffect, useRef, useState } from "react";

// ── Phone mockup screens ──────────────────────────────────────────────
const SCREENS = [
  {
    label: "Face Entry",
    color: "#1B5E20",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-40 animate-ping" />
          <div className="w-20 h-20 rounded-full border-2 border-green-400 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          {/* Scan lines */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute left-0 right-0 h-0.5 bg-green-400 opacity-60"
              style={{ animation: "scanLine 2s linear infinite", top: "0%" }} />
          </div>
        </div>
        <p className="text-green-400 text-xs font-bold uppercase tracking-widest">Scanning face…</p>
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-green-400 rounded-full" style={{ width: "70%", animation: "growBar 2s ease-in-out infinite" }} />
        </div>
        <p className="text-white text-sm font-bold">Welcome back, Ahmed</p>
        <div className="px-4 py-2 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(27,94,32,0.3)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.4)" }}>
          ✓ Door Unlocked
        </div>
      </div>
    ),
  },
  {
    label: "Visitor Call",
    color: "#C59E3C",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-3 px-4">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-yellow-500/40 overflow-hidden">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p className="text-white font-bold text-sm">Visitor at Lobby</p>
        <p className="text-gray-400 text-xs">Main Entrance · Now</p>
        <div className="flex gap-4 mt-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ef4444" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: "#1B5E20" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>
        <button className="mt-1 px-4 py-2 rounded-xl text-xs font-bold" style={{ backgroundColor: "rgba(197,158,60,0.2)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.4)" }}>
          🔓 Open door remotely
        </button>
      </div>
    ),
  },
  {
    label: "Community",
    color: "#4CAF50",
    content: (
      <div className="flex flex-col h-full px-3 py-2 gap-2 overflow-hidden">
        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Building Feed</p>
        {[
          { from: "Management", msg: "Pool closed Fri 10–12 for maintenance", time: "2m ago", dot: "#C59E3C" },
          { from: "Unit 12B", msg: "Lost keys near the gym, please DM", time: "14m ago", dot: "#4CAF50" },
          { from: "Management", msg: "Package delivered to reception for 8A", time: "1h ago", dot: "#C59E3C" },
        ].map((item) => (
          <div key={item.from + item.time} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.dot }} />
              <span className="text-xs font-semibold text-white">{item.from}</span>
              <span className="text-gray-600 text-xs ml-auto">{item.time}</span>
            </div>
            <p className="text-gray-300 text-xs leading-snug">{item.msg}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const ACCESS_STEPS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Hardware installed",
    body: "Face recognition cameras go in at all entrances. Takes 1–2 days. No rewiring, no disruption.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Residents enrol",
    body: "Download the app, take a selfie, done. 2 minutes to set up. Works on any iPhone or Android.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Walk straight in",
    body: "Face recognised in under 2 seconds. Door opens. No phone out, no card, no PIN.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Visitors call your phone",
    body: "Intercom rings your mobile, anywhere in the world. See them, talk to them, open the door remotely.",
  },
];

const ENERGY_STEPS = [
  { num: "01", title: "Connect", body: "Read-only BMS gateway. No disruption to operations." },
  { num: "02", title: "Analyse", body: "AI detects inefficiencies across every system 24/7." },
  { num: "03", title: "Save", body: "Verified savings reported monthly. Pay only on results." },
];

// ── Visitor flow diagram nodes ────────────────────────────────────────
const FLOW_NODES = [
  { label: "Visitor", sub: "at entrance", icon: "👤" },
  { label: "Intercom", sub: "face camera", icon: "📷" },
  { label: "Yopo Cloud", sub: "AI matching", icon: "⚡" },
  { label: "Your Phone", sub: "anywhere", icon: "📱" },
  { label: "Door Opens", sub: "in 2 seconds", icon: "🔓" },
];

function FlowDiagram({ active }: { active: boolean }) {
  const [lit, setLit] = useState<number[]>([]);

  useEffect(() => {
    if (!active) { setLit([]); return; }
    setLit([]);
    FLOW_NODES.forEach((_, i) => {
      setTimeout(() => setLit((p) => [...p, i]), i * 600);
    });
  }, [active]);

  return (
    <div className="relative flex items-center justify-between gap-0 py-6 px-2">
      {FLOW_NODES.map((node, i) => (
        <div key={node.label} className="flex items-center flex-1 last:flex-none">
          {/* Node */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500"
              style={{
                background: lit.includes(i) ? "rgba(197,158,60,0.15)" : "rgba(255,255,255,0.03)",
                border: lit.includes(i) ? "1px solid rgba(197,158,60,0.5)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: lit.includes(i) ? "0 0 20px rgba(197,158,60,0.2)" : "none",
                transform: lit.includes(i) ? "scale(1.08)" : "scale(1)",
              }}>
              {node.icon}
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-bold leading-tight">{node.label}</p>
              <p className="text-gray-600 text-xs">{node.sub}</p>
            </div>
          </div>

          {/* Connector line with travelling pulse */}
          {i < FLOW_NODES.length - 1 && (
            <div className="flex-1 relative h-0.5 mx-2" style={{ background: "rgba(255,255,255,0.06)" }}>
              {/* Static fill */}
              <div className="absolute inset-y-0 left-0 transition-all duration-500 rounded-full"
                style={{
                  right: lit.includes(i + 1) ? "0" : "100%",
                  background: "linear-gradient(90deg, #1B5E20, #C59E3C)",
                }} />
              {/* Travelling dot */}
              {lit.includes(i) && !lit.includes(i + 1) && (
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#C59E3C",
                    boxShadow: "0 0 8px #C59E3C",
                    animation: "travelDot 0.55s linear forwards",
                  }} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [flowActive, setFlowActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-cycle phone screens
  useEffect(() => {
    const id = setInterval(() => setActiveScreen((s) => (s + 1) % SCREENS.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Trigger step + flow animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ACCESS_STEPS.forEach((_, i) => setTimeout(() => setActiveStep(i), i * 350));
          setTimeout(() => setFlowActive(true), ACCESS_STEPS.length * 350 + 400);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-28 px-6 overflow-hidden"
      style={{ background: "#050E06" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C59E3C" }}>
            How It Works
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Your phone is your key,<br />
            <span style={{ color: "#C59E3C" }}>your intercom, your community.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Yopo turns any building entrance into a smart, connected experience for residents, visitors, and managers.
          </p>
        </div>

        {/* Main: Phone + Steps */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 blur-3xl opacity-20 rounded-full"
                style={{ backgroundColor: SCREENS[activeScreen].color, transform: "scale(0.8)" }} />

              {/* Phone shell */}
              <div className="relative w-56 rounded-[2.5rem] overflow-hidden shadow-2xl"
                style={{
                  background: "#0a0a0a",
                  border: "6px solid #1a1a1a",
                  height: "440px",
                }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />

                {/* Status bar */}
                <div className="flex justify-between items-center px-5 pt-7 pb-1">
                  <span className="text-white text-xs font-bold">9:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-1.5 rounded-sm bg-white opacity-70" />
                    <svg className="w-3 h-3 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
                    </svg>
                  </div>
                </div>

                {/* App header */}
                <div className="px-4 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: SCREENS[activeScreen].color }}>
                      <span className="text-white text-xs font-black">Y</span>
                    </div>
                    <span className="text-white text-xs font-bold">Yopo</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${SCREENS[activeScreen].color}22`, color: SCREENS[activeScreen].color }}>
                    {SCREENS[activeScreen].label}
                  </span>
                </div>

                {/* Screen content */}
                <div className="mx-2 rounded-2xl overflow-hidden transition-all duration-500"
                  style={{ height: "320px", background: "#111" }}>
                  {SCREENS[activeScreen].content}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pt-2">
                  <div className="w-20 h-1 rounded-full bg-white opacity-30" />
                </div>
              </div>

              {/* Screen dots */}
              <div className="flex justify-center gap-2 mt-5">
                {SCREENS.map((_, i) => (
                  <button key={i} onClick={() => setActiveScreen(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ backgroundColor: i === activeScreen ? "#C59E3C" : "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5">
            {ACCESS_STEPS.map((step, i) => (
              <div key={step.title}
                className="flex gap-4 items-start p-5 rounded-2xl transition-all duration-500"
                style={{
                  background: activeStep >= i ? "rgba(197,158,60,0.06)" : "rgba(255,255,255,0.01)",
                  border: activeStep >= i ? "1px solid rgba(197,158,60,0.25)" : "1px solid rgba(255,255,255,0.04)",
                  opacity: activeStep >= i ? 1 : 0.3,
                  transform: activeStep >= i ? "translateX(0)" : "translateX(-12px)",
                }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: activeStep >= i ? "rgba(197,158,60,0.15)" : "rgba(255,255,255,0.04)",
                    color: activeStep >= i ? "#C59E3C" : "#555",
                    border: activeStep >= i ? "1px solid rgba(197,158,60,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  }}>
                  {step.icon}
                </div>
                <div>
                  <p className="font-bold text-white mb-1">{step.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor flow diagram */}
        <div className="rounded-3xl p-6 md:p-8 mb-16"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: "#C59E3C" }}>
            Visitor Journey
          </p>
          <p className="text-white font-bold text-lg mb-6">
            From pressing the intercom to door open: under 10 seconds.
          </p>
          <FlowDiagram active={flowActive} />
        </div>

        {/* Energy — compact strip */}
        <div className="rounded-3xl p-6 md:p-8"
          style={{ background: "rgba(27,94,32,0.06)", border: "1px solid rgba(27,94,32,0.2)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#4CAF50" }}>
              Energy Intelligence: also included
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {ENERGY_STEPS.map((s) => (
              <div key={s.num} className="flex gap-3 items-start">
                <span className="text-2xl font-black opacity-20 text-white leading-none">{s.num}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{s.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes growBar {
          0%, 100% { width: 40%; }
          50% { width: 85%; }
        }
        @keyframes travelDot {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}
