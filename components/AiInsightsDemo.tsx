"use client";

import { useState, useEffect, useRef } from "react";

// 48 data points simulating a day of energy (kWh) with 3 anomaly spikes
const BASE_DATA = [
  18,17,16,15,14,15,22,34,48,58,62,64,65,63,62,61,
  60,62,63,64,65,63,61,60,58,57,56,58,60,62,64,66,
  67,65,63,61,58,54,50,45,40,36,30,26,22,20,19,18,
];
const ANOMALIES = [
  { idx: 11, value: 88,  label: "HVAC spike",         severity: "high",   saving: "AED 340/day" },
  { idx: 22, value: 84,  label: "Pump over-run",      severity: "medium", saving: "AED 190/day" },
  { idx: 33, value: 91,  label: "After-hours load",   severity: "high",   saving: "AED 420/day" },
];

const INSIGHTS = [
  {
    time: "00.4s",
    title: "HVAC running at full load during low-occupancy window",
    detail: "Chiller setpoint can be raised 2°C between 11:00–13:00 — estimated 18 kW reduction.",
    impact: "–18 kW · AED 340/day",
    color: "#ef4444",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    time: "00.9s",
    title: "Domestic pump running 3hrs beyond scheduled stop",
    detail: "Pump Group B timer misaligned — recommend BMS schedule correction.",
    impact: "–10 kW · AED 190/day",
    color: "#f59e0b",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  {
    time: "01.6s",
    title: "Abnormal load detected after 22:00 — no scheduled activity",
    detail: "Car park fans cycling at 100% outside operating hours. Possible sensor fault.",
    impact: "–22 kW · AED 420/day",
    color: "#ef4444",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
];

const W = 700;
const H = 160;
const PAD = { t: 16, r: 16, b: 28, l: 36 };
const MAX_V = 100;

function xOf(i: number) {
  return PAD.l + (i / (BASE_DATA.length - 1)) * (W - PAD.l - PAD.r);
}
function yOf(v: number) {
  return PAD.t + (1 - v / MAX_V) * (H - PAD.t - PAD.b);
}

function buildPath(data: number[]) {
  return data.map((v, i) => `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
}

type Phase = "idle" | "scanning" | "done";

export default function AiInsightsDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanX, setScanX] = useState(PAD.l);
  const [revealedAnomalies, setRevealedAnomalies] = useState<number[]>([]);
  const [revealedInsights, setRevealedInsights] = useState<number[]>([]);
  const [typeText, setTypeText] = useState("");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const SCAN_DURATION = 2600;
  const chartW = W - PAD.l - PAD.r;

  function runScan() {
    if (phase !== "idle") return;
    setPhase("scanning");
    setRevealedAnomalies([]);
    setRevealedInsights([]);
    setTypeText("");
    setScanX(PAD.l);

    // Typing effect
    const msg = "Analysing 847 BMS data points across 6 building systems…";
    let i = 0;
    const typeId = setInterval(() => {
      i++;
      setTypeText(msg.slice(0, i));
      if (i >= msg.length) clearInterval(typeId);
    }, 28);

    startRef.current = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - startRef.current) / SCAN_DURATION, 1);
      const x = PAD.l + p * chartW;
      setScanX(x);

      // Reveal anomalies as scan passes their x position
      ANOMALIES.forEach((a, idx) => {
        const ax = xOf(a.idx);
        if (x >= ax) setRevealedAnomalies((prev) => prev.includes(idx) ? prev : [...prev, idx]);
      });

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("done");
        // Stagger insight cards
        INSIGHTS.forEach((_, idx) => {
          setTimeout(() => {
            setRevealedInsights((prev) => [...prev, idx]);
          }, 400 + idx * 500);
        });
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const anomalyData = BASE_DATA.map((v, i) => {
    const a = ANOMALIES.find((a) => a.idx === i);
    return a ? a.value : v;
  });

  // Build SVG area fill
  const linePath = buildPath(anomalyData);
  const areaPath = `${linePath} L${xOf(BASE_DATA.length - 1)},${yOf(0)} L${xOf(0)},${yOf(0)} Z`;

  return (
    <section className="py-28 px-6 overflow-hidden relative" style={{ background: "#030A04" }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(76,175,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,1) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6"
            style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AI Engine · Live Demo
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Watch the AI <span style={{ color: "#4CAF50" }}>find waste</span>
            <br />in real time.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            One click. Yopo scans your entire BMS and surfaces every inefficiency — in seconds.
          </p>
        </div>

        {/* Main demo card */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.15)" }}>

          {/* Terminal top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: "rgba(76,175,80,0.1)", background: "rgba(0,0,0,0.4)" }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span className="ml-3 text-xs font-mono" style={{ color: "rgba(76,175,80,0.6)" }}>
                yopo-ai · building-scan · Tower B · Marina Heights
              </span>
            </div>
            {phase === "scanning" && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                SCANNING
              </span>
            )}
            {phase === "done" && (
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#C59E3C" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C59E3C" }} />
                3 ANOMALIES DETECTED
              </span>
            )}
          </div>

          {/* Chart area */}
          <div className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-600">Common-area energy draw — kWh/hr · today</span>
              <span className="text-xs font-mono text-gray-700">00:00 → 23:59</span>
            </div>

            <div className="relative w-full overflow-hidden" style={{ paddingBottom: `${(H / W) * 100}%` }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Y-axis grid lines */}
                {[25, 50, 75, 100].map((v) => (
                  <g key={v}>
                    <line x1={PAD.l} y1={yOf(v)} x2={W - PAD.r} y2={yOf(v)}
                      stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <text x={PAD.l - 6} y={yOf(v) + 4} textAnchor="end"
                      fill="rgba(255,255,255,0.2)" fontSize="9">{v}</text>
                  </g>
                ))}

                {/* Area fill */}
                <path d={areaPath} fill="url(#areaGrad)" />

                {/* Main line */}
                <path d={linePath} fill="none" stroke="#4CAF50" strokeWidth="1.8"
                  filter="url(#glow)" strokeLinejoin="round" />

                {/* Anomaly highlight circles */}
                {ANOMALIES.map((a, idx) => revealedAnomalies.includes(idx) && (
                  <g key={idx}>
                    <circle cx={xOf(a.idx)} cy={yOf(a.value)} r="16"
                      fill={a.severity === "high" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)"}
                      stroke={a.severity === "high" ? "rgba(239,68,68,0.6)" : "rgba(245,158,11,0.6)"}
                      strokeWidth="1"
                      style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
                    <circle cx={xOf(a.idx)} cy={yOf(a.value)} r="4"
                      fill={a.severity === "high" ? "#ef4444" : "#f59e0b"} />
                    {/* Callout label */}
                    <rect x={xOf(a.idx) - 38} y={yOf(a.value) - 32} width="76" height="18" rx="4"
                      fill="rgba(0,0,0,0.75)" stroke={a.severity === "high" ? "rgba(239,68,68,0.4)" : "rgba(245,158,11,0.4)"}
                      strokeWidth="0.8" />
                    <text x={xOf(a.idx)} y={yOf(a.value) - 19} textAnchor="middle"
                      fill={a.severity === "high" ? "#ef4444" : "#f59e0b"} fontSize="8.5" fontWeight="600">
                      {a.label}
                    </text>
                  </g>
                ))}

                {/* Scan line */}
                {phase === "scanning" && (
                  <g>
                    <line x1={scanX} y1={PAD.t} x2={scanX} y2={H - PAD.b}
                      stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.9" />
                    <rect x={scanX - 24} y={PAD.t - 14} width="48" height="14" rx="3"
                      fill="rgba(76,175,80,0.15)" stroke="rgba(76,175,80,0.4)" strokeWidth="0.8" />
                    <text x={scanX} y={PAD.t - 3} textAnchor="middle"
                      fill="#4CAF50" fontSize="8" fontWeight="700">SCANNING</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Terminal typing output */}
          <div className="px-6 pb-4 min-h-[28px]">
            {typeText && (
              <p className="font-mono text-xs" style={{ color: "rgba(76,175,80,0.7)" }}>
                <span style={{ color: "#4CAF50" }}>›</span> {typeText}
                {phase === "scanning" && <span className="animate-pulse ml-0.5">▌</span>}
              </p>
            )}
            {phase === "done" && (
              <p className="font-mono text-xs" style={{ color: "rgba(197,158,60,0.8)" }}>
                <span style={{ color: "#C59E3C" }}>›</span> Scan complete — 3 anomalies found · Est. savings AED 950/day
              </p>
            )}
          </div>

          {/* CTA button */}
          {phase === "idle" && (
            <div className="px-6 pb-6">
              <button onClick={runScan}
                className="flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1B5E20, #4CAF50)", color: "white" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run AI Scan
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="px-6 pb-6">
              <button onClick={() => { setPhase("idle"); setRevealedAnomalies([]); setRevealedInsights([]); setTypeText(""); }}
                className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2">
                ↺ Reset demo
              </button>
            </div>
          )}
        </div>

        {/* Insight cards */}
        {revealedInsights.length > 0 && (
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {INSIGHTS.map((ins, idx) => revealedInsights.includes(idx) && (
              <div key={idx}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${ins.color}33`,
                  backdropFilter: "blur(12px)",
                  animation: "slideUp 0.5s ease-out both",
                }}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${ins.color}18`, color: ins.color }}>
                    {ins.icon}
                  </div>
                  <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                    +{ins.time}
                  </span>
                </div>
                <p className="text-white text-sm font-semibold leading-snug">{ins.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{ins.detail}</p>
                <div className="mt-auto pt-2 border-t" style={{ borderColor: `${ins.color}22` }}>
                  <span className="font-mono text-xs font-bold" style={{ color: ins.color }}>{ins.impact}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total savings if done */}
        {phase === "done" && revealedInsights.length === 3 && (
          <div className="mt-6 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ background: "rgba(197,158,60,0.07)", border: "1px solid rgba(197,158,60,0.2)" }}
          >
            <div>
              <p className="text-white font-bold text-lg">Total estimated savings</p>
              <p className="text-gray-500 text-sm">Based on weather-adjusted baseline · verified monthly</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black" style={{ color: "#C59E3C" }}>AED 950<span className="text-xl">/day</span></p>
              <p className="text-xs text-gray-600 mt-0.5">≈ AED 346,750 / year</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { r: 12; opacity: 1; }
          100% { r: 22; opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
