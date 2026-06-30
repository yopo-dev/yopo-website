"use client";

const reasons = [
  {
    num: "01",
    title: "Read-only BMS",
    sub: "Non-intrusive by design. Zero risk to your systems.",
    badge: "0 days downtime",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    accent: "#4CAF50",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="8" y="16" width="48" height="32" rx="4" />
        <circle cx="32" cy="32" r="8" />
        <path d="M32 24v-8M32 48v-8M24 32h-8M48 32h-8" />
        <path d="M20 12l-4-4M44 12l4-4M20 52l-4 4M44 52l4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Pay on savings",
    sub: "Performance-based only. If we don't save, you don't pay.",
    badge: "AED 0 upfront",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    accent: "#C59E3C",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 20h40v28H12z" rx="3" />
        <path d="M20 20v-4a4 4 0 014-4h16a4 4 0 014 4v4" />
        <path d="M32 34v-6M29 31h6" strokeLinecap="round" />
        <circle cx="32" cy="34" r="6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Full transparency",
    sub: "Weather-adjusted reports. Every saving verified independently.",
    badge: "Monthly reports",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    accent: "#4CAF50",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M8 48l12-14 10 8 12-18 14 10" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <path d="M8 20h48M20 8v12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "One platform",
    sub: "Energy and Access in a single dashboard. No juggling tools.",
    badge: "Energy + Access",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    accent: "#C59E3C",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="6" y="6" width="24" height="24" rx="4" />
        <rect x="34" y="6" width="24" height="24" rx="4" />
        <rect x="6" y="34" width="24" height="24" rx="4" />
        <rect x="34" y="34" width="24" height="24" rx="4" />
        <path d="M30 18h4M18 30v4M46 30v4M30 46h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Built for UAE",
    sub: "DEWA tariffs, BACnet systems, and the UAE climate — built in.",
    badge: "DEWA · BACnet",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
    accent: "#009A44",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="24" />
        <path d="M8 32h48M32 8a32 32 0 010 48M32 8a32 32 0 000 48" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Honest targets",
    sub: "10–15% guaranteed reduction. We put it in writing.",
    badge: "10–15% guaranteed",
    img: "https://images.unsplash.com/photo-1611095962171-e6f02e7a5fcd?w=900&q=80",
    accent: "#4CAF50",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="32" cy="32" r="24" />
        <circle cx="32" cy="32" r="14" />
        <circle cx="32" cy="32" r="5" />
        <path d="M32 8v6M32 50v6M8 32h6M50 32h6" strokeLinecap="round" />
      </svg>
    ),
  },
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

      {/* Marquee strip */}
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

      {/* Header */}
      <div className="text-center pt-20 pb-16 px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C59E3C" }}>
          Why Us
        </p>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Why Yopo
        </h2>
      </div>

      {/* Reasons list */}
      <div className="max-w-5xl mx-auto px-6 pb-28">
        {reasons.map((r, i) => (
          <div key={r.num}
            className="group relative flex items-center gap-6 py-6 border-b cursor-default overflow-hidden transition-all duration-500"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}>

            {/* Background photo — reveals on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-700"
                style={{ backgroundImage: `url(${r.img})` }}
              />
              {/* Dark gradient from left so text stays readable */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, rgba(5,14,6,0.97) 0%, rgba(5,14,6,0.88) 55%, rgba(5,14,6,0.4) 100%)" }} />
            </div>

            {/* Ghost icon — far right, large, decorative */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75 pointer-events-none"
              style={{ color: r.accent }}>
              {r.icon}
            </div>

            {/* Number */}
            <span
              className="relative text-5xl md:text-6xl font-black tabular-nums select-none flex-shrink-0 transition-all duration-300 opacity-20 group-hover:opacity-100"
              style={{ color: r.accent, minWidth: "4.5rem" }}>
              {r.num}
            </span>

            {/* Text block */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-2xl md:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-green-50">
                  {r.title}
                </span>
                {/* Badge — appears on hover */}
                <span
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: `${r.accent}22`, color: r.accent, border: `1px solid ${r.accent}44` }}>
                  {r.badge}
                </span>
              </div>
              {/* Sub — slides up on hover */}
              <p className="text-sm text-gray-500 mt-0 max-h-0 overflow-hidden group-hover:max-h-10 group-hover:mt-1.5 transition-all duration-400 leading-snug">
                {r.sub}
              </p>
            </div>

            {/* Arrow */}
            <svg
              className="relative w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 mr-28"
              style={{ color: "rgba(255,255,255,0.15)" }}
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
