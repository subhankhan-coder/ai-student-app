import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Field } from "../ui/Field";
import { Button } from "../ui/Button";
import { ProgressRing } from "../ui/ProgressRing";
import { Pill } from "../ui/Pill";
import { generateQuiz } from "../../services/openai";
import { DIFFICULTIES, DIFF_TONE } from "../../data/interview";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function AiQuizGenerator() {
  const { addQuizHistoryEntry } = useData();
  const { showToast } = useToast();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setQuiz(null); setDone(false); setIdx(0); setCorrect(0); setSelected(null);
    const result = await generateQuiz({ topic, difficulty, count });
    setLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing an offline-generated quiz instead.`);
    setQuiz(result.data);
  };

  const answer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === quiz[idx].a) setCorrect((c) => c + 1);
  };
  const next = () => {
    if (idx + 1 < quiz.length) { setIdx(idx + 1); setSelected(null); }
    else {
      setDone(true);
      addQuizHistoryEntry({ topic, score: Math.round((correct / quiz.length) * 100), questionCount: quiz.length });
    }
  };

  return (
    <Card style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}><Sparkles size={16} color={C.amberDeep} /><h3 style={{ fontSize: 14.5, fontWeight: 700, margin: 0 }}>AI quiz generator</h3></div>
      {!quiz && (
        <>
          <Field label="Topic"><input style={inputStyle} placeholder="e.g. Python, SQL joins, React hooks, AWS…" value={topic} onChange={(e) => setTopic(e.target.value)} /></Field>
          <Field label="Difficulty">
            <div style={{ display: "flex", gap: 8 }}>
              {DIFFICULTIES.map((d) => (
                <button key={d} onClick={() => setDifficulty(d)} className="asc-btn" style={{ flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: `1px solid ${difficulty === d ? C.inkSolid : C.border}`, background: difficulty === d ? C.inkSolid : C.card, color: difficulty === d ? "#fff" : C.slate }}>{d}</button>
              ))}
            </div>
          </Field>
          <Field label="Number of questions">
            <div style={{ display: "flex", gap: 8 }}>
              {[5, 10].map((n) => (
                <button key={n} onClick={() => setCount(n)} className="asc-btn" style={{ flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: `1px solid ${count === n ? C.inkSolid : C.border}`, background: count === n ? C.inkSolid : C.card, color: count === n ? "#fff" : C.slate }}>{n} questions</button>
              ))}
            </div>
          </Field>
          <Button variant="amber" icon={loading ? Loader2 : Sparkles} disabled={loading || !topic.trim()} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>{loading ? "Generating…" : `Generate ${count}-question quiz`}</Button>
        </>
      )}
      {quiz && !done && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.slate, marginBottom: 10 }}>
            <span>Question {idx + 1} of {quiz.length} — {topic}</span><Pill tone={DIFF_TONE[difficulty]}>{difficulty}</Pill>
          </div>
          <h4 className="asc-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>{quiz[idx].q}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {quiz[idx].options.map((opt, i) => {
              let bg = C.card, bd = C.border;
              if (selected !== null) { if (i === quiz[idx].a) { bg = C.greenSoft; bd = C.green; } else if (i === selected) { bg = C.redSoft; bd = C.red; } }
              return <button key={i} onClick={() => answer(i)} className="asc-btn" style={{ textAlign: "left", padding: "11px 14px", borderRadius: 9, border: `1.5px solid ${bd}`, background: bg, fontSize: 13 }}>{opt}</button>;
            })}
          </div>
          {selected !== null && quiz[idx].explanation && <div style={{ marginTop: 12, fontSize: 12, color: C.slate, background: C.chatBubble, padding: 10, borderRadius: 8 }}>{quiz[idx].explanation}</div>}
          {selected !== null && <Button variant="amber" style={{ marginTop: 14 }} onClick={next}>{idx + 1 < quiz.length ? "Next" : "Finish"}</Button>}
        </div>
      )}
      {done && (
        <div style={{ textAlign: "center" }}>
          <ProgressRing value={Math.round((correct / quiz.length) * 100)} size={90} color={C.amber} />
          <div style={{ fontSize: 13, marginTop: 12, marginBottom: 14 }}>You scored {correct}/{quiz.length} on {topic}</div>
          <Button variant="ghost" onClick={() => { setQuiz(null); setTopic(""); }}>Generate another quiz</Button>
        </div>
      )}
    </Card>
  );
}
