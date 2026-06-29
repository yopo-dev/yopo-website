import Image from "next/image";

const reasons = [
  {
    title: "Non-intrusive",
    label: "Read-only BMS",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80",
    color: "#1B5E20",
  },
  {
    title: "Pay on savings",
    label: "Performance-based",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    color: "#C59E3C",
  },
  {
    title: "Full transparency",
    label: "Monthly KPI reports",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "#1B5E20",
  },
  {
    title: "One platform",
    label: "Energy + Access unified",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    color: "#C59E3C",
  },
  {
    title: "Built for UAE",
    label: "DEWA · BACnet · Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    color: "#1B5E20",
  },
  {
    title: "Honest targets",
    label: "10–15% guaranteed",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=600&q=80",
    color: "#C59E3C",
  },
];

export default function WhyYopo() {
  return (
    <section id="why-yopo" className="py-24 px-6"
      style={{ background: "#0F1F11" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Why Yopo
          </h2>
          <p className="text-green-300 text-lg opacity-70">
            Built for results. Not dashboards full of unverified claims.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div key={r.title}
              className="group relative rounded-2xl overflow-hidden h-52 cursor-pointer"
              style={{
                border: `1px solid ${r.color}22`,
                backdropFilter: "blur(12px)",
              }}>
              {/* Background image */}
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay — lifts on hover */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)" }} />

              {/* Glassmorphism content card at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)",
                  borderTop: `1px solid ${r.color}33`,
                }}>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-70"
                  style={{ color: r.color }}>
                  {r.label}
                </div>
                <div className="text-white font-bold text-lg leading-tight">{r.title}</div>
              </div>

              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: r.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
