"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SCENARIOS = [
  {
    label: "Face Entry",
    headline: "Walk in. No phone out.",
    body: "Face recognised at the door in under 2 seconds. No cards, no PINs, no fumbling.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85",
    accent: "#4CAF50",
    stat: "< 2s",
    statLabel: "to unlock",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 10a3 3 0 11-6 0 3 3 0 016 0zM5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804" />
      </svg>
    ),
  },
  {
    label: "Visitor Call",
    headline: "See your visitor. Open the door. From anywhere.",
    body: "Visitor presses the intercom — your phone rings instantly. See them, talk, and let them in remotely.",
    img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=85",
    accent: "#C59E3C",
    stat: "Worldwide",
    statLabel: "remote access",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Community",
    headline: "Your building, connected.",
    body: "Announcements, community updates, and package alerts — all in one feed for every resident.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85",
    accent: "#4CAF50",
    stat: "1 app",
    statLabel: "for everything",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const ACCESS_STEPS = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    title: "Hardware installed",
    body: "Face recognition cameras go in at all entrances. 1–2 days. No rewiring, no disruption.",
    tag: "Day 1",
    accent: "#4CAF50",
  },
  {
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80",
    title: "Residents enrol",
    body: "Download the app, take a selfie, done. 2 minutes. Works on any iPhone or Android.",
    tag: "2 min setup",
    accent: "#C59E3C",
  },
  {
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=300&q=80",
    title: "Walk straight in",
    body: "Face recognised in under 2 seconds. Door opens. No phone out, no card, no PIN.",
    tag: "Under 2s",
    accent: "#4CAF50",
  },
  {
    img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80",
    title: "Visitors call your phone",
    body: "Intercom rings your mobile, anywhere in the world. See, talk, and open the door remotely.",
    tag: "Anywhere",
    accent: "#C59E3C",
  },
];

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
    FLOW_NODES.forEach((_, i) => setTimeout(() => setLit((p) => [...p, i]), i * 600));
  }, [active]);

  return (
    <div className="flex items-center justify-between gap-0 py-4 px-2">
      {FLOW_NODES.map((node, i) => (
        <div key={node.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500"
              style={{
                background: lit.includes(i) ? "rgba(197,158,60,0.15)" : "rgba(255,255,255,0.03)",
                border: lit.includes(i) ? "1px solid rgba(197,158,60,0.5)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: lit.includes(i) ? "0 0 24px rgba(197,158,60,0.25)" : "none",
                transform: lit.includes(i) ? "scale(1.1)" : "scale(1)",
              }}>
              {node.icon}
            </div>
            <p className="text-white text-xs font-bold text-center">{node.label}</p>
            <p className="text-gray-600 text-xs text-center">{node.sub}</p>
          </div>
          {i < FLOW_NODES.length - 1 && (
            <div className="flex-1 relative h-0.5 mx-2" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-y-0 left-0 transition-all duration-500 rounded-full"
                style={{
                  right: lit.includes(i + 1) ? "0" : "100%",
                  background: "linear-gradient(90deg, #1B5E20, #C59E3C)",
                }} />
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
  const [activeStep, setActiveStep] = useState(-1);
  const [flowActive, setFlowActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ACCESS_STEPS.forEach((_, i) => setTimeout(() => setActiveStep(i), i * 250));
          setTimeout(() => setFlowActive(true), ACCESS_STEPS.length * 250 + 400);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 px-6 overflow-hidden"
      style={{ background: "#07090E" }}>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(197,158,60,0.06) 0%, transparent 70%)" }} />
      {/* Top/bottom fades */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050E06, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #07090E, transparent)" }} />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6"
            style={{ backgroundColor: "rgba(197,158,60,0.1)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Building Access
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Your phone is your key,<br />
            <span style={{ color: "#C59E3C" }}>your intercom, your community.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Yopo turns any building entrance into a smart, connected experience for residents, visitors, and managers.
          </p>
        </div>

        {/* 3 scenario tiles */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {SCENARIOS.map((s) => (
            <div key={s.label}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{ height: "380px", border: `1px solid ${s.accent}20` }}>

              {/* Background photo */}
              <Image src={s.img} alt={s.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />

              {/* Dark overlay — heavier at bottom */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)" }} />

              {/* Accent glow line top */}
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />

              {/* Label pill */}
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: `${s.accent}22`, color: s.accent, border: `1px solid ${s.accent}40`, backdropFilter: "blur(8px)" }}>
                {s.label}
              </div>

              {/* Stat badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-xl text-center"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="font-black text-lg leading-none" style={{ color: s.accent }}>{s.stat}</div>
                <div className="text-gray-400 text-xs mt-0.5">{s.statLabel}</div>
              </div>

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ color: s.accent }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: `${s.accent}20`, border: `1px solid ${s.accent}40`, backdropFilter: "blur(8px)" }}>
                  {s.icon}
                </div>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-black text-xl mb-2 leading-tight">{s.headline}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it's set up */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-center" style={{ color: "#C59E3C" }}>
            Getting started
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCESS_STEPS.map((step, i) => (
              <div key={step.title}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: activeStep >= i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.01)",
                  border: activeStep >= i ? `1px solid ${step.accent}35` : "1px solid rgba(255,255,255,0.04)",
                  opacity: activeStep >= i ? 1 : 0.2,
                  transform: activeStep >= i ? "translateY(0)" : "translateY(12px)",
                }}>

                {/* Thumbnail */}
                <div className="relative h-32 overflow-hidden">
                  <Image src={step.img} alt={step.title} fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
                  <div className="absolute top-3 left-3 text-3xl font-black opacity-60 text-white"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs font-black"
                    style={{ backgroundColor: step.accent, color: "#000" }}>
                    {step.tag}
                  </div>
                </div>

                {/* Text */}
                <div className="p-4">
                  <p className="font-bold text-white text-sm mb-1">{step.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor flow */}
        <div className="rounded-3xl p-6 md:p-10 mb-6"
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(197,158,60,0.15)",
          }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C59E3C" }} />
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#C59E3C" }}>
              Visitor Journey
            </p>
          </div>
          <p className="text-white font-bold text-lg mb-6">
            From pressing the intercom to door open: under 10 seconds.
          </p>
          <FlowDiagram active={flowActive} />
        </div>

        {/* Energy strip */}
        <div className="rounded-3xl p-6 md:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(27,94,32,0.12) 0%, rgba(5,14,6,0.6) 100%)",
            border: "1px solid rgba(76,175,80,0.2)",
          }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#4CAF50" }}>
              Energy Intelligence: also included
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Connect", body: "Read-only BMS gateway. No disruption to operations.", color: "#4CAF50" },
              { num: "02", title: "Analyse", body: "AI detects inefficiencies across every system 24/7.", color: "#C59E3C" },
              { num: "03", title: "Save", body: "Verified savings reported monthly. Pay only on results.", color: "#4CAF50" },
            ].map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <span className="text-3xl font-black leading-none flex-shrink-0" style={{ color: s.color, opacity: 0.4 }}>{s.num}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{s.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes travelDot {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}
