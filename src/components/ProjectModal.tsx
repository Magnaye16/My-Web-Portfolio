import React from "react";
import { X, ExternalLink, Github, Sparkles, Check, Layers, Code, ArrowRight } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenChatWithPrompt,
}) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with image banner */}
        <div className="relative h-56 sm:h-72 w-full bg-stone-950 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-300 hover:text-white border border-stone-700 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800/80">
              {project.categoryLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 mt-2">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">{project.tagline}</p>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Metrics highlight */}
          {project.metrics && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-mono uppercase tracking-wider">Key Impact Metric</p>
                <p className="text-sm font-semibold text-emerald-300">{project.metrics}</p>
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono">
              Architecture &amp; Implementation Overview
            </h4>
            <p className="text-stone-300 text-sm leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono">
              Key Features &amp; Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-xs text-stone-300"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-mono border border-stone-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>

            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Reference / Article</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenChatWithPrompt(
                `Can you break down the system architecture and code design of ${project.title} by John Roi Magnaye?`
              );
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask RoiBot About This Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};
