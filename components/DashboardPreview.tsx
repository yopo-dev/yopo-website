"use client";

import { useEffect, useRef, useState } from "react";

// Simulated live readings that tick every 2s
const SYSTEMS = [
  { name: "Chiller Plant", unit: "kW", base: 312, variance: 18, status: "optimal" },
  { name: "AHU Bank A", unit: "kW", base: 84, variance: 9, status: "optimal" },
  { name: "Domestic Pumps", unit: "kW", base: 22, variance: 3, status: "warning" },
  { name: "Lift Group 1", unit: "kW", base: 47, variance: 5, status: "optimal" },
  { name: "Common Lighting", unit: "kW", base: 31, variance: 2, status: "optimal" },
  { name: "Car Park Fans", unit: "kW", base: 18, variance: 4, status: "alert" },
];

const ALERTS = [
  { time: "09:14", msg: "AHU Bank B running outside schedule, 2.3 kWh wasted", level: "warning" },
  { time: "08:52", msg: "Chiller setpoint optimised, saving est. 18 kW", level: "saving" },
  { time: "08:31", msg: "Car park fans: high runtime anomaly detected", level: "alert" },
  { time: "07:55", msg: "Morning occupancy detected, HVAC pre-cool started", level: "info" },
];

// 24 bar chart values (hours 0-23), kWh common area
const BAR_DATA = [
  18, 14, 12, 11, 13, 17, 28, 46, 62, 71, 74, 70,
  68, 65, 67, 72, 69, 61, 52, 44, 38, 31, 25, 20,
];
const BAR_MAX = Math.max(...BAR_DATA);

function rand(base: number, variance: number) {
  return base + (Math.random() - 0.5) * variance * 2;
}

function StatusDot({ status }: { status: string }) {
  const color = status === "optimal" ? "#4CAF50" : status === "warning" ? "#C59E3C" : "#ef4444";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-xs capitalize" style={{ color }}>{status}</span>
    </span>
  );
}

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [readings, setReadings] = useState(SYSTEMS.map((s) => rand(s.base, s.variance)));
  const [activeHour, setActiveHour] = useState(9); // current "hour" cursor
  const [totalToday, setTotalToday] = useState(847);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Tick readings every 2.2s
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setReadings(SYSTEMS.map((s) => rand(s.base, s.variance)));
      setTotalToday((t) => t + Math.round(Math.random() * 3));
      setActiveHour((h) => (h + 1) % 24);
    }, 2200);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={sectionRef} className="py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fdf8 0%, #ffffff 100%)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(27,94,32,0.08)", color: "#1B5E20", border: "1px solid rgba(27,94,32,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Live Dashboard Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1B5E20" }}>
            Your building, in real time.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Property managers get a single dashboard showing every system, every anomaly, and every saving, updated live.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: "1px solid rgba(27,94,32,0.12)" }}>
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ background: "#0D2B10", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#ef4444","#f59e0b","#22c55e"].map((c) => (
                  <span key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-green-400 text-xs font-mono opacity-70">yopo.io/dashboard · Marina Heights, Tower B</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0"
            style={{ background: "#0F1F11" }}>
            {/* Left: KPI strip + systems */}
            <div className="md:col-span-2 border-r" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {/* KPI row */}
              <div className="grid grid-cols-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Today's kWh", value: totalToday.toLocaleString(), unit: "kWh", color: "#C59E3C" },
                  { label: "Current Load", value: Math.round(readings.reduce((a, b) => a + b, 0)).toLocaleString(), unit: "kW", color: "#4CAF50" },
                  { label: "Saving vs Baseline", value: "14.2", unit: "%", color: "#C59E3C" },
                ].map((k) => (
                  <div key={k.label} className="px-5 py-4 border-r last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="text-gray-500 text-xs mb-1">{k.label}</div>
                    <div className="font-bold text-2xl tabular-nums" style={{ color: k.color }}>
                      {k.value}<span className="text-sm ml-1 opacity-60">{k.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="text-gray-500 text-xs mb-3">Common-area energy: today (kWh/hr)</div>
                <div className="flex items-end gap-0.5 h-16">
                  {BAR_DATA.map((v, i) => {
                    const h = (v / BAR_MAX) * 100;
                    const isActive = i === activeHour;
                    const isPast = i < activeHour;
                    return (
                      <div key={i} className="flex-1 rounded-t transition-all duration-700"
                        style={{
                          height: `${h}%`,
                          backgroundColor: isActive
                            ? "#C59E3C"
                            : isPast
                            ? "rgba(76,175,80,0.6)"
                            : "rgba(76,175,80,0.18)",
                          boxShadow: isActive ? "0 0 8px #C59E3C88" : "none",
                        }} />
                    );
                  })}
                </div>
                <div className="flex justify-between text-gray-600 text-xs mt-1">
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
                </div>
              </div>

              {/* Systems table */}
              <div className="px-5 py-3">
                <div className="text-gray-500 text-xs mb-3">Building systems: live readings</div>
                <div className="space-y-2">
                  {SYSTEMS.map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between py-2 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center gap-3">
                        <StatusDot status={s.status} />
                        <span className="text-gray-300 text-sm">{s.name}</span>
                      </div>
                      <span className="text-white text-sm font-mono tabular-nums transition-all">
                        {readings[i].toFixed(1)} <span className="text-gray-500 text-xs">{s.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Alerts */}
            <div className="flex flex-col">
              <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="text-gray-500 text-xs">AI Alerts & Insights</div>
              </div>
              <div className="flex-1 px-4 py-3 space-y-3">
                {ALERTS.map((a) => {
                  const colors = {
                    warning: { bg: "rgba(197,158,60,0.1)", border: "rgba(197,158,60,0.3)", text: "#C59E3C" },
                    saving:  { bg: "rgba(76,175,80,0.1)",  border: "rgba(76,175,80,0.3)",  text: "#4CAF50" },
                    alert:   { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  text: "#ef4444" },
                    info:    { bg: "rgba(99,179,237,0.1)", border: "rgba(99,179,237,0.3)", text: "#63b3ed" },
                  }[a.level]!;
                  return (
                    <div key={a.time} className="rounded-xl p-3"
                      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                      <div className="text-xs mb-1 font-mono" style={{ color: colors.text }}>{a.time}</div>
                      <div className="text-gray-300 text-xs leading-relaxed">{a.msg}</div>
                    </div>
                  );
                })}
              </div>

              {/* Mini access feed */}
              <div className="border-t px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="text-gray-500 text-xs mb-2">Recent access events</div>
                {[
                  { name: "Resident #412", time: "09:17", method: "Face" },
                  { name: "Resident #208", time: "09:14", method: "Face" },
                  { name: "Visitor", time: "09:11", method: "PIN" },
                ].map((e) => (
                  <div key={e.time} className="flex items-center justify-between py-1">
                    <span className="text-gray-400 text-xs">{e.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50" }}>{e.method}</span>
                      <span className="text-gray-600 text-xs font-mono">{e.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Readings update every few seconds. Real dashboard shows 15-second BMS polling.
        </p>
      </div>
    </section>
  );
}
