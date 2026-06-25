export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold" style={{ color: "#1B5E20" }}>yopo</span>
          <span className="text-sm font-semibold" style={{ color: "#C59E3C" }}>.app</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#what-we-do" className="hover:text-white transition-colors">What We Do</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#why-yopo" className="hover:text-white transition-colors">Why Yopo</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} YOPO Solutions FZ-LLC · Dubai, UAE
        </p>
      </div>
    </footer>
  );
}
