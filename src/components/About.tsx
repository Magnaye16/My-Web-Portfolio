import React from "react";
import { CheckCircle2, Sparkles, Trophy, GraduationCap, ShieldCheck, Cpu, Download } from "lucide-react";
import { PORTFOLIO_INFO, EDUCATION_DATA, ACHIEVEMENTS_DATA, TRAININGS_DATA } from "../data/portfolioData";

interface AboutProps {
  onOpenChatWithPrompt: (prompt: string) => void;
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenChatWithPrompt, onOpenResume }) => {
  return (
    <section id="about" className="py-24 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-mono uppercase tracking-wider mb-3">
            Profile &amp; Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Driven by curiosity, academic excellence, and competitive robotics
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
              {PORTFOLIO_INFO.bio}
            </p>

            {/* Academic Highlights */}
            <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Academic Background &amp; Honors
              </h3>
              <div className="space-y-3">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 border-l-2 border-emerald-500/50 pl-3">
                    <div>
                      <h4 className="text-sm font-bold text-stone-100">{edu.institution}</h4>
                      <p className="text-xs text-stone-300">{edu.degree}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                        {edu.honors}
                      </span>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Strengths from Resume */}
            <div className="space-y-2.5 pt-1">
              {[
                "Strong written and verbal communication with active listening",
                "Proven problem-solving in high-pressure VEX World Championship divisions",
                "Demonstrated adaptability across Python, Java, C++, C#, and Web technologies",
                "Hands-on office administration, data encoding, and reporting experience at PSA",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-stone-300 text-xs sm:text-sm">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-stone-900 bg-stone-100 hover:bg-white shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Full Curriculum Vitae</span>
              </button>
              <button
                onClick={() => onOpenChatWithPrompt("Can you tell me about John Roi's academic achievements and robotics tournaments?")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-stone-300 border border-stone-700 hover:border-emerald-500/50 hover:bg-stone-800/80 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Ask Chatbot About Honors</span>
              </button>
            </div>
          </div>

          {/* Right: Core Values & Achievements */}
          <div className="lg:col-span-6 space-y-6">
            {/* VEX Robotics Championship Showcase Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/40 border border-emerald-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-100 uppercase tracking-wide">
                      Competitive Robotics Record
                    </h3>
                    <p className="text-xs text-stone-400">QCU Robotics Society (2024 - 2026)</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  World Finalist
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {ACHIEVEMENTS_DATA.map((ach, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">{ach.year}</span>
                    <h4 className="text-xs font-bold text-stone-200">{ach.competition}</h4>
                    <p className="text-[11px] text-stone-400">{ach.awards.join(" • ")}</p>
                  </div>
                ))}
              </div>

              {/* Press coverage quick link */}
              <div className="pt-2 border-t border-emerald-800/40 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-stone-300">
                  Featured in <strong className="text-amber-300 font-semibold">Quezon City Gov</strong>, <strong className="text-amber-300 font-semibold">QCU News</strong> &amp; <strong className="text-amber-300 font-semibold">Philstar</strong>
                </span>
                <a
                  href="#press"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Articles &amp; Photos &rarr;</span>
                </a>
              </div>
            </div>

            {/* Trainings and Seminars */}
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Trainings &amp; Seminars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRAININGS_DATA.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <h4 className="text-xs font-medium text-stone-200">{t.title}</h4>
                    <span className="text-[11px] font-mono text-stone-500">{t.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_INFO.coreValues.map((value) => (
                <div
                  key={value.title}
                  className="p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-emerald-500/30 transition-all"
                >
                  <h4 className="text-stone-200 font-semibold text-xs sm:text-sm mb-1">
                    {value.title}
                  </h4>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
