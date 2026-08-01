import { useState } from "react";
import { Loader2, Terminal, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { CODING_COURSES } from "../../data/codingCourses";
import { DIFFICULTIES, DIFF_TONE } from "../../data/interview";
import { codingFeedback } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function CodingPracticeTab() {
  const { codingProgress, markProblemSolved } = useData();
  const { showToast } = useToast();
  const [courseKey, setCourseKey] = useState(CODING_COURSES[0].key);
  const course = CODING_COURSES.find((c) => c.key === courseKey);
  const [difficulty, setDifficulty] = useState("All");
  const [selected, setSelected] = useState(course.questions[0]);
  const [code, setCode] = useState(course.questions[0].starter);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = difficulty === "All" ? course.questions : course.questions.filter((q) => q.difficulty === difficulty);
  const isSolved = (q) => codingProgress.some((p) => p.courseKey === courseKey && p.questionId === q.id);

  const selectCourse = (key) => {
    const c = CODING_COURSES.find((x) => x.key === key);
    setCourseKey(key); setDifficulty("All"); setSelected(c.questions[0]); setCode(c.questions[0].starter); setFeedback(null);
  };
  const select = (q) => { setSelected(q); setCode(q.starter); setFeedback(null); };
  const submit = async () => {
    setLoading(true);
    const result = await codingFeedback({ code, question: selected, language: course.language });
    setLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing offline AI feedback instead.`);
    setFeedback(result.data);
    markProblemSolved(courseKey, selected.id);
  };

  return (
    <div>
      <Field label="Course">
        <select style={{ ...inputStyle, maxWidth: 320 }} value={courseKey} onChange={(e) => selectCourse(e.target.value)}>
          {CODING_COURSES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </Field>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        {["All", ...DIFFICULTIES].map((d) => (
          <button key={d} onClick={() => setDifficulty(d)} className="asc-btn" style={{ padding: "6px 13px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: `1px solid ${difficulty === d ? C.inkSolid : C.border}`, background: difficulty === d ? C.inkSolid : C.card, color: difficulty === d ? "#fff" : C.slate }}>{d}</button>
        ))}
        <span className="asc-mono" style={{ fontSize: 11, color: C.slate, marginLeft: "auto" }}>Language: {course.language}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 8, alignSelf: "start" }}>
          {filtered.map((q) => (
            <button key={q.id} onClick={() => select(q)} className="asc-btn asc-row" style={{ width: "100%", textAlign: "left", padding: 11, borderRadius: 8, border: "none", background: selected?.id === q.id ? C.chatBubble : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{q.title}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}><Pill tone={DIFF_TONE[q.difficulty]}>{q.difficulty}</Pill><Pill>{q.topic}</Pill></div>
              </div>
              {isSolved(q) && <CheckCircle2 size={15} color={C.green} style={{ flexShrink: 0 }} />}
            </button>
          ))}
        </Card>
        {selected && (
          <Card style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h4>
              {isSolved(selected) && <Pill tone="green">Solved</Pill>}
            </div>
            <p style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.6, marginBottom: 12 }}>{selected.prompt}</p>
            <div className="asc-mono" style={{ fontSize: 11, color: C.slate, marginBottom: 6 }}>{course.label} · {course.language}</div>
            <textarea className="asc-mono" style={{ ...inputStyle, minHeight: 180, background: C.navyDeep, color: "#E7ECF3", fontSize: 12.5 }} value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
            <Button variant="amber" icon={loading ? Loader2 : Terminal} disabled={loading} onClick={submit} style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>{loading ? "Reviewing…" : "Get AI feedback"}</Button>
            {feedback && <div style={{ background: C.chatBubble, padding: 14, borderRadius: 10, fontSize: 12.5, lineHeight: 1.8, whiteSpace: "pre-wrap", marginTop: 14 }}>{feedback}</div>}
          </Card>
        )}
      </div>
    </div>
  );
}
