import { useState } from "react";
import { Play, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { Field } from "../ui/Field";
import { Button } from "../ui/Button";
import { ProgressRing } from "../ui/ProgressRing";
import { EmptyState } from "../ui/EmptyState";
import { HR_QUESTIONS, TECHNICAL_QUESTIONS } from "../../data/interview";
import { interviewCoach } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function MockInterviewPanel() {
  const { addInterviewAttempt } = useData();
  const { showToast } = useToast();
  const [stage, setStage] = useState("setup");
  const [count, setCount] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [report, setReport] = useState(null);

  const start = () => {
    const pool = [...HR_QUESTIONS.map((q) => ({ ...q, kind: "hr" })), ...TECHNICAL_QUESTIONS.map((q) => ({ ...q, kind: "technical" }))].sort(() => Math.random() - 0.5);
    setQuestions(pool.slice(0, count)); setIdx(0); setAnswer(""); setTranscript([]); setStage("session");
  };
  const nextQuestion = () => {
    const entry = { question: questions[idx].q, answer: answer.trim() || "(no answer)", kind: questions[idx].kind };
    const t = [...transcript, entry]; setTranscript(t); setAnswer("");
    if (idx + 1 < questions.length) setIdx(idx + 1); else finish(t);
  };
  const finish = async (t) => {
    setStage("loading");
    const result = await interviewCoach({ mode: "mock", transcript: t });
    if (result.offline) showToast("info", `${result.reason} Showing an offline report instead.`);
    setReport(result.data);
    addInterviewAttempt({ overallScore: result.data.overallScore, questionCount: t.length });
    setStage("report");
  };

  if (stage === "setup") return (
    <Card style={{ padding: 24, maxWidth: 480 }}>
      <p style={{ fontSize: 13, color: C.slate, marginBottom: 16 }}>A mix of HR and technical questions, one at a time, with a full report at the end.</p>
      <Field label="Number of questions"><div style={{ display: "flex", gap: 8 }}>{[3, 4, 5].map((n) => <button key={n} onClick={() => setCount(n)} className="asc-btn" style={{ flex: 1, padding: "9px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: `1px solid ${count === n ? C.inkSolid : C.border}`, background: count === n ? C.inkSolid : C.card, color: count === n ? "#fff" : C.slate }}>{n}</button>)}</div></Field>
      <Button variant="amber" icon={Play} style={{ width: "100%", justifyContent: "center" }} onClick={start}>Start mock interview</Button>
    </Card>
  );
  if (stage === "session") {
    const q = questions[idx];
    return (
      <Card style={{ padding: 24, maxWidth: 560 }}>
        <div style={{ fontSize: 12, color: C.slate, marginBottom: 10 }}>Question {idx + 1} of {questions.length} · <Pill tone={q.kind === "hr" ? "navy" : "amber"}>{q.kind === "hr" ? "HR" : "Technical"}</Pill></div>
        <h4 className="asc-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{q.q}</h4>
        <Field label="Your answer"><textarea style={{ ...inputStyle, minHeight: 120 }} value={answer} onChange={(e) => setAnswer(e.target.value)} /></Field>
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={nextQuestion}>{idx + 1 < questions.length ? "Next question" : "Finish interview"}</Button>
      </Card>
    );
  }
  if (stage === "loading") return <div style={{ textAlign: "center", padding: 40 }}><Loader2 size={24} className="asc-spin" /><div style={{ marginTop: 10, fontSize: 13, color: C.slate }}>Compiling your report…</div></div>;
  if (!report) return <EmptyState icon={AlertCircle} title="Couldn't generate report" body="Please try again." />;
  return (
    <Card style={{ padding: 22, maxWidth: 560 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}><ProgressRing value={report.overallScore} size={78} color={report.overallScore >= 70 ? C.green : C.amber} /><div style={{ fontWeight: 700, fontSize: 15 }}>{report.overallScore >= 75 ? "Great job!" : "Keep practicing"}</div></div>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: C.green }}>Strengths</div>{(report.strengths || []).map((s, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 6 }}><CheckCircle2 size={13} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />{s}</div>)}
      <div style={{ fontWeight: 700, fontSize: 13, margin: "14px 0 8px", color: C.red }}>Improve</div>{(report.improvements || []).map((s, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 6 }}><AlertCircle size={13} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} />{s}</div>)}
      <Button variant="ghost" style={{ marginTop: 14 }} onClick={() => setStage("setup")}>New session</Button>
    </Card>
  );
}
