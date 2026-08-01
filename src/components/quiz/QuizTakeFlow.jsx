import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { ProgressRing } from "../ui/ProgressRing";
import { QUIZ_BANK } from "../../data/quizzes";
import { C } from "../../utils/theme";

export function QuizTakeFlow({ quiz, onFinish, onExit }) {
  const bank = QUIZ_BANK[quiz.id] || [];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = bank[idx];

  const answer = (i) => { if (selected !== null) return; setSelected(i); if (i === q.a) setCorrect((c) => c + 1); };
  const next = () => {
    if (idx + 1 < bank.length) { setIdx(idx + 1); setSelected(null); }
    else { const score = Math.round((correct / bank.length) * 100); onFinish(score); setDone(true); }
  };

  if (done) {
    const score = Math.round((correct / bank.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <ProgressRing value={score} size={110} color={score >= 70 ? C.green : C.amber} />
        <h3 className="asc-display" style={{ fontSize: 20, fontWeight: 600, margin: "16px 0 6px" }}>{score >= 70 ? "Well done!" : "Good attempt!"}</h3>
        <p style={{ fontSize: 13, color: C.slate, marginBottom: 18 }}>You scored {correct} out of {bank.length}.</p>
        <Button variant="amber" onClick={onExit}>Back to quizzes</Button>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, color: C.slate }}><span>Question {idx + 1} of {bank.length}</span><span>{quiz.title}</span></div>
      <ProgressBar value={(idx / bank.length) * 100} tone="navy" />
      <h3 className="asc-display" style={{ fontSize: 18, margin: "18px 0 16px", fontWeight: 600 }}>{q.q}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, bd = C.border;
          if (selected !== null) { if (i === q.a) { bg = C.greenSoft; bd = C.green; } else if (i === selected) { bg = C.redSoft; bd = C.red; } }
          return <button key={i} onClick={() => answer(i)} className="asc-btn" style={{ textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${bd}`, background: bg, fontSize: 13.5 }}>{opt}</button>;
        })}
      </div>
      {selected !== null && <Button variant="amber" style={{ marginTop: 16 }} onClick={next}>{idx + 1 < bank.length ? "Next question" : "Finish quiz"} <ChevronRight size={14} /></Button>}
    </div>
  );
}
