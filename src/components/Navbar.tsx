import React, { useState, useEffect } from "react";
import { MessageSquareCode, Menu, X, Sparkles, FolderGit2, Briefcase, User, Mail, Wrench, Newspaper } from "lucide-react";
import { PORTFOLIO_INFO } from "../data/portfolioData";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", icon: User },
    { label: "Projects", href: "#projects", icon: FolderGit2 },
    { label: "Press", href: "#press", icon: Newspaper },
    { label: "Skills", href: "#skills", icon: Wrench },
    { label: "Experience", href: "#experience", icon: Briefcase },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-stone-900/90 backdrop-blur-md border-b border-stone-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            id="brand-logo"
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              JR
            </div>
            <div className="flex flex-col">
              <span className="text-stone-100 font-semibold tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                My Portfolio
                <span className="text-xs font-normal text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 hidden sm:inline-block">
                  {PORTFOLIO_INFO.name}
                </span>
              </span>
              <span className="text-xs text-stone-400 font-mono hidden md:block">
                BSIT (Cum Laude) &amp; Robotics Specialist
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-stone-300 border border-stone-700 hover:border-stone-500 hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              Resume
            </button>
            <button
              id="nav-chatbot-btn"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm hover:shadow-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Ask AI Chatbot</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-chat-trigger"
              onClick={onOpenChat}
              aria-label="Open AI Chatbot"
              className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-stone-800 hover:text-emerald-400"
                >
                  <Icon className="w-5 h-5 text-stone-400" />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-stone-200 border border-stone-700 hover:bg-stone-800 text-center"
            >
              View Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md"
            >
              <MessageSquareCode className="w-4 h-4" />
              Chat with AI Assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
