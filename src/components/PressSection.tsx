import React, { useState } from "react";
import { ExternalLink, Award, Newspaper, Calendar, ArrowUpRight, MessageSquare, ZoomIn, X, Trophy } from "lucide-react";
import { PRESS_ARTICLES } from "../data/portfolioData";
import { PressArticle } from "../types";

interface PressSectionProps {
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const PressSection: React.FC<PressSectionProps> = ({ onOpenChatWithPrompt }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  return (
    <section id="press" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 bg-stone-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Government, Media &amp; University Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured in Official News &amp; Press
            </h2>
            <p className="mt-2 text-stone-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Read official Quezon City Government announcements, university features, and national newspaper columns spotlighting John Roi Magnaye and the QCU Robotics Society sweeping the National Championship and representing the Philippines at the VEX Robotics World Stage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="press-ask-ai-button"
              onClick={() =>
                onOpenChatWithPrompt("Summarize what Quezon City Government, QCU News, and Philstar reported about John Roi and the robotics team.")
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 text-xs sm:text-sm font-medium border border-stone-700/70 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Ask AI About This Coverage</span>
            </button>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PRESS_ARTICLES.map((article: PressArticle) => (
            <article
              key={article.id}
              id={`press-card-${article.id}`}
              className="flex flex-col bg-stone-900/80 rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/5 group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-stone-950 backdrop-blur-sm shadow-md">
                    <Trophy className="w-3.5 h-3.5" />
                    {article.badge}
                  </span>
                </div>

                {/* Zoom In Action */}
                <button
                  id={`zoom-image-${article.id}`}
                  onClick={() => setSelectedImage({ src: article.imageUrl, caption: article.title })}
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-white backdrop-blur-sm border border-stone-700/50 transition-colors"
                  title="View full image"
                  aria-label="View full image"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Publication & Date in Image Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-2 font-medium text-amber-300">
                    <span>{article.publication}</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {article.author && (
                    <p className="text-xs text-amber-400/90 font-medium">
                      By {article.author}
                    </p>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-start justify-between gap-2"
                    >
                      <span>{article.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-amber-400 flex-shrink-0 mt-1" />
                    </a>
                  </h3>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Highlights / Key Points */}
                  <div className="space-y-2 pt-2 border-t border-stone-800/80">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Key Highlights & Impact:
                    </p>
                    <ul className="space-y-2">
                      {article.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pull Quote */}
                  {article.quote && (
                    <blockquote className="p-3.5 rounded-xl bg-amber-500/5 border-l-2 border-amber-500 text-xs sm:text-sm italic text-amber-200/90">
                      &ldquo;{article.quote}&rdquo;
                    </blockquote>
                  )}

                  {/* Secondary Image if present */}
                  {article.secondaryImageUrl && (
                    <div className="pt-2">
                      <p className="text-xs text-stone-400 mb-2 font-medium">Competition Standings & Scoreboard:</p>
                      <button
                        onClick={() =>
                          setSelectedImage({
                            src: article.secondaryImageUrl!,
                            caption: "VEX World Skills Standings - QCU Ranked #17 Globally",
                          })
                        }
                        className="relative w-full h-36 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-500/50 group/img text-left block"
                      >
                        <img
                          src={article.secondaryImageUrl}
                          alt="World Skills Standings"
                          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-stone-950/30 hover:bg-transparent transition-colors flex items-center justify-center">
                          <span className="bg-stone-900/90 text-stone-200 text-xs px-2.5 py-1 rounded border border-stone-700 flex items-center gap-1.5 backdrop-blur-sm">
                            <ZoomIn className="w-3.5 h-3.5 text-amber-400" /> Click to Expand Standings
                          </span>
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Stat Chips */}
                  {article.stats && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {article.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 text-center"
                        >
                          <p className="text-xs text-stone-400 font-medium">{stat.label}</p>
                          <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
                  <a
                    id={`read-article-${article.id}`}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() =>
                      onOpenChatWithPrompt(`Tell me more about the article "${article.title}" published in ${article.publication}.`)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-300 hover:text-white bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Discuss with AI</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-stone-900 rounded-2xl border border-stone-700 overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
              <h4 className="text-sm sm:text-base font-semibold text-white truncate pr-4">
                {selectedImage.caption}
              </h4>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-stone-950 rounded-xl p-2">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
