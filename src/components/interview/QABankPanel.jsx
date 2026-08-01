import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { Field } from "../ui/Field";
import { Button } from "../ui/Button";
import { DIFFICULTIES, DIFF_TONE } from "../../data/interview";
import { interviewCoach } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

export function QABankPanel({ kind, questions }) {
  const { showToast } = useToast();
  const [difficulty, setDifficulty] = useState("All");
  const [selected, setSelected] = useState(questions[0]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const filtered = difficulty === "All" ? questions : questions.filter((q) => q.difficulty === difficulty);
  const select = (q) => { setSelected(q); setAnswer(""); setFeedback(null); };
  const submit = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    const result = await interviewCoach({ mode: "feedback", kind, question: selected.q, answer });
    setLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing offline AI feedback instead.`);
    setFeedback(result.data);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>{["All", ...DIFFICULTIES].map((d) => <button key={d} onClick={() => setDifficulty(d)} className="asc-btn" style={{ padding: "6px 13px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: `1px solid ${difficulty === d ? C.inkSolid : C.border}`, background: difficulty === d ? C.inkSolid : C.card, color: difficulty === d ? "#fff" : C.slate }}>{d}</button>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 8, alignSelf: "start" }}>
          {filtered.map((q) => (
            <button key={q.id} onClick={() => select(q)} className="asc-btn asc-row" style={{ width: "100%", textAlign: "left", padding: 11, borderRadius: 8, border: "none", background: selected?.id === q.id ? C.chatBubble : "transparent" }}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 6, lineHeight: 1.4 }}>{q.q}</div><Pill tone={DIFF_TONE[q.difficulty]}>{q.difficulty}</Pill>
            </button>
          ))}
        </Card>
        {selected && (
          <Card style={{ padding: 20 }}>
            <h4 className="asc-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>{selected.q}</h4>
            <Field label="Your answer"><textarea style={{ ...inputStyle, minHeight: 130 }} value={answer} onChange={(e) => setAnswer(e.target.value)} /></Field>
            <Button variant="amber" icon={loading ? Loader2 : Sparkles} disabled={loading || !answer.trim()} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>{loading ? "Reviewing…" : "Get AI feedback"}</Button>
            {feedback && <div style={{ background: C.chatBubble, padding: 14, borderRadius: 10, fontSize: 12.5, lineHeight: 1.8, whiteSpace: "pre-wrap", marginTop: 14 }}>{feedback}</div>}
          </Card>
        )}
      </div>
    </div>
  );
}
