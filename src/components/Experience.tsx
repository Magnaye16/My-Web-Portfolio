import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { EXPERIENCE_DATA } from "../data/portfolioData";

interface ExperienceProps {
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenChatWithPrompt }) => {
  return (
    <section id="experience" className="py-24 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-mono uppercase tracking-wider mb-3">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Work Experience &amp; Impact
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            Demonstrated professional reliability, official data management at the Philippine Statistics Authority, and dependable client logistics.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-stone-800 ml-4 sm:ml-6 space-y-12">
          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-emerald-500 group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-emerald-500/40 transition-all space-y-4">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-stone-100">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-emerald-400">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2 pt-1">
                  {item.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/70">
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      onOpenChatWithPrompt(`Tell me more about John Roi's role at ${item.company} as a ${item.role} and his main accomplishments.`)
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI about this role</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
