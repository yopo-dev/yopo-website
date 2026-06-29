import Image from "next/image";

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
    chips: ["BMS monitoring", "AI anomaly detection", "Pay on savings only"],
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
    chips: ["Face recognition", "Resident app", "Intercom to phone"],
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

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {p.chips.map((c) => (
                  <span key={c}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${p.accent}44`,
                      color: p.accent,
                    }}>
                    {c}
                  </span>
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
