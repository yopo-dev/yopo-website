import Image from "next/image";

const energyFeatures = [
  { label: "BMS monitoring",       img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { label: "AI anomaly detection", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80" },
  { label: "Pay on savings only",  img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
];

const accessFeatures = [
  { label: "Face recognition",  img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80" },
  { label: "Resident app",      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { label: "Intercom to phone", img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80" },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" style={{ background: "#050E06" }} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C59E3C" }}>
            Platform
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What We Do
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            One platform. Two products. Smarter buildings from the inside out.
          </p>
        </div>

        {/* Two-product grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Energy Intelligence */}
          <div className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{ border: "1px solid rgba(76,175,80,0.2)", background: "rgba(255,255,255,0.02)" }}>

            {/* Background image with overlay */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=85"
                alt="Building energy systems"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(5,14,6,0.3) 0%, rgba(5,14,6,0.95) 100%)" }} />

              {/* Floating stats */}
              <div className="absolute bottom-4 left-5 flex gap-3">
                {[{ v: "14%", l: "avg reduction" }, { v: "AED 0", l: "upfront cost" }].map((s) => (
                  <div key={s.l} className="px-4 py-2.5 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(76,175,80,0.3)" }}>
                    <div className="text-2xl font-black mb-0" style={{ color: "#4CAF50" }}>{s.v}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.25)" }}>
                  Energy Intelligence
                </div>
                <h3 className="text-3xl font-black text-white leading-tight mb-2">
                  Find the waste.<br />
                  <span style={{ color: "#4CAF50" }}>Stop paying for it.</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Yopo connects to your BMS, monitors every system with AI, and pinpoints exactly where energy is being lost. You only pay when we save you money.
                </p>
              </div>

              {/* Feature tiles */}
              <div className="flex gap-2">
                {energyFeatures.map((c) => (
                  <div key={c.label}
                    className="relative flex-1 rounded-xl overflow-hidden group/tile"
                    style={{ height: "110px", border: "1px solid rgba(76,175,80,0.2)" }}>
                    <Image src={c.img} alt={c.label} fill className="object-cover transition-transform duration-500 group-hover/tile:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #4CAF50, transparent)" }} />
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
                      <span className="text-xs font-bold text-white leading-tight block">{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Building Access */}
          <div className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{ border: "1px solid rgba(197,158,60,0.2)", background: "rgba(255,255,255,0.02)" }}>

            {/* Background image with overlay */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85"
                alt="Modern UAE skyscraper"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(5,14,6,0.3) 0%, rgba(5,14,6,0.95) 100%)" }} />

              {/* Floating stats */}
              <div className="absolute bottom-4 left-5 flex gap-3">
                {[{ v: "2s", l: "avg entry" }, { v: "100%", l: "mobile managed" }].map((s) => (
                  <div key={s.l} className="px-4 py-2.5 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(197,158,60,0.3)" }}>
                    <div className="text-2xl font-black mb-0" style={{ color: "#C59E3C" }}>{s.v}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ backgroundColor: "rgba(197,158,60,0.1)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.25)" }}>
                  Building Access
                </div>
                <h3 className="text-3xl font-black text-white leading-tight mb-2">
                  Your face is your key.<br />
                  <span style={{ color: "#C59E3C" }}>Your phone is your intercom.</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Face recognition at every entrance, a resident app for your community, and visitor calls routed straight to your phone. No fobs, no buzzers.
                </p>
              </div>

              {/* Feature tiles */}
              <div className="flex gap-2">
                {accessFeatures.map((c) => (
                  <div key={c.label}
                    className="relative flex-1 rounded-xl overflow-hidden group/tile"
                    style={{ height: "110px", border: "1px solid rgba(197,158,60,0.2)" }}>
                    <Image src={c.img} alt={c.label} fill className="object-cover transition-transform duration-500 group-hover/tile:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #C59E3C, transparent)" }} />
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
                      <span className="text-xs font-bold text-white leading-tight block">{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
