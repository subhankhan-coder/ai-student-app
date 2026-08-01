/* ==============================================================
   SHARED AI SERVICE — the single place every AI-powered page talks to.
   Calls our local backend (server/index.js), which holds the real
   OPENAI_API_KEY server-side and forwards to OpenAI's Responses API.
   The browser NEVER sees the API key in any form.

   Every exported function returns a consistent envelope:
     { ok: true, offline: false, data }   — real OpenAI response
     { ok: true, offline: true,  data, reason } — offline fallback used
   `data` is always present and always safe to render — these functions
   never throw and never leave a caller with nothing to show.
   ============================================================== */
import {
  simulateTutorReply, simulateTopicQuiz, simulateFeedback, simulateCodeReview,
  simulateStudyPlan, simulateResumeAnalysis, simulateCareerRecommendations,
  simulateCareerDetail, simulateMockInterviewReport, thinkingDelay,
} from "../utils/aiSimulator";
import { CAREER_QUESTIONS } from "../data/career";
import { ROADMAPS, ROADMAP_TRACKS } from "../data/roadmaps";

const CLIENT_TIMEOUT_MS = 40000;

function cleanJson(raw) {
  return raw.replace(/```json|```/g, "").trim();
}

/* Low-level call to our backend proxy. Never touches the API key — it isn't
   available to frontend code at all. */
async function requestAI(feature, { system, prompt, json = false }) {
  const startedAt = performance.now();
  console.log(`[ai] ${feature} — request start`);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feature, system, prompt, json }),
    });
    clearTimeout(timer);
    const data = await res.json().catch(() => ({}));
    const ms = Math.round(performance.now() - startedAt);
    if (!res.ok) {
      console.log(`[ai] ${feature} — request failed (${ms}ms): ${data.error || res.status}`);
      return { ok: false, error: data.error || "The AI request failed.", notConfigured: !!data.notConfigured };
    }
    console.log(`[ai] ${feature} — request success (${ms}ms)`);
    return { ok: true, text: data.text || "" };
  } catch (e) {
    clearTimeout(timer);
    const ms = Math.round(performance.now() - startedAt);
    const timedOut = e.name === "AbortError";
    console.log(`[ai] ${feature} — request failed (${ms}ms): ${timedOut ? "client timeout" : "network error"}`);
    return { ok: false, error: timedOut ? "The AI request timed out." : "Could not reach the AI service." };
  }
}

/* Runs a real request; on any failure, transparently falls back to the
   offline simulator so the feature still works. `offlineFn` must be
   synchronous (or already-resolved) and never throw. */
async function withOfflineFallback(feature, requestArgs, normalize, offlineFn) {
  const result = await requestAI(feature, requestArgs);
  if (result.ok) {
    try {
      const data = normalize(result.text);
      return { ok: true, offline: false, data };
    } catch (e) {
      console.log(`[ai] ${feature} — response could not be parsed, falling back offline`);
      return { ok: true, offline: true, reason: "The AI response couldn't be understood.", data: offlineFn() };
    }
  }
  await thinkingDelay(300);
  return {
    ok: true,
    offline: true,
    reason: result.notConfigured ? "AI service is not configured." : result.error,
    data: offlineFn(),
  };
}

/* ---------------- 1. AI Tutor ---------------- */
export async function askTutor(message, history = []) {
  const context = history.slice(-6).map((m) => `${m.role === "user" ? "Student" : "Tutor"}: ${m.text}`).join("\n");
  return withOfflineFallback(
    "askTutor",
    {
      system: "You are Ascent's AI tutor for students learning software engineering and data topics. Answer clearly and in DETAILED MARKDOWN — use headings, bullet points, and fenced code blocks where useful. Be accurate; if unsure, say so rather than guessing.",
      prompt: context ? `Recent conversation:\n${context}\n\nNew question: ${message}` : message,
      json: false,
    },
    (text) => text,
    () => simulateTutorReply(message)
  );
}

/* ---------------- 2. AI Quiz Generator ---------------- */
export async function generateQuiz({ topic, difficulty = "Medium", count = 5 }) {
  return withOfflineFallback(
    "generateQuiz",
    {
      system: `You generate multiple-choice quizzes. Respond ONLY with strict JSON, no markdown fences: {"questions":[{"question":string,"options":[string,string,string,string],"answer":string,"explanation":string}]}. "answer" MUST exactly match one of the "options" strings. Generate exactly ${count} questions at ${difficulty} difficulty.`,
      prompt: `Topic: ${topic}\nDifficulty: ${difficulty}\nNumber of questions: ${count}`,
      json: true,
    },
    (text) => {
      const parsed = JSON.parse(cleanJson(text));
      return parsed.questions.map((q) => ({
        q: q.question,
        options: q.options,
        a: Math.max(0, q.options.findIndex((o) => o.trim().toLowerCase() === (q.answer || "").trim().toLowerCase())),
        explanation: q.explanation,
      }));
    },
    () => simulateTopicQuiz(topic, count)
  );
}

