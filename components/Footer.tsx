function UaeFlagInline() {
  return (
    <svg width="32" height="18" viewBox="0 0 32 18" style={{ borderRadius: 3, flexShrink: 0 }}>
      <rect x="0" y="0" width="8" height="18" fill="#EF3340" />
      <rect x="8" y="0" width="24" height="6" fill="#009A44" />
      <rect x="8" y="6" width="24" height="6" fill="#FFFFFF" />
      <rect x="8" y="12" width="24" height="6" fill="#000000" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#050E06" }} className="border-t border-white/5">
      {/* UAE pride strip */}
      <div className="flex h-1 w-full">
        <div className="flex-1" style={{ backgroundColor: "#EF3340" }} />
        <div className="flex-1" style={{ backgroundColor: "#009A44" }} />
        <div className="flex-1" style={{ backgroundColor: "#FFFFFF" }} />
        <div className="flex-1" style={{ backgroundColor: "#000000" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: "#1B5E20" }}>yopo</span>
              <span className="text-sm font-semibold" style={{ color: "#C59E3C" }}>.app</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <UaeFlagInline />
              <span>Proudly built in the UAE</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#what-we-do" className="hover:text-white transition-colors">What We Do</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#why-yopo" className="hover:text-white transition-colors">Why Yopo</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* UAE mission statement */}
          <div className="flex flex-col items-center md:items-end gap-1 text-right">
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#009A44" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Aligned with UAE Net Zero 2050
            </div>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} YOPO Solutions FZ-LLC · Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
