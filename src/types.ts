export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: "all" | "robotics" | "web" | "software";
  categoryLabel: string;
  tags: string[];
  features: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: "Expert" | "Advanced" | "Proficient";
    percentage: number;
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  level: string;
  institution: string;
  degree: string;
  honors?: string;
  period: string;
}

export interface AchievementItem {
  competition: string;
  awards: string[];
  year: string;
  highlight?: boolean;
}

export interface TrainingItem {
  title: string;
  year: string;
}

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  author?: string;
  date: string;
  url: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  quote?: string;
  stats?: { label: string; value: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
