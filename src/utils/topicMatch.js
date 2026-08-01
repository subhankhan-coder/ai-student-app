/* Lightweight offline "understanding" — scores each known topic by how many
   of its aliases appear in the input text, and returns the best match.
   This replaces LLM-based intent detection with deterministic keyword matching,
   used across the AI Tutor, AI Quiz Generator, and Coding Practice topic pickers. */
export function detectTopic(text, topics) {
  const t = (text || "").toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const alias of topic.aliases) {
      if (t.includes(alias.toLowerCase())) score += alias.length; // longer/more specific aliases weigh more
    }
    if (score > bestScore) { bestScore = score; best = topic; }
  }
  return bestScore > 0 ? best : null;
}

/* Deterministic pseudo-random 0-1 value derived from a string, so the same
   inputs always produce the same "AI" output (stable across re-renders/reloads). */
export function seededRatio(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}
