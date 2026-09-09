import React from "react";
import { Github, Linkedin, Mail, Sparkles, Heart } from "lucide-react";
import { PORTFOLIO_INFO } from "../data/portfolioData";

interface FooterProps {
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat }) => {
  return (
    <footer id="main-footer" className="bg-stone-950 border-t border-stone-800/80 py-12 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800/80">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              JR
            </div>
            <div>
              <span className="text-stone-200 font-semibold text-sm">My Portfolio</span>
              <span className="text-stone-400 text-xs block">&copy; {new Date().getFullYear()} {PORTFOLIO_INFO.name}. All rights reserved.</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#about" className="hover:text-stone-200 transition-colors">About</a>
            <a href="#projects" className="hover:text-stone-200 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-stone-200 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-stone-200 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-stone-200 transition-colors">Contact</a>
          </div>

          {/* Socials & Chat trigger */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_INFO.email}`}
              aria-label="Direct email"
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>
            Built with React 19, TypeScript, Tailwind CSS, and Google Gemini API.
          </p>
          <p className="font-mono text-[11px]">
            Designed for performance &amp; clean engineering.
          </p>
        </div>
      </div>
    </footer>
  );
};
