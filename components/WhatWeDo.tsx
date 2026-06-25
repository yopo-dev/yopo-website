const products = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Energy Intelligence",
    subtitle: "Reduce DEWA consumption — with zero upfront cost",
    description:
      "Yopo connects to your building's existing BMS and monitors every point continuously. Our platform analyses patterns, identifies inefficiencies, and surfaces actionable optimisations — from HVAC scheduling to pump management. Verified savings are measured against a weather-adjusted baseline. You only pay when the savings are real.",
    points: [
      "Continuous BMS monitoring — read-only, non-intrusive",
      "AI-driven anomaly detection and recommendations",
      "Weather-adjusted energy baseline and reporting",
      "Performance-based contract — no savings, no fee",
    ],
    color: "#1B5E20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    title: "Building Access & Community",
    subtitle: "Face recognition entry. Resident app. Management dashboard.",
    description:
      "Yopo installs smart access control at building entrances with camera-based face recognition. Residents enrol through a mobile app, which also handles intercom calls, community messaging, and building announcements. Property managers get a unified dashboard to oversee access events, communicate with tenants, and manage the building.",
    points: [
      "Face recognition access at building entrances",
      "Resident mobile app — iOS and Android",
      "Intercom calls routed directly to resident phones",
      "Management dashboard for OA teams and property managers",
    ],
    color: "#C59E3C",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1B5E20" }}>
            What We Do
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Two integrated product lines built for modern residential and commercial buildings in the UAE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {products.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6 hover:shadow-md transition-shadow"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: p.color }}>{p.title}</h3>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">{p.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>
                <ul className="space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-gray-700 text-sm">
                      <span className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: `${p.color}20` }}>
                        <svg className="w-2.5 h-2.5" fill="none" stroke={p.color} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
