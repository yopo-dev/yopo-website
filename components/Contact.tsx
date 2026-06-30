"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "linear-gradient(160deg, #1B5E20 0%, #2E7D32 60%, #143D16 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Interested in reducing your building's energy costs or upgrading your access control? Let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="text-green-100 space-y-8">
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">What happens next</h3>
              <ul className="space-y-4 text-sm leading-relaxed">
                {[
                  "We review your message and respond within one business day.",
                  "We schedule a short call to understand your building and current setup.",
                  "We share a tailored overview of what Yopo can deliver, with realistic numbers.",
                  "If there's a fit, we agree on a pilot scope and timeline.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#C59E3C", color: "#fff" }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-green-700">
              <p className="text-green-200 text-sm">Based in Dubai, UAE</p>
              <a href="mailto:hello@yopo.app" className="text-white font-semibold hover:text-yellow-300 transition-colors">
                hello@yopo.app
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {submitted ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#1B5E2015" }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="#1B5E20" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1B5E20" }}>Message Sent</h3>
                <p className="text-gray-500 text-sm">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Name *
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": "#1B5E20" } as React.CSSProperties}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Company / Building
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Property management company or building name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                    placeholder="Tell us about your building and what you're looking to achieve..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-white font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.01]"
                  style={{ backgroundColor: "#1B5E20" }}
                >
                  Send Message
                </button>

                <p className="text-gray-400 text-xs text-center">
                  No spam. We only reach out to discuss your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