/* ---------------- 3. Resume Analyzer ---------------- */
export async function analyzeResume({ resumeText, role }) {
  return withOfflineFallback(
    "analyzeResume",
    {
      system: 'You are an ATS (Applicant Tracking System) resume analyzer. Respond ONLY with strict JSON, no markdown fences: {"atsScore":number(0-100),"missingSkills":[string,string,string,string],"strengths":[string,string,string],"weaknesses":[string,string,string],"recommendations":[string,string,string]}',
      prompt: `Target role: ${role}\n\nResume:\n${resumeText}`,
      json: true,
    },
    (text) => JSON.parse(cleanJson(text)),
    () => {
      const sim = simulateResumeAnalysis(resumeText, role);
      return { atsScore: sim.score, missingSkills: sim.missingKeywords, strengths: sim.strengths, weaknesses: sim.improvements, recommendations: [sim.summary, "Quantify achievements with concrete numbers where possible."] };
    }
  );
}

export async function enhanceResumeSummary(text) {
  return withOfflineFallback(
    "enhanceResumeSummary",
    { system: "You write concise, achievement-oriented resume summaries. Rewrite the given text in 2-3 sentences, plain text, no markdown.", prompt: text || "A student building skills in software development.", json: false },
    (t) => t,
    () => text
  );
}

/* ---------------- 4. Career Recommendation ---------------- */
export async function careerRecommendation({ skills, courses, interests }) {
  return withOfflineFallback(
    "careerRecommendation",
    {
      system: `You are a career advisor for students. Respond ONLY with strict JSON, no markdown fences:
{"recommendations":[{"title":string,"matchPercent":number(60-98),"why":string,"tags":[string,string,string],
"salaryRange":{"entry":number,"mid":number,"senior":number,"note":string},
"learningPath":[{"phase":string,"focus":string,"milestones":[string,string,string]}](4 phases: Beginner,Intermediate,Advanced,Job Ready),
"requiredSkills":[{"skill":string,"level":"Beginner"|"Intermediate"|"Advanced","note":string}](6 items),
"futureOpportunities":string,"industryTrends":[string,string,string,string]}](exactly 3 recommendations, salary numbers in INR lakhs per annum)}`,
      prompt: `Skills: ${skills.join(", ") || "none yet"}\nCourses: ${courses.join(", ") || "none yet"}\nInterests: ${interests.join("; ")}`,
      json: true,
    },
    (text) => JSON.parse(cleanJson(text)).recommendations,
    () => {
      const answerIdxByOption = interests.map((interestText) => {
        for (const q of CAREER_QUESTIONS) {
          const idx = q.options.indexOf(interestText);
          if (idx !== -1) return idx;
        }
        return 0;
      });
      const recs = simulateCareerRecommendations(answerIdxByOption);
      return recs.map((r) => {
        const detail = simulateCareerDetail(r);
        return { ...r, salaryRange: detail.salary, learningPath: detail.roadmap, requiredSkills: detail.requiredSkills, futureOpportunities: detail.futureOpportunities, industryTrends: detail.industryTrends };
      });
    }
  );
}

/* ---------------- 5. Interview Coach ---------------- */
export async function interviewCoach(payload) {
  if (payload.mode === "mock") {
    const { transcript } = payload;
    return withOfflineFallback(
      "interviewCoach:mock",
      {
        system: 'Produce a mock interview report from a Q&A transcript. Respond ONLY with strict JSON, no markdown fences: {"overallScore":number(0-100),"strengths":[string,string,string],"improvements":[string,string]}',
        prompt: transcript.map((e, i) => `Q${i + 1} (${e.kind}): ${e.question}\nAnswer: ${e.answer}`).join("\n\n"),
        json: true,
      },
      (text) => JSON.parse(cleanJson(text)),
      () => simulateMockInterviewReport(transcript)
    );
  }
  const { kind, question, answer } = payload;
  const roleDesc = { hr: "an HR interview coach reviewing a behavioral answer", technical: "a technical interviewer reviewing a conceptual answer", coding: "a senior engineer reviewing a candidate's spoken explanation of a coding approach" }[kind] || "an interview coach";
  return withOfflineFallback(
    "interviewCoach:feedback",
    {
      system: `You are ${roleDesc}. Respond in this exact plain-text format, no markdown:\nScore: X/10\nWhat worked: <1-2 sentences>\nImprove: <1-2 sentences>\nTip: <1 sentence>`,
      prompt: `Question: ${question}\n\nCandidate's answer:\n${answer}`,
      json: false,
    },
    (text) => text,
    () => simulateFeedback(kind, question, answer)
  );
}

