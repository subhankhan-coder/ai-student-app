/* ==============================================================
   OFFLINE AI SIMULATOR
   Every "AI" feature in this app is powered from here — no network calls,
   no API keys, works fully offline. Responses are generated deterministically
   from local data + simple heuristics so the app is honest about being a
   simulation while still feeling responsive and realistic.
   ============================================================== */
import { TUTOR_TOPICS } from "../data/tutorTopics";
import { QUIZ_TOPICS, GENERIC_QUIZ_TEMPLATE } from "../data/quizTopics";
import { CAREER_PROFILES, CAREER_TITLES } from "../data/careerProfiles";
import { COURSES } from "../data/courses";
import { detectTopic, seededRatio } from "./topicMatch";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const pick = (arr, seed) => arr[Math.floor(seededRatio(seed) * arr.length) % arr.length];

/* Small artificial delay so "AI is thinking" loading states still make sense
   even though everything below is instant, local computation. */
export const thinkingDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------------- AI Tutor ---------------- */
const TUTOR_FALLBACKS = [
  (q) => `That's a good question about "${q}". I don't have a dedicated lesson on that exact phrase yet, but here's how I'd approach it: break the problem into smaller pieces, identify what you already know that's related, and try a tiny example by hand before writing code. Try asking about Python, Java, JavaScript, React, Node, SQL, MongoDB, Power BI, Excel, Machine Learning, AI, Data Science, Cloud, AWS, or DevOps and I can go much deeper.`,
  (q) => `I don't have a specific lesson on "${q}" in my offline knowledge base, but a good general strategy is: look up one clear definition, find a minimal example, then modify that example yourself to test your understanding. Ask me about any of my core topics — Python, JavaScript, React, SQL, Machine Learning and more — for a detailed walkthrough.`,
];

export function simulateTutorReply(userText) {
  const topic = detectTopic(userText, TUTOR_TOPICS);
  if (topic) {
    return `${topic.body}\n\nExample:\n${topic.example}`;
  }
  return pick(TUTOR_FALLBACKS, userText)(userText);
}

/* ---------------- AI Quiz Generator ---------------- */
const QUIZ_TOPIC_DEFS = TUTOR_TOPICS.filter((t) => QUIZ_TOPICS[t.key]);

