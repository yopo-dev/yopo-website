import Image from "next/image";

const products = [
  {
    title: "Energy Intelligence",
    tagline: "Zero upfront cost",
    stat: "14%",
    statLabel: "avg. energy saved",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    imageAlt: "Building energy control systems",
    chips: ["AI anomaly detection", "BMS monitoring", "Pay on savings"],
    color: "#1B5E20",
  },
  {
    title: "Building Access",
    tagline: "Face recognition · Resident app",
    stat: "2s",
    statLabel: "avg. entry time",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    imageAlt: "Modern UAE high-rise building entrance",
    chips: ["Face recognition", "Mobile intercom", "Manager dashboard"],
    color: "#C59E3C",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0D2B10 0%, #0F1F11 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            What We Do
          </h2>
          <p className="text-green-300 text-lg opacity-70">
            Two product lines. One platform. Built for UAE buildings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.title}
              className="group relative rounded-3xl overflow-hidden"
              style={{
                border: `1px solid ${p.color}33`,
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
              }}>
              {/* Full-bleed image */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, #0D2B10 100%)" }} />

                {/* Stat badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-2xl text-center"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${p.color}55`,
                  }}>
                  <div className="text-2xl font-bold" style={{ color: p.color }}>{p.stat}</div>
                  <div className="text-xs text-white opacity-70">{p.statLabel}</div>
                </div>
              </div>

              {/* Card body — minimal text */}
              <div className="px-7 pb-7 -mt-1">
                <h3 className="text-2xl font-bold text-white mb-1">{p.title}</h3>
                <p className="text-sm mb-5 opacity-60" style={{ color: p.color }}>{p.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${p.color}18`,
                        color: p.color,
                        border: `1px solid ${p.color}33`,
                      }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}66, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
