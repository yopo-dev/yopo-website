import Image from "next/image";

const BmsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
  </svg>
);
const AiIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const SavingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const FaceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const AppIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
const IntercomIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const products = [
  {
    id: "energy",
    title: "Energy\nIntelligence",
    tagline: "Your building is wasting energy right now. We find it.",
    stat: "14%",
    statLabel: "avg reduction",
    stat2: "AED 0",
    stat2Label: "upfront cost",
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1400&q=85",
    imageAlt: "Building energy systems",
    chips: [
      { label: "BMS monitoring", icon: <BmsIcon /> },
      { label: "AI anomaly detection", icon: <AiIcon /> },
      { label: "Pay on savings only", icon: <SavingsIcon /> },
    ],
    align: "left",
    color: "#1B5E20",
    accent: "#4CAF50",
  },
  {
    id: "access",
    title: "Building\nAccess",
    tagline: "Walk in. Your face is your key.",
    stat: "2s",
    statLabel: "avg entry",
    stat2: "100%",
    stat2Label: "mobile managed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
    imageAlt: "Modern UAE skyscraper",
    chips: [
      { label: "Face recognition", icon: <FaceIcon /> },
      { label: "Resident app", icon: <AppIcon /> },
      { label: "Intercom to phone", icon: <IntercomIcon /> },
    ],
    align: "right",
    color: "#92701A",
    accent: "#C59E3C",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" style={{ background: "#050E06" }}>
      {/* Section header */}
      <div className="text-center pt-24 pb-12 px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C59E3C" }}>
          Platform
        </p>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          What We Do
        </h2>
      </div>

      {products.map((p, i) => (
        <div key={p.id} className="relative min-h-[92vh] flex items-center overflow-hidden">
          {/* Full-bleed background image */}
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            className="object-cover object-center"
            priority={i === 0}
          />

          {/* Directional gradient — left or right fade to dark */}
          <div className="absolute inset-0" style={{
            background: p.align === "left"
              ? "linear-gradient(90deg, rgba(5,14,6,0.97) 0%, rgba(5,14,6,0.85) 45%, rgba(5,14,6,0.2) 100%)"
              : "linear-gradient(270deg, rgba(5,14,6,0.97) 0%, rgba(5,14,6,0.85) 45%, rgba(5,14,6,0.2) 100%)",
          }} />
          {/* Bottom dark fade for section separation */}
          <div className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: "linear-gradient(to bottom, transparent, #050E06)" }} />

          {/* Content */}
          <div className={`relative max-w-6xl mx-auto w-full px-8 py-20 flex ${p.align === "right" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-lg">
              {/* Big title */}
              <h3 className="text-6xl md:text-7xl font-black text-white leading-none mb-6 whitespace-pre-line">
                {p.title}
              </h3>

              {/* Tagline */}
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                {p.tagline}
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mb-10">
                {[{ v: p.stat, l: p.statLabel }, { v: p.stat2, l: p.stat2Label }].map((s) => (
                  <div key={s.l} className="px-5 py-4 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${p.accent}33`,
                    }}>
                    <div className="text-3xl font-black mb-0.5" style={{ color: p.accent }}>{s.v}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Feature tiles */}
              <div className="flex gap-3">
                {p.chips.map((c) => (
                  <div key={c.label}
                    className="flex flex-col items-center gap-3 px-5 py-5 rounded-2xl flex-1 text-center"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${p.accent}33`,
                    }}>
                    {/* Large icon with glow */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                      style={{ backgroundColor: `${p.accent}18`, border: `1px solid ${p.accent}44` }}>
                      <div className="absolute inset-0 rounded-xl blur-md opacity-40"
                        style={{ backgroundColor: p.accent }} />
                      <span className="relative" style={{ color: p.accent }}>
                        {c.icon}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical section label */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${p.align === "left" ? "right-8" : "left-8"} hidden lg:flex items-center gap-3`}
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateY(50%)" }}>
            <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-30 text-white">
              {String(i + 1).padStart(2, "0")} / {products.length}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
