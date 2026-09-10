/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

import React, { useState } from "react";
import { Mail, Copy, Check, Send, Sparkles, MapPin, Clock, MessageSquare } from "lucide-react";
import { PORTFOLIO_INFO } from "../data/portfolioData";
import { ContactFormData } from "../types";

interface ContactProps {
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenChatWithPrompt }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStatus("submitting");
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-mono uppercase tracking-wider mb-3">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
                Let's build something remarkable together
              </h2>
              <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
                Whether you have an ambitious project, an engineering role opening, or want to discuss AI integration architectures, I'm always open to connecting.
              </p>
            </div>

            {/* Quick Email Card */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Direct Email
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Replies within 24 hours
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800/80">
                <span className="text-sm font-mono text-stone-200 truncate">
                  {PORTFOLIO_INFO.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone row */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800/80">
                <span className="text-sm font-mono text-stone-200 truncate">
                  {PORTFOLIO_INFO.phone}
                </span>
                <a
                  href={`tel:${PORTFOLIO_INFO.phone.replace(/\s+/g, "")}`}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-xs font-medium"
                >
                  Call / SMS
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{PORTFOLIO_INFO.address}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Quezon City (PHT / UTC+8)</span>
                </div>
              </div>
            </div>

            {/* Chatbot inquiry helper CTA */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-stone-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Need help formulating an inquiry?</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                The portfolio chatbot can draft an introductory project pitch or answer questions about John Roi's availability.
              </p>
              <button
                onClick={() =>
                  onOpenChatWithPrompt("Hi RoiBot! Can you help me draft a project inquiry message for John Roi regarding a new web application?")
                }
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium pt-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Draft an inquiry with AI Chatbot &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right form column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800/80 shadow-xl">
              <h3 className="text-xl font-bold text-stone-100 mb-6">Send a Message</h3>

              {submitStatus === "success" ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-stone-100 font-semibold">Message Received!</h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    Thank you for reaching out. John Roi will review your note and respond to you at{" "}
                    <span className="text-stone-300">{PORTFOLIO_INFO.email}</span> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project collaboration / Engineering opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi John Roi, I'd like to discuss an opportunity..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-3 px-6 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitStatus === "submitting" ? "Sending Note..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
