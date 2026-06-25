const energySteps = [
  {
    num: "01",
    title: "Connect",
    body: "We connect to your building's existing BMS — read-only, no disruption to operations or existing contractors.",
  },
  {
    num: "02",
    title: "Monitor",
    body: "Every BMS point is polled continuously and streamed to our cloud platform. A weather-adjusted energy baseline is established.",
  },
  {
    num: "03",
    title: "Analyse",
    body: "Our platform identifies inefficiencies: equipment running outside schedule, disabled heat recovery, pump imbalances, faulty sensors.",
  },
  {
    num: "04",
    title: "Optimise",
    body: "Recommendations are implemented by your existing BMS contractor. Yopo monitors the impact and verifies the savings.",
  },
  {
    num: "05",
    title: "Report",
    body: "Monthly and quarterly reports show verified savings against baseline. You only pay a share of what's actually saved.",
  },
];

const accessSteps = [
  {
    num: "01",
    title: "Install",
    body: "Access control hardware is installed at building entrances. The management dashboard is configured for your team.",
  },
  {
    num: "02",
    title: "Enrol",
    body: "Residents download the Yopo app, create their account, and upload a face reference photo during sign-up.",
  },
  {
    num: "03",
    title: "Enter",
    body: "At the entrance, the camera recognises the resident's face and triggers the door relay — seamless, keycard-free access.",
  },
  {
    num: "04",
    title: "Connect",
    body: "Visitors call through the intercom; the call routes directly to the resident's mobile. Residents open the door remotely from anywhere.",
  },
];

function StepList({ steps, color }: { steps: typeof energySteps; color: string }) {
  return (
    <div className="relative flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={step.num} className="flex gap-5 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {step.num}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: `${color}30` }} />
            )}
          </div>
          <div className="pt-1.5 pb-2">
            <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1B5E20" }}>
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From connection to verified savings — a clear, non-intrusive process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1B5E20" }} />
              <h3 className="text-xl font-bold" style={{ color: "#1B5E20" }}>Energy Intelligence</h3>
            </div>
            <StepList steps={energySteps} color="#1B5E20" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#C59E3C" }} />
              <h3 className="text-xl font-bold" style={{ color: "#C59E3C" }}>Building Access & Community</h3>
            </div>
            <StepList steps={accessSteps} color="#C59E3C" />
          </div>
        </div>
      </div>
    </section>
  );
}
