import Image from "next/image";

function DashboardMockup() {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 w-full">
      {/* Browser chrome */}
      <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="ml-3 flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
          admin.yopo.app
        </div>
      </div>
      {/* Dashboard content */}
      <div className="p-5 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Energy Dashboard</div>
            <div className="text-white font-bold text-sm">Sparkle Towers · Live</div>
          </div>
          <div className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "#1B5E2040", color: "#4ade80" }}>
            ● Live
          </div>
        </div>
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "kWh Today", value: "4,218", delta: "−12%" },
            { label: "Savings MTD", value: "AED 8.4K", delta: "↑" },
            { label: "Active Points", value: "377", delta: "BMS" },
          ].map((k) => (
            <div key={k.label} className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400 text-xs mb-1">{k.label}</div>
              <div className="text-white font-bold text-sm">{k.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#4ade80" }}>{k.delta}</div>
            </div>
          ))}
        </div>
        {/* Fake chart */}
        <div className="bg-gray-800 rounded-lg p-3 mb-3">
          <div className="text-gray-400 text-xs mb-3">kWh consumption: last 7 days vs baseline</div>
          <div className="flex items-end gap-1 h-16">
            {[65, 72, 58, 80, 54, 61, 48].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                <div className="rounded-sm opacity-40" style={{ height: `${h}%`, backgroundColor: "#C59E3C" }} />
                <div className="rounded-sm" style={{ height: `${h * 0.82}%`, backgroundColor: "#1B5E20" }} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-sm opacity-40" style={{ backgroundColor: "#C59E3C" }} /> Baseline
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "#1B5E20" }} /> Actual
            </div>
          </div>
        </div>
        {/* Alert row */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-2">Recent Alerts</div>
          {[
            { icon: "⚡", msg: "FAHU-L3 running outside schedule", time: "2m ago", color: "#facc15" },
            { icon: "✓", msg: "Heat Recovery Wheel HRW-1 re-enabled", time: "1h ago", color: "#4ade80" },
            { icon: "⚡", msg: "Chiller pump SCHWP-B-2 hours imbalance", time: "3h ago", color: "#f87171" },
          ].map((a) => (
            <div key={a.msg} className="flex items-center gap-2 py-1.5 border-t border-gray-700 first:border-0">
              <span>{a.icon}</span>
              <span className="text-gray-300 text-xs flex-1 truncate">{a.msg}</span>
              <span className="text-gray-500 text-xs">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAppMockup() {
  return (
    <div
      className="relative mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800"
      style={{ width: 200, background: "#111" }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10" />
      <div className="pt-8 pb-4 px-3 min-h-[380px]">
        {/* Status bar */}
        <div className="flex justify-between text-gray-500 text-xs mb-4 px-1">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white font-bold text-sm">Welcome back</div>
            <div className="text-gray-400 text-xs">Tower A · Unit 804</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-xs text-white font-bold">S</div>
        </div>
        {/* Door button */}
        <div
          className="rounded-2xl p-4 mb-3 text-center"
          style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
        >
          <div className="text-3xl mb-1">🔓</div>
          <div className="text-white font-semibold text-sm">Open Main Door</div>
          <div className="text-green-200 text-xs mt-0.5">Tap to unlock</div>
        </div>
        {/* Notifications */}
        <div className="space-y-2">
          <div className="text-gray-400 text-xs mb-1">Notifications</div>
          {[
            { icon: "📣", msg: "Pool maintenance: Sat 10am–2pm", time: "1h" },
            { icon: "📞", msg: "Missed intercom call", time: "3h" },
            { icon: "🏢", msg: "Building announcement posted", time: "1d" },
          ].map((n) => (
            <div key={n.msg} className="bg-gray-800 rounded-xl px-3 py-2 flex items-start gap-2">
              <span className="text-sm">{n.icon}</span>
              <div className="flex-1">
                <div className="text-white text-xs leading-tight">{n.msg}</div>
                <div className="text-gray-500 text-xs">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-16 h-1 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}

function IntercomMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700" style={{ maxWidth: 220 }}>
      {/* Camera view */}
      <div className="relative bg-gray-800 aspect-square flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
          </div>
        </div>
        {/* Face detection overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-24 rounded-xl border-2 opacity-70"
            style={{ borderColor: "#4ade80", boxShadow: "0 0 12px rgba(74,222,128,0.4)" }}
          />
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div
            className="text-xs text-center font-semibold px-2 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(27,94,32,0.85)", color: "#4ade80" }}
          >
            ✓ Resident Recognised
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="p-4">
        <div className="text-white text-xs font-semibold mb-1 text-center">Main Entrance</div>
        <div className="text-gray-400 text-xs text-center mb-3">Sparkle Towers · Tower A</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-2 rounded-xl text-xs font-semibold text-white"
            style={{ backgroundColor: "#1B5E20" }}
          >
            🔓 Unlock
          </button>
          <button className="py-2 rounded-xl text-xs font-semibold text-white bg-gray-700">
            📞 Call
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section className="py-24 px-6 bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            The Platform
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three interfaces. One connected system.
          </p>
        </div>

        {/* Admin dashboard */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ backgroundColor: "#1B5E2030", color: "#4ade80" }}
            >
              Admin Dashboard
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Energy intelligence,<br />at a glance
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Property managers and OA teams get a live view of energy consumption, verified savings against baseline, and real-time BMS alerts, all in one dashboard.
            </p>
            <ul className="space-y-2">
              {[
                "Live BMS data from every monitored point",
                "kWh vs weather-adjusted baseline charts",
                "Anomaly alerts and optimisation recommendations",
                "Monthly savings reports, exportable as PDF",
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#1B5E20" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <DashboardMockup />
        </div>

        {/* Mobile + Intercom */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1 flex justify-center gap-8 items-end">
            <MobileAppMockup />
            <IntercomMockup />
          </div>
          <div className="order-1 md:order-2">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ backgroundColor: "#C59E3C30", color: "#C59E3C" }}
            >
              Mobile App + Intercom
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Residents in control.<br />Managers informed.
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              The resident mobile app handles building access, intercom calls, and community communication. At the entrance, the intercom device uses face recognition for seamless, keycard-free entry.
            </p>
            <ul className="space-y-2">
              {[
                "Face recognition at building entrance",
                "Intercom calls routed to resident's phone",
                "Remote door unlock from anywhere",
                "Community feed, announcements, and direct messaging",
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#C59E3C" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photo strip — building + energy + nature */}
        <div className="grid grid-cols-3 gap-4 rounded-2xl overflow-hidden">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
              alt="Dubai high-rise residential towers"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">High-Rise Buildings</div>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
              alt="Energy and electricity savings"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">Energy Savings</div>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
              alt="Sustainability and green environment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">Sustainability</div>
          </div>
        </div>
      </div>
    </section>
  );
}
