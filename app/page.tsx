"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ChatMessage = {
  text: string;
  isUser?: boolean;
};

type Star = {
  id: number;
  top: string;
  left: string;
  width: string;
  opacity: string;
  duration: string;
};

type ShootingStar = {
  id: number;
  top: string;
  left: string;
};

type ProjectCard = {
  name: string;
  /** Hackathon / venue line shown under the project title */
  eventLine?: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
};

function createInitialStars(): Star[] {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    width: `${Math.random() * 8 + 1}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: `${Math.random() * 0.5 + 0.3}`,
    duration: `${Math.random() * 3 + 2}s`,
  }));
}

const sections = ["home", "experience", "projects"];
const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
];

const experiences = [
  {
    id: 1,
    role: "Supplemental Instruction (SI) Leader ✦ Calculus I and II",
    company: "California State University, Fullerton",
    location: "Fullerton, CA",
    duration: "Fall 2023 - Present",
    description:
      "Lead collaborative review sessions and create practice materials to help students build stronger fundamentals in Calculus I and II.",
  },
  {
    id: 2,
    role: "Experience Title 2",
    company: "Company / Lab 2",
    location: "Location 2",
    duration: "Start - End",
    description: "Add your second experience details here.",
  },
  {
    id: 3,
    role: "Experience Title 3",
    company: "Company / Lab 3",
    location: "Location 3",
    duration: "Start - End",
    description: "Add your third experience details here.",
  },
];

const projects = [
  {
    name: "EcoPrompt",
    eventLine: "FullyHacks 2026 ✦ CSUF",
    description:
      "EcoPrompt uses multistage LLM rewrites, local inference, and retrieval backed evaluation so users can tune prompts with less waste.",
    imageUrl: "/demoecoprompt.png",
    githubUrl: "https://github.com/jdc88/project-1",
    liveUrl: "https://example.com/project-1",
    techStack: [
      "Next.js 14",
      "FastAPI",
      "PostgreSQL (Neon)",
      "Ollama",
      "qwen2.5 + gemma3",
      "HumanDelta SDK",
      "Prompt Optimization Pipeline",
    ],
  },
  {
    name: "Bio-Symphony",
    eventLine: "Google DeepMind Gemini API Hackathon ✦ UCLA",
    description:
      "Bio Symphony turns webcam pose into sound with MediaPipe and Tone.js, plus beds from text prompts with Lyria via Gemini. Next.js, TypeScript, and Tailwind.",
    imageUrl: "/biosymphony.png",
    githubUrl: "https://github.com/jdc88/project-2",
    liveUrl: "https://example.com/project-2",
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "MediaPipe Tasks Vision",
      "Google Gemini / Lyria (@google/genai)",
      "Tone.js",
    ],
  },
  {
    name: "ColorMe",
    description:
      "Seasonal style color guidance for skin tone. Vanilla JS with Flask, JWT, and saved analyses, NumPy rules, and photo sampling with sklearn KMeans, OpenCV, and Pillow.",
    imageUrl: "/ColorMedemo.png",
    githubUrl: "https://github.com/jdc88/project-3",
    liveUrl: "https://example.com/project-3",
    techStack: [
      "Python / Flask",
      "HTML, CSS, JavaScript",
      "NumPy & colorsys",
      "12-season (rule-based)",
      "scikit-learn (K-means)",
      "OpenCV & Pillow",
      "JWT (PyJWT) & Werkzeug",
      "Express (optional)",
    ],
  },
  {
    name: "Nuri",
    description:
      "Skincare shopping with ingredient lists users can control, search and barcode scan, and bookmarks in Core Data. UPCitemdb and a growing ingredient set. Calm UI and AI recommendations planned.",
    imageUrl: "/Nuridemo.png",
    githubUrl: "https://github.com/jdc88/project-4",
    liveUrl: "https://example.com/project-4",
    techStack: ["Swift / UIKit", "Core Data", "Xcode", "UPCitemdb API", "GitHub"],
  },
  {
    name: "Project 5",
    description: "This is a description of Project 5.",
    imageUrl: "/globe.svg",
    githubUrl: "https://github.com/jdc88/project-5",
    liveUrl: "https://example.com/project-5",
    techStack: ["Java", "Spring Boot", "MySQL"],
  },
];
const featuredProjects = projects.slice(0, 4);

const socialLinks = {
  github: "https://github.com/jdc88",
  linkedin: "https://www.linkedin.com/in/josephine-choi-linked-in/",
  resume:
    "https://docs.google.com/document/d/REPLACE_WITH_YOUR_RESUME_DOC_ID/edit?usp=sharing",
};

/** Whole photo stays in frame at 1; above 1 zooms in (circle clips); below 1 shrinks with more empty band. */
const HEADSHOT_ZOOM = 1.53;
/** Horizontal %, vertical % — shift framing when zoomed (e.g. move face: try "50% 38%"). */
const HEADSHOT_FOCUS = "50% 42%";

const sectionStyles = {
  homeSection: "relative z-10 mb-12 flex items-start pt-[215px] md:mb-16",
  homeContainer: "mx-auto mt-0 w-full max-w-[900px] px-7 sm:px-10 md:px-7",
  homeTitle:
    "font-museo text-center text-[36px] font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] md:text-left md:text-[46px]",
  homeBody:
    "font-museo mt-4 text-center text-[13px] sm:text-[13px] md:text-left md:text-[15px]",
  experienceSection: "relative z-10 mb-1 py-1",
  projectsSection: "relative z-10 mb-12 md:mb-16",
  sectionContainer: "mx-auto w-full max-w-[900px] px-7 sm:px-10 md:px-7",
  sectionHeading: "font-museo mb-4 text-left text-[24px] font-bold md:text-[30px]",
};

const chatbotResponses: Record<string, string> = {
  skills:
    "Josephine specializes in AI, software architecture, and user experience. She works with technologies like Python, JavaScript, React, and various AI/ML frameworks.",
  projects:
    "Check out the Projects section above to see Josephine's latest work! She's built some amazing AI-powered applications.",
  experience:
    "Josephine has experience in software development with a focus on AI applications. Visit the Experience section to learn more!",
  hello: "Hello! How can I help you learn more about Josephine?",
  hi: "Hi there! What would you like to know about Josephine's work?",
  default:
    "That's a great question! You can explore the different sections to learn more about Josephine!",
};

function getBotResponse(input: string) {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(chatbotResponses)) {
    if (lower.includes(keyword)) return response;
  }
  return chatbotResponses.default;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hi! I'm Josephine's AI assistant. Ask me about her skills, projects, or experience!",
    },
  ]);

  useEffect(() => {
    setStars(createInitialStars());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const orderedSections = sections
        .map((id) => {
          const sectionEl = document.getElementById(id);
          if (!sectionEl) return null;
          return { id, top: sectionEl.offsetTop };
        })
        .filter((section): section is { id: string; top: number } => section !== null)
        .sort((a, b) => a.top - b.top);

      const current =
        orderedSections
          .filter((section) => window.scrollY >= section.top - 220)
          .at(-1)?.id ?? "home";

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const id = Date.now() + Math.floor(Math.random() * 10000);
      const newStar = {
        id,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      };

      setShootingStars((prev) => [...prev, newStar]);

      window.setTimeout(() => {
        setShootingStars((prev) => prev.filter((star) => star.id !== id));
      }, 10000);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const sendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { text: trimmed, isUser: true }]);
    setChatInput("");

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotResponse(trimmed) }]);
    }, 500);
  };

  return (
    <div className="relative bg-[rgb(4,13,27)] text-white">
      <div className="fixed top-5 left-3 z-50">
        <Image
          src="/JClogo.png"
          alt="Logo"
          width={75}
          height={75}
          priority
          style={{ width: "11vw", maxWidth: "75px", height: "auto" }}
        />
      </div>

      <header className="fixed top-12 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="portfolio-nav-shell mx-auto flex max-w-[90vw] flex-wrap items-center justify-center gap-4 text-[rgb(4,13,27)] px-2 py-1 sm:max-w-[90vw] sm:gap-6 sm:px-3 sm:py-2 md:gap-8 md:px-4 rounded-full shadow-lg backdrop-blur-md">
          <ul
            id="pillNav2"
            className="portfolio-nav-list scrollbar-hide flex flex-nowrap gap-1 overflow-x-auto whitespace-nowrap rounded-full p-1 font-montserrat text-[11px] font-medium sm:gap-1 sm:text-sm"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={`portfolio-nav-link ${activeSection === item.id ? "active" : ""}`}
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div id="stars" className="pointer-events-none fixed inset-0 z-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.width,
              opacity: star.opacity,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
      <div id="shooting-stars" className="pointer-events-none fixed inset-0 z-0">
        {shootingStars.map((star) => (
          <span
            key={star.id}
            className="shooting-star"
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>

      <section id="home" className={sectionStyles.homeSection}>
        <div className={sectionStyles.homeContainer}>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            <div className="headshot-halo-wrap relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32">
              <div className="headshot-photo relative h-full w-full overflow-hidden rounded-full bg-[rgb(15,23,42)] ring-2 ring-[#AADAFF]/40 ring-offset-2 ring-offset-[rgb(4,13,27)]">
                <Image
                  src="/jcpfp.jpg"
                  alt="Josephine Choi"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-contain"
                  style={{
                    objectPosition: HEADSHOT_FOCUS,
                    transform: `scale(${HEADSHOT_ZOOM})`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 text-center md:text-left">
          <h1 className={sectionStyles.homeTitle}>
            Josephine Choi
          </h1>
          {/* <p className={sectionStyles.homeBody}>
            Computer Science @ CSUF
          </p> */}
          <div className="status-pulse-bar mt-3 inline-flex max-w-full">
            <span className="status-pulse-dot" aria-hidden />
            <span className="font-montserrat text-[12px] font-medium md:text-[13px]">
              Actively seeking opportunities in AI/ML and SWE
            </span>
          </div>
          <p className="font-montserrat mt-4 text-center text-[15px] leading-snug font-semibold md:text-left md:text-[19px]">
            CS @ CSUF  .✦ ݁˖  pursuing MS @ Georgia Tech
          </p>
          <p className="font-montserrat mt-2 text-center text-[12px] leading-relaxed text-[#aadaff] md:text-left md:text-[14px]">
            I enjoy turning complex ideas into structured, functional systems that balance technical depth with thoughtful design, creating solutions that are both impactful and visually refined.          </p>
          <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-white transition hover:text-[#fbeb79]"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.2 11.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.4 3.5 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.2-3.3c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.1 11.1 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1a4.7 4.7 0 0 1 1.2 3.3c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-white transition hover:text-[#fbeb79]"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2.1 3.8-2.1 4.1 0 4.9 2.7 4.9 6.3V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4V9z" />
              </svg>
            </a>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noreferrer"
              aria-label="Resume document"
              className="text-white transition hover:text-[#fbeb79]"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 13h8M8 17h8M8 9h3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={sectionStyles.projectsSection}>
        <div className={sectionStyles.sectionContainer}>
          <h2 className={sectionStyles.sectionHeading}>
            Projects
          </h2>
          <div className="portfolio-container">
            {featuredProjects.map((project) => (
              <div key={project.name} className="portfolio-box">
                <div className="relative mb-3 h-52 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="font-museo text-xl font-bold text-[#AADAFF]">{project.name}</h3>
                {project.eventLine ? (
                  <p className="font-montserrat mt-1 text-[11px] leading-snug text-[#f5e8a8] md:text-[12px]">
                    {project.eventLine}
                  </p>
                ) : null}
                <p className="font-montserrat mt-1.5 text-[12px] text-[rgb(209,213,219)] md:text-[14px]">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={`${project.name}-${tech}`}
                      className="font-montserrat rounded-full border border-slate-500 bg-slate-800/70 px-2 py-0.5 text-xs text-slate-200 transition hover:border-[#fbeb79]/60 hover:bg-[#fbeb79]/15 hover:text-[#fbeb79]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} GitHub repository`}
                    className="inline-flex items-center justify-center text-white transition hover:text-[#AADAFF]"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.2 11.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.4 3.5 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.2-3.3c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.1 11.1 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1a4.7 4.7 0 0 1 1.2 3.3c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} live demo`}
                    className="font-montserrat inline-flex items-center rounded-full border border-[#AADAFF]/50 px-2.5 py-1 text-xs font-semibold text-[#AADAFF] transition hover:bg-[#AADAFF]/10"
                  >
                    Live Link
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center md:justify-start">
            <Link
              href="/projects"
              className="font-montserrat inline-flex items-center rounded-full border border-[#AADAFF]/50 px-4 py-2 text-xs font-semibold text-[#AADAFF] transition hover:bg-[#AADAFF]/10"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      <section id="experience" className={sectionStyles.experienceSection}>
        <div className={sectionStyles.sectionContainer}>
          <h2 className={sectionStyles.sectionHeading}>
            Experience
          </h2>
          <div className="timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3 className="font-museo mb-1.5 text-base font-bold md:text-lg">
                    {exp.role}
                  </h3>
                  <h4 className="font-montserrat mb-2 text-[13px] font-semibold text-[#AADAFF] md:text-[14px]">
                    {exp.company}
                  </h4>
                  <div className="font-montserrat mb-2 flex flex-wrap gap-2 text-[12px] md:text-[13px]">
                    <div className="inline-flex items-center gap-2">{exp.location}</div>
                    <div className="inline-flex items-center gap-2">{exp.duration}</div>
                  </div>
                  <p className="font-montserrat text-[12px] leading-relaxed md:text-[14px]">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="projects" className={sectionStyles.projectsSection}>
        <div className={sectionStyles.sectionContainer}>
          <h2 className={sectionStyles.sectionHeading}>
            Projects
          </h2>
          <div className="portfolio-container">
            {projects.map((project) => (
              <div key={project.name} className="portfolio-box">
                <div className="mb-4 h-44 w-full rounded-2xl bg-[rgb(30,41,59)]" />
                <h3 className="font-museo text-xl font-bold">{project.name}</h3>
                <p className="font-montserrat mt-2 text-sm text-[rgb(209,213,219)]">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <div
        id="chatbot-container"
        className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-4 sm:right-4"
      >
        {chatOpen ? (
          <div
            id="chat-window"
            className="flex h-[min(58dvh,440px)] w-[min(100vw-1.5rem,340px)] flex-col overflow-hidden rounded-2xl border border-slate-600/80 bg-[rgb(15,23,42)] shadow-2xl sm:h-[min(62vh,470px)] sm:w-[350px] sm:rounded-3xl"
          >
            <div className="shrink-0 border-b border-slate-600 bg-[rgb(23,37,60)] px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-400" />
                  <h3 className="font-museo truncate text-[15px] font-semibold sm:text-base">
                    AI Assistant
                  </h3>
                </div>
                <button
                  id="chat-close"
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="shrink-0 cursor-pointer rounded-lg border-none bg-transparent px-2 py-1 text-base leading-none text-white hover:bg-white/10"
                  aria-label="Close chatbot"
                >
                  ×
                </button>
              </div>
            </div>
            <div
              id="chat-messages"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.text}-${index}`}
                  className={`mt-3 first:mt-0 flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`font-montserrat max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed sm:max-w-[80%] sm:px-3.5 sm:py-2.5 sm:text-sm ${
                      message.isUser
                        ? "rounded-tr-sm bg-[#AADAFF] text-[rgb(4,13,27)]"
                        : "rounded-tl-sm bg-[rgb(30,58,95)] text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 border-t border-slate-600 bg-[rgb(15,23,42)] p-2.5 sm:p-3">
              <div className="flex items-center gap-2">
                <input
                  id="chat-input"
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Ask me anything..."
                  className="font-montserrat min-h-9 flex-1 rounded-full border border-slate-600 bg-[rgb(30,41,59)] px-3 py-1.5 text-xs text-white outline-none placeholder:text-slate-400 focus:border-[#AADAFF]/50 sm:min-h-10 sm:px-4 sm:py-2 sm:text-sm"
                />
                <button
                  id="chat-send"
                  type="button"
                  onClick={sendMessage}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-none bg-[#AADAFF] text-[rgb(4,13,27)] hover:brightness-110 sm:h-10 sm:w-10"
                  aria-label="Send message"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          id="chat-toggle"
          onClick={() => setChatOpen((prev) => !prev)}
          className="h-[120px] w-[120px] shrink-0 cursor-pointer overflow-hidden border-none bg-transparent p-0 sm:h-[140px] sm:w-[140px]"
          aria-label="Toggle chatbot"
        >
          <Image
            src="/chatbotme.png"
            alt="Chat with Josephine"
            width={300}
            height={300}
            className="h-full w-full object-contain animate-[floatChibi_3s_ease-in-out_infinite,glowPulse_4s_ease-in-out_infinite]"
          />
        </button>
      </div>

      <footer className="relative z-10 mt-16 px-5 pt-10 pb-8 text-center">
        <div className="font-montserrat text-sm text-white/60">
          Crafted with love under twinkling stars 💫
        </div>
        <div className="font-montserrat mt-2 text-xs text-white/40">
          © 2025 Josephine Choi. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