/* ---------------- 6. Study Planner ---------------- */
export async function studyPlanner({ goal, planType, duration, hours, courses }) {
  const unit = planType === "daily" ? "day" : planType === "monthly" ? "month" : "week";
  return withOfflineFallback(
    "studyPlanner",
    {
      system: `You are a study planning assistant. If the goal names a specific stack or track (e.g. "Java Full Stack", "Python", "React"), tailor milestones to that track's real learning path. Respond ONLY with strict JSON, no markdown fences: {"periods":[{"label":string,"focus":string,"tasks":[string,string,string]}]}. Produce exactly ${duration} periods, one per ${unit}.`,
      prompt: `Goal: ${goal || "Make consistent progress across current courses"}\nDuration: ${duration} ${unit}s, ~${hours} hours per ${unit}\nCurrently studying: ${courses.join(", ") || "no active courses"}`,
      json: true,
    },
    (text) => JSON.parse(cleanJson(text)).periods,
    () => simulateStudyPlan({ goal, planType, duration, courses }).periods
  );
}

/* ---------------- 7. Skill Gap Analysis ---------------- */
export async function skillGapAnalysis({ currentSkills, targetJob }) {
  return withOfflineFallback(
    "skillGapAnalysis",
    {
      system: 'Compare a student\'s current skills against a target job. Respond ONLY with strict JSON, no markdown fences: {"missingSkills":[{"skill":string,"currentLevel":string,"requiredLevel":string,"note":string}],"learningResources":[{"skill":string,"resource":string}],"estimatedTime":string}',
      prompt: `Current skills and levels: ${currentSkills.map((s) => `${s.skill} (currently ${s.currentLabel || "not started"}, target role expects ${s.level})`).join(", ") || "none recorded"}\nTarget job: ${targetJob}`,
      json: true,
    },
    (text) => JSON.parse(cleanJson(text)),
    () => ({
      missingSkills: currentSkills.filter((s) => s.gap > 0).map((s) => ({ skill: s.skill, currentLevel: s.currentLabel, requiredLevel: s.level, note: s.note })),
      learningResources: currentSkills.filter((s) => s.gap > 0).map((s) => ({ skill: s.skill, resource: `Official documentation and a hands-on project applying ${s.skill}` })),
      estimatedTime: "Roughly 4-8 weeks per missing skill with consistent practice.",
    })
  );
}

/* ---------------- 8. Learning Roadmap ---------------- */
export async function learningRoadmap({ track }) {
  return withOfflineFallback(
    "learningRoadmap",
    {
      system: 'Generate a 6-stage learning roadmap for the given technology/track. Respond ONLY with strict JSON, no markdown fences: {"stages":[{"stage":string,"focus":string,"items":[string,string,string]}]}. Exactly 6 stages, in this order: Beginner, Intermediate, Advanced, Projects, Interview Prep, Job Ready.',
      prompt: `Track: ${track}`,
      json: true,
    },
    (text) => JSON.parse(cleanJson(text)).stages,
    () => {
      if (ROADMAPS[track]) return ROADMAPS[track].stages;
      return [
        { stage: "Beginner", focus: `${track} fundamentals`, items: [`Learn core ${track} concepts and syntax/tools`, "Follow a structured beginner course or docs", "Practice small exercises daily"] },
        { stage: "Intermediate", focus: "Applying the basics", items: [`Build small ${track} projects`, "Learn common patterns and tooling", "Debug real problems, not just tutorials"] },
        { stage: "Advanced", focus: "Depth & best practices", items: ["Study performance and design trade-offs", "Read production-quality code in this area", "Contribute to or review a larger codebase"] },
        { stage: "Projects", items: [`A portfolio project applying ${track} end-to-end`, "Document the project clearly", "Get feedback from peers or mentors"] },
        { stage: "Interview Prep", items: [`Practice ${track}-specific interview questions`, "Explain your project's design decisions out loud", "Do a mock interview"] },
        { stage: "Job Ready", items: ["Polish your resume around this track", "Apply your portfolio project as a work sample", "Apply to relevant roles"] },
      ];
    }
  );
}

/* ---------------- 9. Coding Feedback ---------------- */
export async function codingFeedback({ code, question, language }) {
  return withOfflineFallback(
    "codingFeedback",
    {
      system: "You are a senior engineer reviewing a candidate's code. Respond in this exact plain-text format, no markdown:\nBugs: <1-2 sentences, or \"None found\">\nComplexity: <time/space complexity in Big-O with a short reason>\nOptimizations: <1-2 sentences>\nImproved Code:\n<the improved code, or brief guidance if a full rewrite isn't warranted>",
      prompt: `Language: ${language}\nProblem: ${question.title} — ${question.prompt}\n\nCandidate's code:\n${code}`,
      json: false,
    },
    (text) => text,
    () => simulateCodeReview(question, code)
  );
}

export { ROADMAP_TRACKS };
