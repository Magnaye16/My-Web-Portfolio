import React, { useState } from "react";
import { Search, Sparkles, Code2, Server, BrainCircuit, CheckCircle } from "lucide-react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

interface SkillsProps {
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onOpenChatWithPrompt }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const categoryIcons = [Code2, Server, BrainCircuit];

  return (
    <section id="skills" className="py-24 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-mono uppercase tracking-wider mb-3">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Technical Stack &amp; Core Tooling
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              Modern tooling and frameworks I leverage daily to engineer scalable, high-speed software.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Gemini)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            const filteredSkills = cat.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div
                key={cat.title}
                className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between space-y-6 shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-100">{cat.title}</h3>
                      <p className="text-[11px] text-stone-400">{cat.description}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3 pt-4">
                    {filteredSkills.length === 0 ? (
                      <p className="text-xs text-stone-500 py-4 text-center">No skills match search</p>
                    ) : (
                      filteredSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-stone-200 flex items-center gap-1.5">
                              {skill.name}
                              {skill.highlight && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Primary core skill" />
                              )}
                            </span>
                            <span className="text-stone-400 font-mono text-[11px]">
                              {skill.level}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                              style={{ width: `${skill.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Footer AI trigger */}
                <button
                  onClick={() =>
                    onOpenChatWithPrompt(`Can you explain John Roi's expertise in ${cat.title.toLowerCase()}, and what projects demonstrate it?`)
                  }
                  className="w-full py-2 px-3 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/30 text-stone-300 hover:text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ask AI about {cat.title}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
