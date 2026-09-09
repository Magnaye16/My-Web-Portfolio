import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, ArrowUpRight, Check, Eye } from "lucide-react";
import { PROJECTS_DATA } from "../data/portfolioData";
import { Project } from "../types";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onOpenChatWithPrompt }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "robotics" | "web" | "software">("all");

  const filterTabs = [
    { key: "all", label: "All Works" },
    { key: "robotics", label: "Robotics & Systems" },
    { key: "web", label: "Web Applications" },
    { key: "software", label: "Software & Data" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-mono uppercase tracking-wider mb-3">
              Selected Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Featured Projects &amp; Systems
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              A collection of production applications, developer tools, and AI prototypes built with clean architecture and modern performance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === tab.key
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-emerald-500/40 transition-all flex flex-col overflow-hidden group shadow-lg"
            >
              {/* Image banner preview */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700/80 text-emerald-400 font-medium">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={() => onSelectProject(project)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700 text-stone-200 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-md cursor-pointer flex items-center gap-1.5 text-xs px-2.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-lg font-bold text-stone-100 hover:text-emerald-400 transition-colors cursor-pointer group-hover:underline"
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-emerald-400/90 font-medium">
                    {project.tagline}
                  </p>

                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Key Metric highlight */}
                {project.metrics && (
                  <div className="px-3 py-1.5 rounded-lg bg-stone-950/70 border border-stone-800 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800/80 text-stone-300 border border-stone-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800/50 text-stone-400">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                      title="Source Code / Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} external link`}
                        className="p-2 rounded-lg text-stone-400 hover:text-emerald-300 hover:bg-stone-800 transition-colors"
                        title="Live / External Article Reference"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      onOpenChatWithPrompt(`Can you explain how John Roi built ${project.title}, what tech stack was used, and what challenges he solved?`)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-950/50 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
