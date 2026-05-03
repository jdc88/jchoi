import Image from "next/image";
import Link from "next/link";

type ProjectCard = {
  name: string;
  eventLine?: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
};

const projects: ProjectCard[] = [
  {
    name: "EcoPrompt",
    eventLine: "FullyHacks 2026 · CSUF",
    description:
      "Built with two teammates at FullyHacks. EcoPrompt uses multistage LLM rewrites, local inference, and retrieval backed evaluation so you can tune prompts with less waste.",
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
    eventLine: "Google DeepMind Gemini API Hackathon · UCLA",
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
      "Seasonal style color guidance for skin tone. Vanilla JS with Flask, JWT, and saved analyses, NumPy rules, and photo sampling with sklearn KMeans, OpenCV, and Pillow. Optional Express beside Flask.",
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
      "Skincare shopping with ingredient lists you control, search and barcode scan, and bookmarks in Core Data. UPCitemdb and a growing ingredient set. Calm UI and AI recommendations planned.",
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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[rgb(4,13,27)] px-7 py-20 text-white sm:px-10 md:px-7">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="font-museo text-[28px] font-bold md:text-[36px]">All Projects</h1>
          <Link
            href="/"
            className="font-montserrat inline-flex items-center rounded-full border border-[#AADAFF]/50 px-3 py-1.5 text-xs font-semibold text-[#AADAFF] transition hover:bg-[#AADAFF]/10"
          >
            Back Home
          </Link>
        </div>

        <div className="portfolio-container">
          {projects.map((project) => (
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
      </div>
    </main>
  );
}
