/**
 * Keyword-style assistant for Josephine's portfolio (no external API).
 * Matches are case-insensitive; first matching rule wins.
 */

export type ChatQuickPill = {
  /** Short label on the pill */
  label: string;
  /** Full question sent as the user message */
  prompt: string;
  /** Optional hard-routed response that bypasses keyword matching */
  responseOverride?: string;
};

export type ChatAutocompleteItem = {
  /** Suggested full question */
  text: string;
  /** Extra tokens to match while typing (lowercased) */
  aliases?: string[];
};

export const CHAT_QUICK_PILLS: ChatQuickPill[] = [
  { label: "Education & goals", prompt: "What is Josephine studying and what is she looking for?" },
  { label: "Featured projects", prompt: "Summarize Josephine's featured engineering and design projects." },
  { label: "NASA L'SPACE", prompt: "What did Josephine do in the NASA L'SPACE program?" },
  {
    label: "SI teaching",
    prompt: "Tell me about Josephine's Supplemental Instruction role at CSUF.",
    responseOverride:
      "At CSUF, Josephine has served as a Supplemental Instruction Leader for Calculus I and II from Fall 2023 to the present. She runs weekly sessions for more than 120 students, designs interactive activities for different learning styles, and has helped drive about a 10 percent average grade improvement through targeted support.",
  },
  { label: "Kode With Klossy", prompt: "What did Josephine build in Kode With Klossy?" },
  { label: "Tech stack", prompt: "What technologies and tools does Josephine use?" },
];

export const CHAT_AUTOCOMPLETE: ChatAutocompleteItem[] = [
  { text: "What is Josephine studying and what is she looking for?", aliases: ["csuf", "georgia tech", "ms", "degree"] },
  { text: "Summarize Josephine's featured engineering and design projects.", aliases: ["portfolio", "build", "apps"] },
  { text: "Tell me about EcoPrompt and the FullyHacks project.", aliases: ["hackathon", "rag", "llm", "sustainable"] },
  { text: "What is Bio-Symphony?", aliases: ["gemini", "mediapipe", "yoga", "lyria", "ucla"] },
  { text: "What does the ColorMe project do?", aliases: ["flask", "skin", "palette", "opencv"] },
  { text: "What is the Coin-Constrained Path Finder?", aliases: ["tkinter", "graph", "a star", "shortest path"] },
  { text: "Tell me about the Vestige design project.", aliases: ["figma", "alzheimer", "wearable", "tmr"] },
  { text: "What is Destinate?", aliases: ["travel", "forum", "prototype"] },
  { text: "What did Josephine do in the NASA L'SPACE program?", aliases: ["nasa", "proposal", "cdh", "cad", "asur"] },
  { text: "Tell me about Josephine's Supplemental Instruction role at CSUF.", aliases: ["calculus", "tutor", "si leader", "120"] },
  { text: "What did Josephine build in Kode With Klossy?", aliases: ["kwk", "emeow", "rebloom", "safewalk", "swift"] },
  { text: "What technologies and tools does Josephine use?", aliases: ["skills", "stack", "python", "react", "next"] },
  { text: "How can I contact Josephine or see her links?", aliases: ["github", "linkedin", "resume", "hire"] },
  { text: "Does Josephine have iOS or mobile experience?", aliases: ["swift", "uikit", "xcode", "mobile"] },
];

