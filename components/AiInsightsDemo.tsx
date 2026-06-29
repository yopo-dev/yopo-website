"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Phase = "idle" | "scanning" | "done";

const FINDINGS = [
  {
    floor: "Floor 12–14",
    system: "HVAC / Chiller",
    issue: "Running at full load during low-occupancy hours",
    saving: "AED 340/day",
    severity: "high",
    delay: 600,
    pct: 28,
  },
  {
    floor: "Floor 6",
    system: "Domestic Pumps",
    issue: "Pump Group B running 3hrs beyond scheduled stop",
    saving: "AED 190/day",
    severity: "medium",
    delay: 1400,
    pct: 55,
  },
  {
    floor: "Basement / Car Park",
    system: "Ventilation Fans",
    issue: "Fans cycling at 100% after 22:00 — no occupancy",
    saving: "AED 420/day",
    severity: "high",
    delay: 2200,
    pct: 80,
  },
];

export default function AiInsightsDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanPct, setScanPct] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const DURATION = 3000;

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase("idle");
    setScanPct(0);
    setRevealed([]);
  }

  function runScan() {
    if (phase !== "idle") return;
    setPhase("scanning");
    setScanPct(0);
    setRevealed([]);
    startRef.current = performance.now();

    // Schedule finding reveals
    FINDINGS.forEach((f, idx) => {
      setTimeout(() => setRevealed((p) => [...p, idx]), f.delay);
    });

    const tick = (now: number) => {
      const p = Math.min((now - startRef.current) / DURATION, 1);
      setScanPct(p * 100);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const totalSaving = "AED 950";

  return (
    <section className="py-28 px-6 overflow-hidden relative" style={{ background: "#030A04" }}>
      {/* Faint grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(76,175,80,1) 1px, transparent 1px),linear-gradient(90deg, rgba(76,175,80,1) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6"
            style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AI Engine · Interactive Demo
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Point AI at your building.<br />
            <span style={{ color: "#4CAF50" }}>Find the waste.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Yopo scans every floor, every system, every data point — and tells you exactly where energy is being lost.
          </p>
        </div>

        {/* Demo layout */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* LEFT — Building being scanned */}
          <div className="relative rounded-3xl overflow-hidden min-h-[480px]"
            style={{ border: "1px solid rgba(76,175,80,0.15)" }}>

            {/* Building photo */}
            <Image
              src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=85"
              alt="Dubai Marina tower — being scanned"
              fill
              className="object-cover object-center"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0" style={{ background: "rgba(3,10,4,0.55)" }} />

            {/* Building label */}
            <div className="absolute top-5 left-5 px-4 py-2 rounded-xl"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(76,175,80,0.3)" }}>
              <p className="text-xs font-mono text-green-400 mb-0.5">TARGET BUILDING</p>
              <p className="text-white font-bold text-sm">Marina Heights · Tower B</p>
              <p className="text-gray-400 text-xs">42 floors · Dubai Marina</p>
            </div>

            {/* Scan beam — sweeps top to bottom */}
            {phase === "scanning" && (
              <>
                {/* Glowing scan line */}
                <div className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: `${scanPct}%`,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #4CAF50, #C59E3C, #4CAF50, transparent)",
                    boxShadow: "0 0 20px 4px rgba(76,175,80,0.6)",
                    transition: "top 0.05s linear",
                  }} />
                {/* Scanned area tint */}
                <div className="absolute left-0 right-0 top-0 pointer-events-none"
                  style={{
                    height: `${scanPct}%`,
                    background: "rgba(76,175,80,0.06)",
                    transition: "height 0.05s linear",
                  }} />
              </>
            )}

            {/* Anomaly pins on the building */}
            {FINDINGS.map((f, idx) => revealed.includes(idx) && (
              <div key={idx} className="absolute left-5 right-5 flex items-center gap-2"
                style={{
                  top: `${f.pct}%`,
                  animation: "fadeIn 0.4s ease-out both",
                }}>
                {/* Pulsing dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: f.severity === "high" ? "#ef4444" : "#f59e0b" }} />
                  <div className="absolute inset-0 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: f.severity === "high" ? "#ef4444" : "#f59e0b" }} />
                </div>
                {/* Floor label */}
                <div className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{
                    background: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${f.severity === "high" ? "rgba(239,68,68,0.5)" : "rgba(245,158,11,0.5)"}`,
                    color: f.severity === "high" ? "#ef4444" : "#f59e0b",
                  }}>
                  {f.floor} — {f.system}
                </div>
              </div>
            ))}

            {/* Idle overlay */}
            {phase === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)" }}>
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-green-400 text-sm font-semibold">Ready to scan</p>
              </div>
            )}

            {/* Done overlay badge */}
            {phase === "done" && (
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl px-5 py-3 flex items-center justify-between"
                style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(197,158,60,0.4)" }}>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Scan complete · 3 anomalies</p>
                  <p className="font-black text-2xl" style={{ color: "#C59E3C" }}>{totalSaving}<span className="text-sm font-normal text-gray-400">/day est.</span></p>
                </div>
                <svg className="w-8 h-8" fill="none" stroke="#C59E3C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* RIGHT — Findings panel */}
          <div className="flex flex-col gap-4">
            {/* Status bar */}
            <div className="rounded-2xl px-5 py-4 flex items-center justify-between"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.12)" }}>
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${phase === "scanning" ? "animate-pulse bg-green-400" : phase === "done" ? "bg-yellow-400" : "bg-gray-700"}`} />
                <span className="text-sm font-mono text-gray-400">
                  {phase === "idle" ? "Awaiting scan…" : phase === "scanning" ? `Scanning building… ${Math.round(scanPct)}%` : "Scan complete"}
                </span>
              </div>
              {phase !== "idle" && (
                <div className="h-1.5 w-32 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${scanPct}%`, background: "linear-gradient(90deg, #1B5E20, #4CAF50)" }} />
                </div>
              )}
            </div>

            {/* Findings list */}
            <div className="flex flex-col gap-3 flex-1">
              {FINDINGS.map((f, idx) => (
                <div key={idx}
                  className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-500"
                  style={{
                    background: revealed.includes(idx) ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                    border: revealed.includes(idx)
                      ? `1px solid ${f.severity === "high" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`
                      : "1px solid rgba(255,255,255,0.04)",
                    opacity: revealed.includes(idx) ? 1 : 0.3,
                    animation: revealed.includes(idx) ? "slideIn 0.5s ease-out both" : "none",
                  }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: f.severity === "high" ? "#ef4444" : "#f59e0b" }} />
                      <span className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: f.severity === "high" ? "#ef4444" : "#f59e0b" }}>
                        {f.floor}
                      </span>
                    </div>
                    {revealed.includes(idx) && (
                      <span className="font-black text-lg flex-shrink-0" style={{ color: "#4CAF50" }}>
                        {f.saving}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{f.system}</p>
                    <p className="text-white text-sm leading-snug">{f.issue}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {phase === "idle" && (
              <button onClick={runScan}
                className="w-full py-5 rounded-2xl font-black text-lg tracking-wide transition-all hover:scale-[1.02] hover:opacity-90 flex items-center justify-center gap-3"
                style={{ background: "linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)", color: "white" }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Scan This Building
              </button>
            )}

            {phase === "done" && (
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl px-6 py-4 flex items-center justify-between"
                  style={{ background: "rgba(197,158,60,0.08)", border: "1px solid rgba(197,158,60,0.25)" }}>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Total est. savings</p>
                    <p className="font-black text-3xl" style={{ color: "#C59E3C" }}>
                      {totalSaving}<span className="text-base text-gray-500 font-normal">/day</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">≈ AED 346,750 / year</p>
                  </div>
                  <a href="#contact"
                    className="px-5 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 whitespace-nowrap"
                    style={{ backgroundColor: "#C59E3C", color: "#fff" }}>
                    Get this for my building
                  </a>
                </div>
                <button onClick={reset}
                  className="text-xs font-mono text-gray-700 hover:text-gray-400 transition-colors text-center underline underline-offset-2">
                  ↺ Scan again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
      `}</style>
    </section>
  );
}
