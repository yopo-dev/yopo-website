"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 2847193,
    suffix: " kWh",
    label: "Energy Saved",
    sublabel: "across all buildings",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#C59E3C",
    decimals: 0,
  },
  {
    value: 1423,
    suffix: " tonnes",
    label: "CO₂ Avoided",
    sublabel: "equivalent to 65,000 trees",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#4CAF50",
    decimals: 0,
  },
  {
    value: 43,
    suffix: "",
    label: "Buildings Connected",
    sublabel: "across Dubai & UAE",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "#C59E3C",
    decimals: 0,
  },
  {
    value: 14.2,
    suffix: "%",
    label: "Avg. Energy Reduction",
    sublabel: "weather-adjusted baseline",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "#4CAF50",
    decimals: 1,
  },
];

function useCountUp(target: number, duration: number, start: boolean, decimals: number) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [start, target, duration, decimals]);

  return count;
}

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2200, animate, stat.decimals);
  const display = stat.decimals > 0
    ? count.toFixed(stat.decimals)
    : Math.floor(count).toLocaleString();

  return (
    <div className="relative flex flex-col items-center text-center p-8 rounded-2xl overflow-hidden group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}>
      {/* Glow blob */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: stat.color }} />

      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-white"
        style={{ backgroundColor: `${stat.color}22`, border: `1px solid ${stat.color}44` }}>
        <span style={{ color: stat.color }}>{stat.icon}</span>
      </div>

      <div className="relative text-4xl md:text-5xl font-bold text-white mb-1 tabular-nums tracking-tight">
        {display}
        <span style={{ color: stat.color }}>{stat.suffix}</span>
      </div>
      <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
      <div className="text-green-300 text-sm opacity-70">{stat.sublabel}</div>
    </div>
  );
}

export default function ImpactCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D2B10 0%, #1B5E20 45%, #0A1F0C 100%)" }}>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197,158,60,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,158,60,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

      {/* Pulse rings top-left */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
        style={{ border: "1px solid #C59E3C", animation: "ping 4s cubic-bezier(0,0,0.2,1) infinite" }} />
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full opacity-10"
        style={{ border: "1px solid #4CAF50", animation: "ping 4s cubic-bezier(0,0,0.2,1) infinite 1s" }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(197,158,60,0.15)", color: "#C59E3C", border: "1px solid rgba(197,158,60,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Live Platform Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real savings. Real planet impact.
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto opacity-80">
            Every building on Yopo contributes to the UAE&apos;s Net Zero 2050 goal.
            These numbers update as our buildings keep optimising.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>

        {/* UAE Net Zero alignment banner */}
        <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "rgba(197,158,60,0.08)",
            border: "1px solid rgba(197,158,60,0.25)",
          }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(197,158,60,0.15)" }}>
              <svg className="w-6 h-6" fill="none" stroke="#C59E3C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-lg">Aligned with UAE Net Zero 2050</div>
              <div className="text-green-300 text-sm opacity-75">
                Yopo buildings are actively contributing to the UAE&apos;s national climate strategy, measurably and not symbolically.
              </div>
            </div>
          </div>
          <a href="#contact"
            className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: "#C59E3C", color: "#fff" }}>
            Join the mission
          </a>
        </div>
      </div>
    </section>
  );
}
