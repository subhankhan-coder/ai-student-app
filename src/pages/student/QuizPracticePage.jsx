import { useState } from "react";
import { ClipboardList, Sparkles, Code2, ArrowLeft, Trophy } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Button } from "../../components/ui/Button";
import { QuizTakeFlow } from "../../components/quiz/QuizTakeFlow";
import { AiQuizGenerator } from "../../components/quiz/AiQuizGenerator";
import { CodingPracticeTab } from "../../components/quiz/CodingPracticeTab";
import { Leaderboard } from "../../components/quiz/Leaderboard";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function QuizPracticePage() {
  const { quizzes, setQuizzes, addQuizHistoryEntry } = useData();
  const [tab, setTab] = useState("quizzes");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const tabs = [
    { key: "quizzes", label: "Quiz Module", icon: ClipboardList },
    { key: "ai", label: "AI Quiz Generator", icon: Sparkles },
    { key: "coding", label: "Coding Practice", icon: Code2 },
    { key: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const finishQuiz = (score) => {
    setQuizzes(quizzes.map((q) => q.id === activeQuiz.id ? { ...q, attempts: q.attempts + 1, bestScore: Math.max(q.bestScore || 0, score) } : q));
    addQuizHistoryEntry({ topic: activeQuiz.title, score, questionCount: activeQuiz.questions });
  };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Practice" title="Quiz & practice questions" />
      <div style={{ display: "flex", gap: 6, background: C.slateSoft, padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map((t) => <button key={t.key} onClick={() => { setTab(t.key); setActiveQuiz(null); }} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 12.5, background: tab === t.key ? C.card : "transparent", color: tab === t.key ? C.ink : C.slate }}><t.icon size={13} />{t.label}</button>)}
      </div>

      {tab === "quizzes" && (
        activeQuiz ? (
          <Card style={{ padding: 24, maxWidth: 640 }}>
            <button onClick={() => setActiveQuiz(null)} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.slate, fontSize: 13, marginBottom: 14, cursor: "pointer" }}><ArrowLeft size={14} /> Back</button>
            <QuizTakeFlow quiz={activeQuiz} onFinish={finishQuiz} onExit={() => setActiveQuiz(null)} />
          </Card>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
            {quizzes.map((q) => (
              <Card key={q.id} style={{ padding: 18 }}>
                <Pill tone={q.bestScore >= 70 ? "green" : q.bestScore != null ? "amber" : "slate"}>{q.bestScore != null ? `Best: ${q.bestScore}%` : "Not attempted"}</Pill>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "10px 0 4px" }}>{q.title}</h3>
                <div style={{ fontSize: 12, color: C.slate, marginBottom: 14 }}>{q.course}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 11.5, color: C.slate, marginBottom: 14 }}><span>{q.questions} Qs</span><span>{q.duration} min</span><span>{q.attempts} attempts</span></div>
                <Button variant={q.attempts > 0 ? "ghost" : "primary"} style={{ width: "100%", justifyContent: "center" }} onClick={() => setActiveQuiz(q)}>{q.attempts > 0 ? "Retake" : "Start quiz"}</Button>
              </Card>
            ))}
          </div>
        )
      )}
      {tab === "ai" && <AiQuizGenerator />}
      {tab === "coding" && <CodingPracticeTab />}
      {tab === "leaderboard" && <Leaderboard />}
    </div>
  );
}
