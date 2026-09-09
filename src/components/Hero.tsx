import React from "react";
import { ArrowRight, Sparkles, Github, Linkedin, Mail, Trophy, Award, GraduationCap, Terminal, Phone, MapPin } from "lucide-react";
import { PORTFOLIO_INFO, CHAT_PROMPT_SUGGESTIONS } from "../data/portfolioData";

interface HeroProps {
  onOpenChatWithPrompt: (prompt: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChatWithPrompt, onOpenResume }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{PORTFOLIO_INFO.availabilityStatus}</span>
        </div>

        {/* Main Grid: Headline & Interactive Code Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols): Headings and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                <span>{PORTFOLIO_INFO.name}</span>
                <span>&bull;</span>
                <span className="text-stone-400">BSIT (Cum Laude)</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-100 tracking-tight leading-[1.15]">
                Information Technology &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Robotics
                </span>{" "}
                Champion
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed font-normal">
              {PORTFOLIO_INFO.bio}
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PORTFOLIO_INFO.location}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {PORTFOLIO_INFO.phone}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Quezon City University (Cum Laude)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-stone-900 bg-stone-100 hover:bg-white shadow-lg hover:shadow-stone-200/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects &amp; Robots</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-chat-ai-btn"
                onClick={() => onOpenChatWithPrompt("Hi RoiBot! Tell me about John Roi's background, honors, and VEX robotics awards.")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Ask Portfolio Chatbot</span>
              </button>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-stone-300 border border-stone-700 hover:border-stone-500 hover:bg-stone-800/80 transition-all cursor-pointer"
              >
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="flex items-center gap-4 pt-3 text-stone-400">
              <span className="text-xs uppercase tracking-wider font-mono text-stone-500">Connect:</span>
              <a
                id="hero-social-github"
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-stone-800/70 hover:bg-stone-700 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="hero-social-linkedin"
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg bg-stone-800/70 hover:bg-stone-700 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="hero-social-email"
                href={`mailto:${PORTFOLIO_INFO.email}`}
                aria-label="Email John Roi"
                className="p-2 rounded-lg bg-stone-800/70 hover:bg-stone-700 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-stone-300 hidden sm:inline">
                {PORTFOLIO_INFO.email}
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Assistant Preview & Honors Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-stone-900/90 border border-stone-800 shadow-2xl p-5 relative overflow-hidden backdrop-blur-sm space-y-4">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-stone-400 ml-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    john-roi-profile.json
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
                  Ready to Hire
                </span>
              </div>

              {/* Major Honor Highlight Badge */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-emerald-950/40 border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-200 uppercase tracking-wide">
                      VEX World Championship 2026
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-medium mt-0.5">
                    17th Place Design Division &amp; National Excellence Award
                  </p>
                  <p className="text-[11px] text-stone-400 font-mono mt-1">
                    QCU Robotics Society &bull; Robot Skills Champion
                  </p>
                </div>
              </div>

              {/* Chatbot preview prompt box */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-stone-200">RoiBot AI Assistant</p>
                    <p className="text-stone-400 leading-relaxed">
                      "I'm trained on John Roi's resume, college honors, VEX robotics awards, and technical expertise. Ask me anything!"
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Prompt Buttons */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                    Quick inquiries:
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {CHAT_PROMPT_SUGGESTIONS.slice(0, 3).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => onOpenChatWithPrompt(prompt)}
                        className="w-full text-left px-3 py-2 rounded-lg bg-stone-800/50 hover:bg-emerald-950/40 hover:border-emerald-600/40 border border-stone-800 text-stone-300 hover:text-emerald-300 text-xs transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate">{prompt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Snapshot pills */}
                <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Core:</span>
                  {["Python", "Java", "C++", "C#", "Web Dev", "VEX Robotics", "MS Office"].map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-stone-800/80 pt-10">
          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-mono">
              Cum Laude
            </div>
            <div className="text-xs sm:text-sm text-stone-400 mt-1">Quezon City University (BSIT)</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              17th Place
            </div>
            <div className="text-xs sm:text-sm text-stone-400 mt-1">VEX World Championship 2026</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              4x Champion
            </div>
            <div className="text-xs sm:text-sm text-stone-400 mt-1">National Robotics Championships</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">
              With High Honor
            </div>
            <div className="text-xs sm:text-sm text-stone-400 mt-1">TVL - ICT (AICS Senior High)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
