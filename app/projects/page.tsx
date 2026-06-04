import Image from "next/image";
import Link from "next/link";

import { formatInlineBold } from "@/lib/formatInlineBold";

type ProjectCard = {
  name: string;
  eventLine?: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  figmaUrl?: string;
  figmaLabel?: string;
  techStack: string[];
};

/** Full gallery for `/projects` only. */
const allProjects: ProjectCard[] = [
  {
    name: "Nuri2",
    description:
      "**Skincare app** that recommends **products and routines** for your **skin type**, highlighting **ingredients** that support your profile so you choose formulas that fit—not one-size-fits-all picks. **Search**, **barcode scan**, and saved lists in **Core Data** powered by **UPCitemdb**.",
    imageUrl: "/Nuridemo.png",
    githubUrl: "https://github.com/jdc88/Nuri",
    // liveUrl: "https://example.com/project-4",
    // liveLabel: "View MVP",
    techStack: ["Swift / UIKit", "Core Data", "Xcode", "UPCitemdb API", "GitHub"],
  },
  {
    name: "Project 2",
    description: "This is a description of Project 5.",
    imageUrl: "/globe.svg",
    githubUrl: "https://github.com/jdc88/project-5",
    liveUrl: "https://example.com/project-5",
    liveLabel: "Project Details",
    techStack: ["Java", "Spring Boot", "MySQL"],
  },
  {
    name: "Project 3",
    description: "This is a description of Project 5.",
    imageUrl: "/globe.svg",
    githubUrl: "https://github.com/jdc88/project-5",
    liveUrl: "https://example.com/project-5",
    liveLabel: "View Project",
    techStack: ["Java", "Spring Boot", "MySQL"],
  },
  {
    name: "Project 4",
    description: "This is a description of Project 4.",
    imageUrl: "/globe.svg",
    githubUrl: "https://github.com/jdc88/project-5",
    liveUrl: "https://example.com/project-5",
    liveLabel: "See More",
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
          {allProjects.map((project) => (
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
                {formatInlineBold(project.description)}
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
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {project.githubUrl ? (
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
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} live demo`}
                    className="font-montserrat inline-flex items-center rounded-full border border-[#AADAFF]/50 px-2.5 py-1 text-xs font-semibold text-[#AADAFF] transition hover:bg-[#AADAFF]/10"
                  >
                    {project.liveLabel ?? "Live Link"}
                  </a>
                ) : null}
                {project.figmaUrl ? (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} Figma`}
                    className="font-montserrat inline-flex items-center rounded-full border border-[#AADAFF]/50 px-2.5 py-1 text-xs font-semibold text-[#AADAFF] transition hover:bg-[#AADAFF]/10"
                  >
                    {project.figmaLabel ?? "Figma"}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
