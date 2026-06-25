"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number; // 0..1, pulses over time
  phase: number;
}

interface Pulse {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number; // 0..1
  speed: number;
  color: string;
}

const GOLD = "197,158,60";
const GREEN = "76,175,80";
const NODE_COUNT = 38;
const MAX_DIST = 160;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function EnergyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width;
      canvas!.height = height;
    }

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: randomBetween(0, width),
          y: randomBetween(0, height),
          vx: randomBetween(-0.25, 0.25),
          vy: randomBetween(-0.25, 0.25),
          radius: randomBetween(2, 4.5),
          energy: Math.random(),
          phase: randomBetween(0, Math.PI * 2),
        });
      }
    }

    function spawnPulse(a: Node, b: Node) {
      const isGold = Math.random() > 0.5;
      pulses.push({
        fromX: a.x, fromY: a.y,
        toX: b.x, toY: b.y,
        progress: 0,
        speed: randomBetween(0.006, 0.014),
        color: isGold ? GOLD : GREEN,
      });
    }

    let lastPulseTime = 0;

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.energy = 0.5 + 0.5 * Math.sin(t * 0.001 + n.phase);
      }

      // Spawn pulses every ~800ms on a random connected pair
      if (t - lastPulseTime > 800 && pulses.length < 12) {
        lastPulseTime = t;
        const candidates: [Node, Node][] = [];
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) {
              candidates.push([nodes[i], nodes[j]]);
            }
          }
        }
        if (candidates.length) {
          const pair = candidates[Math.floor(Math.random() * candidates.length)];
          spawnPulse(pair[0], pair[1]);
        }
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${GREEN},${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }

        const px = p.fromX + (p.toX - p.fromX) * p.progress;
        const py = p.fromY + (p.toY - p.fromY) * p.progress;
        const fadeAlpha = Math.sin(p.progress * Math.PI); // fade in/out

        // Trail
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 14);
        gradient.addColorStop(0, `rgba(${p.color},${fadeAlpha * 0.9})`);
        gradient.addColorStop(1, `rgba(${p.color},0)`);
        ctx!.beginPath();
        ctx!.arc(px, py, 14, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(px, py, 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${fadeAlpha})`;
        ctx!.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        const color = n.energy > 0.6 ? GOLD : GREEN;
        glow.addColorStop(0, `rgba(${color},${0.25 * n.energy})`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color},${0.6 + 0.4 * n.energy})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(canvas);
    resize();
    initNodes();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
