"use client";

const reasons = [
  { num: "01", title: "Read-only BMS", sub: "Non-intrusive by design" },
  { num: "02", title: "Pay on savings", sub: "Performance-based pricing" },
  { num: "03", title: "Full transparency", sub: "Weather-adjusted reports" },
  { num: "04", title: "One platform", sub: "Energy + Access unified" },
  { num: "05", title: "Built for UAE", sub: "DEWA · BACnet · Dubai" },
  { num: "06", title: "Honest targets", sub: "10–15% guaranteed" },
];

const MARQUEE_ITEMS = [
  "AI-driven optimisation",
  "Zero upfront cost",
  "Face recognition access",
  "DEWA-calibrated",
  "UAE Net Zero 2050",
  "BMS monitoring",
  "Performance contracts",
  "Resident mobile app",
  "Real-time anomaly detection",
  "Weather-adjusted baseline",
];

export default function WhyYopo() {
  return (
    <section id="why-yopo" style={{ background: "#050E06" }} className="overflow-hidden">

      {/* ── Marquee strip ── */}
      <div className="border-y py-4 overflow-hidden"
        style={{ borderColor: "rgba(197,158,60,0.18)", background: "rgba(197,158,60,0.04)" }}>
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 text-sm font-semibold uppercase tracking-widest"
              style={{ color: i % 3 === 0 ? "#C59E3C" : "rgba(255,255,255,0.35)" }}>
              {item}
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(197,158,60,0.4)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div className="text-center pt-20 pb-16 px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C59E3C" }}>
          Why Us
        </p>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Why Yopo
        </h2>
      </div>

      {/* ── Reasons — bold numbered list ── */}
      <div className="max-w-5xl mx-auto px-6 pb-28">
        {reasons.map((r, i) => (
          <div key={r.num}
            className="group flex items-center gap-8 py-7 border-b cursor-default transition-all duration-300 hover:pl-4"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}>

            {/* Number */}
            <span className="text-5xl font-black tabular-nums select-none transition-all duration-300 group-hover:opacity-100 opacity-20"
              style={{ color: i % 2 === 0 ? "#1B5E20" : "#C59E3C", minWidth: "4rem" }}>
              {r.num}
            </span>

            {/* Title */}
            <span className="text-3xl md:text-4xl font-bold text-white flex-1 transition-colors duration-300 group-hover:text-green-100">
              {r.title}
            </span>

            {/* Sub — appears on hover via opacity */}
            <span className="text-sm text-gray-500 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
              {r.sub}
            </span>

            {/* Arrow */}
            <svg className="w-5 h-5 text-gray-700 group-hover:text-green-400 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