function shuffle(arr, seed) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(seededRatio(seed + i) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function simulateTopicQuiz(topicText, count = 5) {
  const matched = detectTopic(topicText, QUIZ_TOPIC_DEFS);
  const bank = matched ? QUIZ_TOPICS[matched.key] : GENERIC_QUIZ_TEMPLATE(topicText || "this topic");
  const shuffled = shuffle(bank, topicText || "quiz");
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/* ---------------- Interview / Coding Q&A feedback ---------------- */
const PRAISE = {
  hr: ["You gave concrete context instead of a vague answer.", "You kept the answer focused and relevant to the question.", "You showed self-awareness in how you framed your experience."],
  technical: ["You correctly identified the core concept being asked about.", "You used precise terminology in your explanation.", "You structured your answer logically."],
  coding: ["Your explanation covers the main approach clearly.", "You considered how the solution behaves on typical input.", "The structure of your answer is easy to follow."],
};
const IMPROVE = {
  hr: ["Add a specific example with a measurable outcome (numbers help).", "Use a clear Situation → Action → Result structure.", "Keep it slightly more concise and focused on your role in the outcome."],
  technical: ["Mention a concrete example or edge case to back up the explanation.", "Compare it briefly to a related concept to show deeper understanding.", "Define any jargon before using it, in case the interviewer wants a plain-language check."],
  coding: ["Walk through what happens on an edge case (empty input, duplicates, etc.).", "Mention the time/space complexity of your approach.", "Consider naming variables more descriptively for readability."],
};
const TIPS = {
  hr: "Practice this answer out loud once — it reveals filler words fast.",
  technical: "Re-explain it in one sentence to check you really understand it, not just recall it.",
  coding: "Trace through your logic with a small example on paper before typing.",
};

export function simulateFeedback(kind, question, answer) {
  const words = (answer || "").trim().split(/\s+/).filter(Boolean).length;
  const base = words < 8 ? 3 : words < 20 ? 5 : words < 45 ? 7 : 8;
  const variance = Math.round((seededRatio(question + answer) - 0.5) * 3);
  const score = clamp(base + variance, 1, 10);
  const praise = pick(PRAISE[kind] || PRAISE.technical, answer + "p");
  const improve = pick(IMPROVE[kind] || IMPROVE.technical, answer + "i");
  const tip = TIPS[kind] || TIPS.technical;
  return `Score: ${score}/10\nWhat worked: ${praise}\nImprove: ${improve}\nTip: ${tip}`;
}

/* ---------------- Coding Practice review ---------------- */
const CODE_SUGGESTIONS = [
  "Add a short comment describing what the function returns.",
  "Use more descriptive variable names than single letters where possible.",
  "Handle the empty-input case explicitly rather than relying on defaults.",
  "Break the logic into a small helper function if it grows past a few lines.",
];
const CODE_IMPROVEMENTS = [
  "Consider adding input validation before the main logic runs.",
  "You could simplify this by using a built-in method instead of a manual loop.",
  "Add a docstring/comment describing the function's parameters and return value.",
  "Think about what happens with unusually large input — does this still perform well?",
];

export function simulateCodeReview(question, code) {
  const trimmed = (code || "").trim();
  const startedWork = trimmed.length > (question?.starter?.trim().length || 0) + 5;
  const loopCount = (trimmed.match(/\bfor\b|\bwhile\b/g) || []).length;
  const hasNestedLoop = /(for|while)[\s\S]*?(for|while)/.test(trimmed);
  const complexity = hasNestedLoop ? "O(n²) — looks like nested iteration over the input" : loopCount >= 1 ? "O(n) — a single pass over the input" : "O(1) — no loops detected, likely constant-time";
  const bugs = startedWork
    ? "No obvious bugs spotted in a static read-through — double-check edge cases like empty input."
    : "This looks like the starter template with little added yet — implement the core logic described in the prompt first.";
  const optimization = pick(CODE_SUGGESTIONS, trimmed + "s");
  const improvement = pick(CODE_IMPROVEMENTS, trimmed + "i");
  return `Bugs: ${bugs}\nComplexity: ${complexity}\nOptimizations: ${optimization}\nImproved Code:\n${improvement}`;
}

/* ---------------- Study Planner ---------------- */
const GENERIC_FOCI = ["Review fundamentals & take notes", "Practice with hands-on exercises", "Build a small project applying what you learned", "Take a short quiz to check retention"];

export function simulateStudyPlan({ goal, planType, duration, courses }) {
  const unitLabel = planType === "daily" ? "Day" : planType === "monthly" ? "Month" : "Week";
  const activeCourses = courses && courses.length ? courses : ["your current courses"];
  const periods = Array.from({ length: duration }, (_, i) => {
    const course = activeCourses[i % activeCourses.length];
    const focus = pick(GENERIC_FOCI, `${course}-${i}`);
    return {
      label: `${unitLabel} ${i + 1}`,
      focus: `${focus} — ${course}`,
      tasks: [
        `Spend focused time on ${course}${goal ? ` toward: ${goal}` : ""}`,
        i % 2 === 0 ? "Complete at least one practice quiz or coding exercise" : "Summarize what you learned in your own words",
        "Note any concepts to revisit next session",
      ],
    };
  });
  return { periods };
}

/* ---------------- Resume tools ---------------- */
const ROLE_KEYWORDS = {
  "software engineer": ["javascript", "python", "java", "data structures", "algorithms", "git", "testing", "api"],
  "data analyst": ["sql", "excel", "power bi", "data analysis", "dashboard", "statistics", "reporting"],
  "data scientist": ["python", "machine learning", "pandas", "statistics", "sql", "modeling"],
  "full stack developer": ["react", "node", "javascript", "sql", "rest api", "git"],
  "frontend developer": ["react", "javascript", "css", "html", "ui", "accessibility"],
  "backend developer": ["node", "api", "sql", "database", "authentication", "server"],
  "cloud engineer": ["aws", "cloud", "networking", "terraform", "linux", "security"],
  "devops engineer": ["docker", "kubernetes", "ci/cd", "aws", "automation", "linux"],
  "business analyst": ["excel", "requirements", "sql", "stakeholder", "reporting", "power bi"],
};
const GENERIC_ROLE_KEYWORDS = ["communication", "teamwork", "problem solving", "leadership", "project"];

function keywordsForRole(role) {
  const key = (role || "").toLowerCase().trim();
  for (const [roleKey, words] of Object.entries(ROLE_KEYWORDS)) {
    if (key.includes(roleKey) || roleKey.includes(key)) return words;
  }
  return GENERIC_ROLE_KEYWORDS;
}

export function simulateResumeAnalysis(resumeText, role) {
  const text = (resumeText || "").toLowerCase();
  const keywords = keywordsForRole(role);
  const matched = keywords.filter((k) => text.includes(k));
  const missing = keywords.filter((k) => !matched.includes(k)).slice(0, 4);
  const coverage = keywords.length ? matched.length / keywords.length : 0;
  const hasSubstance = text.replace(/\s/g, "").length > 120;
  const score = clamp(Math.round(coverage * 70 + (hasSubstance ? 25 : 5)), 5, 98);

  const strengths = [];
  if (matched.length) strengths.push(`Strong alignment on: ${matched.slice(0, 3).map((m) => m).join(", ")}.`);
  if (hasSubstance) strengths.push("Resume has enough detail across sections to tell a coherent story.");
  if (!strengths.length) strengths.push("Resume is in place and ready to be tailored further for this role.");

  const improvements = [];
  if (missing.length) improvements.push(`Consider weaving in: ${missing.join(", ")}.`);
  improvements.push("Quantify achievements with numbers where possible (e.g. \"reduced load time by 30%\").");
  if (!hasSubstance) improvements.push("Expand the summary and experience sections with more concrete detail.");

  const summary = score >= 75
    ? `Strong match for ${role || "this role"} — most of the key expected keywords are present.`
    : score >= 45
      ? `Decent starting point for ${role || "this role"}, but a few important keywords and details are missing.`
      : `This resume needs more role-specific detail to be competitive for ${role || "this role"}.`;

  return { score, strengths, improvements, missingKeywords: missing, summary };
}

export function simulateSummaryEnhance(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) {
    return "Motivated learner building practical skills across modern web and data technologies, eager to contribute to real-world projects and grow within a collaborative team.";
  }
  const clean = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;
  return `${clean}, with a track record of applying these skills to deliver measurable results through strong problem-solving and collaboration.`;
}

/* ---------------- Career Guidance ---------------- */
const ACTIVITY_WEIGHTS = [
  { "Software Engineer": 3, "AI Engineer": 2, "DevOps Engineer": 2, "Cloud Engineer": 1 },
  { "Data Analyst": 3, "Data Scientist": 3, "Business Analyst": 1 },
  { "Full Stack Developer": 2, "Software Engineer": 1, "AI Engineer": 1 },
  { "Business Analyst": 3, "Data Analyst": 1, "Full Stack Developer": 1 },
];
const ROLE_WEIGHTS = [
  { "Software Engineer": 3, "AI Engineer": 2, "Full Stack Developer": 2 },
  { "Data Analyst": 3, "Data Scientist": 3, "Business Analyst": 1 },
  { "Full Stack Developer": 3, "Software Engineer": 1 },
  { "Business Analyst": 3, "DevOps Engineer": 1, "Cloud Engineer": 1 },
];
const MOTIVATION_WEIGHTS = [
  { "Software Engineer": 2, "AI Engineer": 3, "DevOps Engineer": 2, "Cloud Engineer": 2 },
  { "Data Scientist": 3, "Data Analyst": 2 },
  { "Full Stack Developer": 3, "Software Engineer": 1 },
  { "Business Analyst": 3, "Data Analyst": 1 },
];
const QUESTION_WEIGHTS = [ACTIVITY_WEIGHTS, ROLE_WEIGHTS, MOTIVATION_WEIGHTS];

export function simulateCareerRecommendations(optionIndexes) {
  const totals = Object.fromEntries(CAREER_TITLES.map((t) => [t, 0]));
  optionIndexes.forEach((optIdx, qIdx) => {
    const weights = QUESTION_WEIGHTS[qIdx]?.[optIdx] || {};
    Object.entries(weights).forEach(([career, w]) => { totals[career] = (totals[career] || 0) + w; });
  });
  const ranked = CAREER_TITLES.slice().sort((a, b) => (totals[b] || 0) - (totals[a] || 0));
  const top3 = ranked.slice(0, 3);
  const maxScore = Math.max(1, ...top3.map((t) => totals[t] || 0));
  return top3.map((title, i) => {
    const profile = CAREER_PROFILES[title];
    const matchPercent = clamp(Math.round(65 + (totals[title] / maxScore) * 30 - i * 2), 60, 98);
    return { title, matchPercent, why: profile.why, tags: profile.tags };
  });
}

const SUGGESTION_TEMPLATES = [
  (t) => `Dedicate at least 5 focused hours a week to hands-on practice toward ${t}.`,
  (t) => `Build one small portfolio project every month that demonstrates a core skill for ${t}.`,
  () => "Join a study group or online community around this track to stay accountable.",
  (t) => `Revisit your resume and highlight any project or coursework that maps to ${t}'s required skills.`,
];

export function simulateCareerDetail(career) {
  const profile = CAREER_PROFILES[career.title] || CAREER_PROFILES[CAREER_TITLES[0]];
  return {
    roadmap: profile.roadmap,
    requiredSkills: profile.requiredSkills,
    salary: profile.salary,
    futureOpportunities: profile.futureOpportunities,
    industryTrends: profile.industryTrends,
    personalizedSuggestions: SUGGESTION_TEMPLATES.map((fn) => fn(career.title)),
  };
}

/* ---------------- Mock Interview report ---------------- */
export function simulateMockInterviewReport(transcript) {
  const avgWords = transcript.reduce((a, e) => a + e.answer.trim().split(/\s+/).filter(Boolean).length, 0) / (transcript.length || 1);
  const base = avgWords < 8 ? 45 : avgWords < 20 ? 62 : avgWords < 40 ? 78 : 88;
  const variance = Math.round((seededRatio(transcript.map((t) => t.answer).join("|")) - 0.5) * 10);
  const overallScore = clamp(base + variance, 30, 97);
  const strengths = overallScore >= 70
    ? ["Answers were clear and stayed on topic.", "Good balance between technical and behavioral responses.", "Demonstrated structured thinking under time pressure."]
    : ["Attempted every question without skipping.", "Showed willingness to engage with both HR and technical formats."];
  const improvements = overallScore >= 70
    ? ["Add more quantified outcomes to behavioral answers.", "Go one level deeper on technical trade-offs when asked \"why\"."]
    : ["Practice structuring answers with a clear beginning, middle, and end.", "Expand technical answers with a concrete example each time.", "Time-box practice answers to build confidence speaking at length."];
  return { overallScore, strengths, improvements };
}

/* ---------------- Admin: AI Tutor knowledge preview ---------------- */
export function simulateTutorKnowledgePreview(topic, tone) {
  const t = tone.toLowerCase();
  return [
    `Explain ${topic} using a simple real-world analogy.`,
    `Walk me through a common beginner mistake when learning ${topic}.`,
    `Give a ${t} explanation of one key concept in ${topic}.`,
    `Quiz me with one question about ${topic}.`,
  ];
}

/* ---------------- Dashboard course recommendations ---------------- */
export function simulateCourseRecommendations(inProgressTitles) {
  const inProgressCourses = COURSES.filter((c) => inProgressTitles.includes(c.title));
  const categories = new Set(inProgressCourses.map((c) => c.category));
  const notStarted = COURSES.filter((c) => !inProgressTitles.includes(c.title));
  const sameCategory = notStarted.filter((c) => categories.has(c.category));
  const rest = notStarted.filter((c) => !categories.has(c.category));
  return [...sameCategory, ...rest].slice(0, 3).map((c) => c.title);
}