const RULES: { test: (s: string) => boolean; reply: string }[] = [
  {
    test: (s) => /\b(hi|hello|hey|howdy|greetings)\b/.test(s),
    reply:
      "Hi! I’m here to summarize Josephine’s portfolio—education at CSUF (and MS at Georgia Tech), projects like EcoPrompt and Bio-Symphony, NASA L’SPACE, SI teaching, and Kode With Klossy. Ask about any of those or use the quick pills above the box.",
  },
  {
    test: (s) =>
      s.includes("study") ||
      s.includes("education") ||
      s.includes("csuf") ||
      s.includes("georgia tech") ||
      s.includes("georgia") ||
      /\bms\b/.test(s) ||
      s.includes("degree") ||
      s.includes("major"),
    reply:
      "Josephine is an incoming Georgia Tech Master’s student and May 2026 CS graduate from CSU Fullerton, specializing in building reliable, structured AI and software systems. She is actively seeking AI, machine learning, and software engineering roles.",
  },
  {
    test: (s) =>
      s.includes("supplemental instruction") ||
      s.includes("supplementale leader") ||
      s.includes("supplementale instruction") ||
      s.includes("supplemental insstruction") ||
      s.includes("supplmental instruction") ||
      s.includes("supplmentale leader") ||
      /\bsi\b/.test(s) ||
      s.includes("si leader") ||
      (s.includes("calculus") && s.includes("csuf")) ||
      (s.includes("tutor") && s.includes("fullerton")),
    reply:
      "At CSUF, Josephine has served as a Supplemental Instruction Leader for Calculus I and II from Fall 2023 to the present. She runs weekly sessions for more than 120 students, designs interactive activities for different learning styles, and has helped drive about a 10 percent average grade improvement through targeted support.",
  },
  {
    test: (s) =>
      s.includes("seeking") ||
      s.includes("open to") ||
      s.includes("hire") ||
      s.includes("hiring") ||
      s.includes("intern") ||
      s.includes("full-time") ||
      s.includes("full time") ||
      s.includes("opportunit"),
    reply:
      "Josephine is actively seeking opportunities in AI, machine learning, and software engineering. For next steps, use her LinkedIn, GitHub, and resume links at the top of the page.",
  },
  {
    test: (s) => s.includes("ecoprompt") || (s.includes("fully") && s.includes("hack")) || (s.includes("rag") && s.includes("prompt")),
    reply:
      "EcoPrompt from FullyHacks 2026 at CSUF is a sustainable AI pipeline where local LLMs and a RAG layer rewrite inefficient prompts into concise, structured versions to reduce token waste and environmental impact. Key technologies include Next.js 14, FastAPI, PostgreSQL on Neon, Ollama with qwen2.5 and gemma3, and the HumanDelta SDK. You can find GitHub and Devpost links on the project card.",
  },
  {
    test: (s) =>
      s.includes("bio-symphony") ||
      s.includes("biosymphony") ||
      (s.includes("yoga") && s.includes("music")) ||
      (s.includes("mediapipe") && s.includes("lyria")),
    reply:
      "Bio-Symphony from the Google DeepMind Gemini API Hackathon 2026 at UCLA is a web app that uses MediaPipe pose tracking on yoga movements and Google Lyria to generate real-time instrumental music that matches flow and stability. It is built with Next.js 16, React 19, TypeScript, Tailwind 4, MediaPipe Tasks Vision, Google Gemini with Lyria, and Tone.js.",
  },
  {
    test: (s) => s.includes("colorme") || (s.includes("color") && s.includes("undertone")) || (s.includes("skin") && s.includes("palette")),
    reply:
      "ColorMe analyzes a face photo for skin tone and undertone, then recommends seasonal color palettes and styling guidance with optional login to save results. It uses Python with Flask, HTML, CSS, JavaScript, NumPy with colorsys, 12-season rules, scikit-learn with K-means, OpenCV, Pillow, and JWT.",
  },
  {
    test: (s) =>
      s.includes("coin-constrained") ||
      s.includes("coin constrained") ||
      ((/\bcoins?\b/.test(s) || s.includes("coin budget")) &&
        (s.includes("path") || s.includes("route") || s.includes("graph") || s.includes("city") || s.includes("tkinter"))),
    reply:
      "Coin-Constrained Path Finder is a Python and Tkinter desktop app that finds the shortest route on a weighted graph while staying under a coin budget using constrained A star search. It also includes live visualization against optimal paths. Technologies include Python 3, Tkinter, graph data structures, and heapq.",
  },
  {
    test: (s) => s.includes("vestige") || (s.includes("alzheimer") && s.includes("wearable")),
    reply:
      "Vestige from the FigBuild 2026 design challenge is an assistive wearable concept that uses biometric data and Targeted Memory Reactivation, also called TMR, to help people with Alzheimer’s preserve meaningful moments. Devpost and Figma links are available under the design projects tab.",
  },
  {
    test: (s) => s.includes("destinate") || (s.includes("travel") && s.includes("forum")),
    reply:
      "Destinate is a community travel forum concept where users share itineraries and tips for personalized trips. It is listed under UI and UX prototypes with Figma, interaction design, and UI systems. GitHub and Figma prototype links are on the project card.",
  },
  {
    test: (s) =>
      s.includes("nuri") ||
      (s.includes("skincare") && (s.includes("app") || s.includes("swift"))) ||
      (s.includes("barcode") && s.includes("ingredient")),
    reply:
      "Josephine also built Nuri, a skincare app that recommends products and routines based on skin type and ingredient fit for the user. It includes search, barcode scan, and Core Data bookmarks with Swift, UIKit, and UPCitemdb. Check the projects page for details.",
  },
  {
    test: (s) => s.includes("nasa") || s.includes("l'space") || s.includes("lspace") || s.includes("cdh engineer"),
    reply:
      "In NASA L'SPACE with Arizona State University, Josephine completed two virtual academies. From January 2025 to May 2025, she was a Computer Engineer in the Proposal Writing and Evaluation Experience. From May 2025 to August 2025, she was a CDH Engineer in the Mission Concept Academy. Highlights include ranking in the top 6 out of 47 proposals, writing to NASA style rubrics, contributing software and UI concepts, designing a rover NavCam concept in Siemens NX CAD, and serving as a proposal reviewer.",
  },
  {
    test: (s) =>
      s.includes("kode with klossy") ||
      s.includes("klossy") ||
      s.includes("kwk") ||
      s.includes("emeow") ||
      s.includes("rebloom") ||
      s.includes("safewalk"),
    reply:
      "From July 2021 to June 2023, Josephine earned three competitive one month Kode With Klossy scholarships. In 2023, she built eMeow for emotional intelligence and mental health using Swift and Xcode. In 2022, she built REBLOOM to expand STEM exposure for POC communities using Google Sheets and Google Data Studio. In 2021, she built SafeWalk to support safer solo walks at night. Each cohort combined intensive project building with discussion about gender disparity in STEM.",
  },
  {
    test: (s) =>
      s.includes("skill") ||
      s.includes("tech stack") ||
      s.includes("technologies") ||
      s.includes("languages") ||
      s.includes("framework"),
    reply:
      "Across the portfolio, you will see Python, JavaScript and TypeScript, React, Next.js, Flask, Swift and UIKit, AI and machine learning tools like local LLMs, RAG, MediaPipe, and Gemini with Lyria, plus data tools like NumPy, scikit-learn, and OpenCV. She also uses SQL, PostgreSQL, Tkinter, and Figma for product and UI work. Each project card includes specific technologies.",
  },
  {
    test: (s) =>
      s.includes("github") ||
      s.includes("linkedin") ||
      s.includes("resume") ||
      s.includes("contact") ||
      s.includes("email"),
    reply:
      "Use the icons under her intro: GitHub (jdc88), LinkedIn (josephine-choi-linked-in), and the resume Google Doc link. I can’t send email from here, but those are the right places to reach out.",
  },
  {
    test: (s) => s.includes("design") || s.includes("figma") || s.includes("ux") || s.includes("prototype"),
    reply:
      "On the home page, featured engineering projects include EcoPrompt, Smart Recipe Generator, ColorMe, and Bio-Symphony. Featured design projects include Vestige and Destinate. Both projects emphasize Figma, user flows, and systems thinking alongside her full stack builds. You can toggle between both groups under Projects on this page.",
  },
  {
    test: (s) =>
      s.includes("project") ||
      s.includes("portfolio") ||
      s.includes("built") ||
      s.includes("hackathon"),
    reply:
      "Featured engineering projects include EcoPrompt, Bio-Symphony, ColorMe, and Coin-Constrained Path Finder. Featured design projects include Vestige and Destinate. You can toggle between both groups under Projects on this page. Additional work, such as Nuri, may appear on the full projects gallery page.",
  },
  {
    test: (s) => s.includes("experience") || s.includes("work") || s.includes("internship") || s.includes("job history"),
    reply:
      "Experience on this site includes Supplemental Instruction Leader at CSUF for Calculus I and II, two NASA L'SPACE academies as Computer Engineer and CDH Engineer, and three Kode With Klossy summer programs. Expand each timeline card to see impact and tools.",
  },
  {
    test: (s) =>
      s.includes("ai") ||
      s.includes("ml") ||
      s.includes("machine learning") ||
      s.includes("llm"),
    reply:
      "Josephine highlights AI and machine learning across EcoPrompt with local LLMs, RAG, and prompt optimization, Bio-Symphony with Gemini and Lyria plus pose tracking, and ColorMe with computer vision and clustering. She is positioning for AI, machine learning, and software engineering roles.",
  },
];

const DEFAULT_REPLY =
  "I don’t have a answer for that yet—try the quick pills, pick a suggestion while you type, or browse Projects and Experience on this page. You can also ask about EcoPrompt, Bio-Symphony, NASA L’SPACE, SI teaching, or Kode With Klossy.";

export function getPortfolioChatResponse(input: string): string {
  const s = input.trim().toLowerCase();
  if (!s) return DEFAULT_REPLY;
  for (const rule of RULES) {
    if (rule.test(s)) return rule.reply;
  }
  return DEFAULT_REPLY;
}

export function filterChatSuggestions(query: string, limit = 5): ChatAutocompleteItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { item: ChatAutocompleteItem; score: number }[] = [];

  for (const item of CHAT_AUTOCOMPLETE) {
    const textLow = item.text.toLowerCase();
    let score = 0;
    if (textLow.startsWith(q)) score += 100;
    else if (textLow.includes(q)) score += 50;
    for (const a of item.aliases ?? []) {
      if (a.startsWith(q)) score += 40;
      else if (a.includes(q)) score += 20;
    }
    if (score > 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.item);
}
