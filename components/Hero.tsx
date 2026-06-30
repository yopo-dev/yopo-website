import Image from "next/image";
import EnergyCanvas from "./EnergyCanvas";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-16 overflow-hidden">
      {/* Background building photo */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80"
        alt="Modern high-rise buildings"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark green overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(27,94,32,0.92) 0%, rgba(46,125,50,0.85) 50%, rgba(20,61,22,0.95) 100%)" }}
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C59E3C 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated energy network */}
      <EnergyCanvas />

      <div className="relative max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ backgroundColor: "rgba(197,158,60,0.2)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.4)" }}
        >
          {/* UAE flag inline */}
          <svg width="22" height="14" viewBox="0 0 22 14" style={{ borderRadius: 2, flexShrink: 0 }}>
            <rect x="0" y="0" width="5.5" height="14" fill="#EF3340" />
            <rect x="5.5" y="0" width="16.5" height="4.67" fill="#009A44" />
            <rect x="5.5" y="4.67" width="16.5" height="4.67" fill="#FFFFFF" />
            <rect x="5.5" y="9.33" width="16.5" height="4.67" fill="#000000" />
          </svg>
          Dubai · Building Intelligence Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Your building is leaking
          <br />
          <span style={{ color: "#C59E3C" }}>money right now.</span>
        </h1>

        <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          We scan your systems, find the waste, and fix it. Zero upfront cost, no long-term contract, and zero downtime.
        </p>

        {/* Testimonial quote */}
        <div
          className="relative max-w-2xl mx-auto mb-12 rounded-2xl px-7 py-6 text-left"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(197,158,60,0.35)",
          }}
        >
          {/* Gold quote mark */}
          <span
            className="absolute -top-5 left-6 text-6xl font-serif leading-none select-none"
            style={{ color: "#C59E3C", opacity: 0.9 }}
          >
            &ldquo;
          </span>
          <p className="text-white text-base md:text-lg leading-relaxed mb-4 pt-2">
            We agreed to a free trial. Yopo analysed all our building data, found the leaks and inefficiencies, and fixed them with{" "}
            <span style={{ color: "#C59E3C" }} className="font-semibold">no disruption to our systems or residents</span>.
            Within 6 months we were saving{" "}
            <span style={{ color: "#C59E3C" }} className="font-bold">17% on energy costs</span>.
            Nothing to pay upfront, no lock-in. I wish we'd done this years ago.
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1B5E20, #4CAF50)", color: "white" }}
            >
              JA
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Julie Anderson</p>
              <p className="text-green-300 text-xs">Asset Manager · Aqua Asset Management</p>
            </div>
            <div
              className="ml-auto px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
              style={{ background: "rgba(76,175,80,0.15)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.3)" }}
            >
              ✓ Verified client
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-white text-lg transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#C59E3C" }}
          >
            Get a Free Building Scan
          </a>
          <a
            href="#calculator"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/10"
            style={{ color: "white", border: "2px solid rgba(255,255,255,0.4)" }}
          >
            Calculate My Savings
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
