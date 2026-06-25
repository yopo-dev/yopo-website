"use client";

import { useState } from "react";

const BUILDING_TYPES = [
  { label: "Residential Tower", factor: 0.13 },
  { label: "Commercial Office", factor: 0.16 },
  { label: "Mixed-Use", factor: 0.14 },
  { label: "Retail / Mall", factor: 0.18 },
  { label: "Hotel", factor: 0.15 },
];

// DEWA average tariff AED/kWh (commercial blended)
const DEWA_TARIFF = 0.38;
// UAE grid emission factor kg CO₂/kWh
const EMISSION_FACTOR = 0.45;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

export default function CarbonCalculator() {
  const [sqft, setSqft] = useState("");
  const [typeIdx, setTypeIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const sqftNum = parseFloat(sqft.replace(/,/g, "")) || 0;
  const buildingType = BUILDING_TYPES[typeIdx];

  // Rough annual kWh from industry benchmarks (kWh/sqft/year for UAE climate)
  const annualKwh = sqftNum * 28;
  const savingsKwh = annualKwh * buildingType.factor;
  const savingsAed = savingsKwh * DEWA_TARIFF;
  const savingsCo2 = (savingsKwh * EMISSION_FACTOR) / 1000; // tonnes
  const treesEquiv = Math.round(savingsCo2 * 45.7);

  const hasResult = sqftNum > 0;

  function handleEstimate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleLead(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section id="calculator" className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(27,94,32,0.08)", color: "#1B5E20", border: "1px solid rgba(27,94,32,0.2)" }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Free Savings Estimator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1B5E20" }}>
            How much could your building save?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Enter your building details and get an instant estimate of your potential energy savings,
            cost reduction, and carbon impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Input panel */}
          <div className="rounded-2xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleEstimate} className="space-y-6">
              {/* Building type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Building type</label>
                <div className="grid grid-cols-1 gap-2">
                  {BUILDING_TYPES.map((t, i) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setTypeIdx(i)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left"
                      style={typeIdx === i
                        ? { borderColor: "#1B5E20", backgroundColor: "rgba(27,94,32,0.06)", color: "#1B5E20" }
                        : { borderColor: "#e5e7eb", color: "#6b7280" }}
                    >
                      <span className="w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center"
                        style={{ borderColor: typeIdx === i ? "#1B5E20" : "#d1d5db" }}>
                        {typeIdx === i && (
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1B5E20" }} />
                        )}
                      </span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sqft input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Common-area floor space (sq ft)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 50000"
                    value={sqft}
                    onChange={e => setSqft(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-gray-900 text-base focus:outline-none transition-all"
                    style={{ borderColor: sqft ? "#1B5E20" : "#e5e7eb" }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">sq ft</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Common areas: lobby, gym, parking, corridors</p>
              </div>

              <button
                type="submit"
                disabled={!hasResult}
                className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#1B5E20" }}
              >
                Calculate my savings
              </button>
            </form>
          </div>

          {/* Results panel */}
          <div>
            {!submitted ? (
              <div className="rounded-2xl border border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center min-h-[360px] gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(27,94,32,0.06)" }}>
                  <svg className="w-8 h-8" fill="none" stroke="#1B5E20" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">
                  Fill in your building details on the left to see your estimated annual savings.
                </p>
              </div>
            ) : done ? (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-8 flex flex-col items-center justify-center text-center min-h-[360px] gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#1B5E20" }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#1B5E20" }}>You&apos;re on the list!</h3>
                <p className="text-gray-500 text-sm">
                  We&apos;ll be in touch with a detailed savings report and next steps for your building.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl p-5"
                    style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
                    <p className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-2">kWh Saved / yr</p>
                    <p className="text-3xl font-bold text-white">{fmt(savingsKwh)}</p>
                    <p className="text-green-300 text-xs mt-1">{buildingType.label}</p>
                  </div>
                  <div className="rounded-2xl p-5"
                    style={{ background: "linear-gradient(135deg, #92701A 0%, #C59E3C 100%)" }}>
                    <p className="text-yellow-200 text-xs font-semibold uppercase tracking-wide mb-2">AED Saved / yr</p>
                    <p className="text-3xl font-bold text-white">AED {fmt(savingsAed)}</p>
                    <p className="text-yellow-200 text-xs mt-1">at DEWA blended rate</p>
                  </div>
                  <div className="rounded-2xl p-5 col-span-2"
                    style={{ backgroundColor: "rgba(27,94,32,0.06)", border: "1px solid rgba(27,94,32,0.12)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">CO₂ Avoided / yr</p>
                        <p className="text-2xl font-bold" style={{ color: "#1B5E20" }}>{fmt(savingsCo2, 1)} tonnes</p>
                        <p className="text-gray-400 text-xs mt-1">≈ {fmt(treesEquiv)} trees planted</p>
                      </div>
                      <svg className="w-12 h-12 opacity-20" fill="none" stroke="#1B5E20" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Lead capture */}
                <div className="rounded-2xl border border-gray-100 p-6">
                  <p className="font-semibold text-gray-900 mb-1">Get your full report</p>
                  <p className="text-gray-400 text-sm mb-4">
                    We&apos;ll send a detailed breakdown with a verified savings methodology for your building.
                  </p>
                  <form onSubmit={handleLead} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-green-600"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-green-600"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                      style={{ backgroundColor: "#C59E3C" }}
                    >
                      Send me the full report →
                    </button>
                  </form>
                </div>

                <p className="text-center text-xs text-gray-400">
                  * Estimates based on UAE climate benchmarks and DEWA blended tariffs. Actual savings verified against weather-adjusted baseline.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
