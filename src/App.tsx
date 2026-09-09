/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { PressSection } from "./components/PressSection";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { ProjectModal } from "./components/ProjectModal";
import { ResumeModal } from "./components/ResumeModal";
import { Project } from "./types";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  const handlePromptConsumed = () => {
    setInitialPrompt(undefined);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-emerald-500 selection:text-stone-950 font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        onOpenChat={handleOpenChat}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <About
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
        />
        <PressSection onOpenChatWithPrompt={handleOpenChatWithPrompt} />
        <Skills onOpenChatWithPrompt={handleOpenChatWithPrompt} />
        <Experience onOpenChatWithPrompt={handleOpenChatWithPrompt} />
        <Contact onOpenChatWithPrompt={handleOpenChatWithPrompt} />
      </main>

      {/* Footer */}
      <Footer onOpenChat={handleOpenChat} />

      {/* Interactive AI Chatbot Widget */}
      <Chatbot
        isOpen={isChatOpen}
        onOpen={handleOpenChat}
        onClose={handleCloseChat}
        initialPrompt={initialPrompt}
        onPromptConsumed={handlePromptConsumed}
      />

      {/* Project Deep-Dive Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenChatWithPrompt={handleOpenChatWithPrompt}
      />

      {/* Resume Overview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
