import React from "react";
import { X, Printer, Mail, MapPin, Phone, Briefcase, GraduationCap, Trophy, Award, CheckCircle2, User, Users, Shield, Github, ExternalLink } from "lucide-react";
import { PORTFOLIO_INFO, EDUCATION_DATA, ACHIEVEMENTS_DATA, TRAININGS_DATA, EXPERIENCE_DATA, SKILL_CATEGORIES } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl my-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-stone-100 uppercase tracking-wide font-mono">Curriculum Vitae</span>
            <span className="text-xs text-stone-400 font-mono">({PORTFOLIO_INFO.name})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close Resume"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Document */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto flex-1 bg-stone-900 text-stone-200 text-sm">
          {/* Header */}
          <div className="border-b border-stone-800 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight uppercase">
              {PORTFOLIO_INFO.name}
            </h1>
            <p className="text-base text-emerald-400 font-semibold font-mono">
              Bachelor of Science in Information Technology (Cum Laude)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-300 font-mono pt-3">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {PORTFOLIO_INFO.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {PORTFOLIO_INFO.email}
              </span>
              <a
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>github.com/Magnaye16</span>
              </a>
              <span className="flex items-center gap-1.5 sm:col-span-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {PORTFOLIO_INFO.address}
              </span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1">
              Profile
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Adaptable and motivated Information Technology fresh graduate with strong problem-solving skills and a passion for learning new technologies and contributing to innovative solutions.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase">Tertiary (2022 - 2026)</span>
                  <h3 className="text-base font-bold text-stone-100">QUEZON CITY UNIVERSITY</h3>
                  <p className="text-xs text-stone-300">Bachelor of Science in Information Technology</p>
                </div>
                <div className="sm:text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono font-bold border border-emerald-800">
                    CUM LAUDE
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-stone-400 uppercase">Secondary (2020 - 2022)</span>
                  <h3 className="text-base font-bold text-stone-100">ASIAN INSTITUTE OF COMPUTER SCIENCE</h3>
                  <p className="text-xs text-stone-300">TVL - Information and Communication Technology</p>
                </div>
                <div className="sm:text-right">
                  <span className="px-2.5 py-1 rounded-full bg-stone-800 text-stone-200 text-xs font-mono font-bold border border-stone-700">
                    WITH HIGH HONOR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements - VEX Robotics Champions */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS_DATA.map((ach, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-stone-200">{ach.competition}</h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">{ach.year}</span>
                  </div>
                  <ul className="space-y-1 pt-1">
                    {ach.awards.map((award, i) => (
                      <li key={i} className="text-xs text-stone-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work Experience
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-100">
                    PHILIPPINE STATISTICS AUTHORITY &mdash; <span className="text-emerald-400">On-the-Job Training / Intern</span>
                  </h3>
                  <span className="text-xs font-mono text-stone-400">September - October 2025</span>
                </div>
                <ul className="space-y-1 pt-1">
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Assisting with office or administrative tasks</span>
                  </li>
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Encoding and organizing documents or data</span>
                  </li>
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Preparing reports and files</span>
                  </li>
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Using office software and equipment</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-100">
                    FREELANCE DRIVER &mdash; <span className="text-emerald-400">On-call</span>
                  </h3>
                  <span className="text-xs font-mono text-stone-400">September 2024 - Present</span>
                </div>
                <ul className="space-y-1 pt-1">
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Transported clients safely and efficiently to various destinations</span>
                  </li>
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Maintained excellent customer service and communication skills</span>
                  </li>
                  <li className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Managed flexible schedules and responded promptly to client requests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Area of Expertise & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Area of Expertise */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1">
                Area of Expertise
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Web Development",
                  "Programming (Python, Java, C++, C#, Visual Basic)",
                  "Basic Troubleshooting and Hardware Setup",
                  "Software Applications",
                  "Microsoft Office",
                  "Video Editing",
                ].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1">
                Professional Skills
              </h2>
              <ul className="space-y-1 pt-1 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strong written and verbal communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Excellent organizational and time management skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Ability to work both independently and as part of a team</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Fast learner and highly adaptable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Active Listening and Critical Thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Team and project management skills and experience</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Organizations & Trainings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Organization
              </h2>
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                <h3 className="text-xs font-bold text-stone-200">QCU Robotics Society</h3>
                <p className="text-xs text-emerald-400">Member</p>
                <span className="text-[11px] font-mono text-stone-500">2024 - 2026</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Training &amp; Seminar
              </h2>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-300">Maralabs CyberSafety Seminar</span>
                  <span className="text-[11px] font-mono text-stone-500">2025</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-300">IGNITE Summit 2023: Innovation Generation</span>
                  <span className="text-[11px] font-mono text-stone-500">2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-stone-800 pb-1 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-4 rounded-xl bg-stone-950/60 border border-stone-800">
              <div>
                <span className="text-stone-500 block font-mono">Age:</span>
                <span className="text-stone-200 font-medium">22</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Birthday:</span>
                <span className="text-stone-200 font-medium">January 16, 2004</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Birthplace:</span>
                <span className="text-stone-200 font-medium">Quezon City</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Civil Status:</span>
                <span className="text-stone-200 font-medium">Single</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Nationality:</span>
                <span className="text-stone-200 font-medium">Filipino</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Religion:</span>
                <span className="text-stone-200 font-medium">Roman Catholic</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Dialect / Languages:</span>
                <span className="text-stone-200 font-medium">English, Tagalog</span>
              </div>
              <div>
                <span className="text-stone-500 block font-mono">Height / Weight:</span>
                <span className="text-stone-200 font-medium">5'6 / 70kgs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
