export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-16"
      style={{ background: "linear-gradient(160deg, #1B5E20 0%, #2E7D32 50%, #143D16 100%)" }}
    >
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C59E3C 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ backgroundColor: "rgba(197,158,60,0.2)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.4)" }}
        >
          Dubai · Building Intelligence Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Buildings that work
          <br />
          <span style={{ color: "#C59E3C" }}>smarter.</span>
        </h1>

        <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-4 leading-relaxed">
          Yopo combines AI-driven energy optimisation with intelligent building access — helping property managers reduce costs and improve the resident experience.
        </p>

        <p className="text-green-200 text-base mb-12">
          No upfront cost on energy. Performance-based model — we only earn when you save.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-white text-lg transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#C59E3C" }}
          >
            Book a Demo
          </a>
          <a
            href="#what-we-do"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/10"
            style={{ color: "white", border: "2px solid rgba(255,255,255,0.4)" }}
          >
            Learn More
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
