"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#1B5E20" }}
          >
            yopo
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-widest mt-1"
            style={{ color: "#C59E3C" }}
          >
            .app
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#what-we-do" className="hover:text-[#1B5E20] transition-colors">What We Do</a>
          <a href="#how-it-works" className="hover:text-[#1B5E20] transition-colors">How It Works</a>
          <a href="#why-yopo" className="hover:text-[#1B5E20] transition-colors">Why Yopo</a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-white font-semibold transition-colors"
            style={{ backgroundColor: "#1B5E20" }}
          >
            Get in Touch
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <a href="#what-we-do" onClick={() => setOpen(false)}>What We Do</a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#why-yopo" onClick={() => setOpen(false)}>Why Yopo</a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-full text-white font-semibold text-center"
            style={{ backgroundColor: "#1B5E20" }}
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
