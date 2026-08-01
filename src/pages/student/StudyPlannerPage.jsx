import { useState } from "react";
import { Calendar, Sparkles, Loader2, CheckCircle2, RotateCcw } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { courseProgress } from "../../utils/helpers";
import { studyPlanner } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

const PLAN_TYPES = [
  { key: "daily", label: "Daily", durationLabel: "Number of days", max: 14, defaultDuration: 5 },
  { key: "weekly", label: "Weekly", durationLabel: "Number of weeks", max: 8, defaultDuration: 2 },
  { key: "monthly", label: "Monthly", durationLabel: "Number of months", max: 6, defaultDuration: 2 },
];

export function StudyPlannerPage() {
  const { courses, studyPlan, setStudyPlan } = useData();
  const { showToast } = useToast();
  const inProgress = courses.filter((c) => { const p = courseProgress(c); return p < 100; }).map((c) => c.title);
  const [planType, setPlanType] = useState(studyPlan?.planType || "weekly");
  const [goal, setGoal] = useState(studyPlan?.goal || "");
  const [duration, setDuration] = useState(studyPlan?.duration || 2);
  const [hours, setHours] = useState(studyPlan?.hours || 6);
  const [loading, setLoading] = useState(false);

  const activeType = PLAN_TYPES.find((p) => p.key === planType);

  const generate = async () => {
    setLoading(true);
    const result = await studyPlanner({ goal, planType, duration, hours, courses: inProgress });
    setLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing an offline plan instead.`);
    setStudyPlan({ planType, goal, duration, hours, periods: result.data, generatedAt: new Date().toISOString() });
  };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered" title="Study planner" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }} className="asc-grid-stack">
        <Card style={{ padding: 22 }}>
          <Field label="Plan type">
            <div style={{ display: "flex", gap: 8 }}>
              {PLAN_TYPES.map((p) => (
                <button key={p.key} onClick={() => { setPlanType(p.key); setDuration(p.defaultDuration); }} className="asc-btn"
                  style={{ flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: `1px solid ${planType === p.key ? C.inkSolid : C.border}`, background: planType === p.key ? C.inkSolid : C.card, color: planType === p.key ? "#fff" : C.slate }}>
                  {p.label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Study goal"><textarea style={{ ...inputStyle, minHeight: 70 }} placeholder="e.g. Get ready for placement season, finish the Data Science track…" value={goal} onChange={(e) => setGoal(e.target.value)} /></Field>
          <div style={{ display: "flex", gap: 12 }}>
            <Field label={activeType.durationLabel}><input type="number" min={1} max={activeType.max} style={inputStyle} value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></Field>
            <Field label={`Hours per ${planType === "daily" ? "day" : planType === "monthly" ? "month" : "week"}`}><input type="number" min={1} max={80} style={inputStyle} value={hours} onChange={(e) => setHours(Number(e.target.value))} /></Field>
          </div>
          <div style={{ fontSize: 11.5, color: C.slate, marginBottom: 14 }}>Currently studying: {inProgress.join(", ") || "no active courses"}</div>
          <Button variant="amber" icon={loading ? Loader2 : Sparkles} disabled={loading} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>{loading ? "Building your plan…" : studyPlan ? "Regenerate plan" : "Generate study plan"}</Button>
        </Card>
        <div>
          {!studyPlan && !loading && <Card style={{ padding: 20 }}><EmptyState icon={Calendar} title="No plan yet" body="Fill in your goal and generate a study plan." /></Card>}
          {loading && <Card style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="asc-spin" /><div style={{ marginTop: 10, fontSize: 13, color: C.slate }}>Planning your {planType} schedule…</div></Card>}
          {!loading && studyPlan && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                <Button variant="ghost" icon={RotateCcw} onClick={() => setStudyPlan(null)}>Clear plan</Button>
              </div>
              {studyPlan.periods.map((w, i) => (
                <Card key={i} style={{ padding: 18, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span className="asc-mono" style={{ fontSize: 11, color: C.amberDeep }}>{(w.label || `PERIOD ${i + 1}`).toUpperCase()}</span></div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{w.focus}</div>
                  {(w.tasks || []).map((t, j) => <div key={j} style={{ display: "flex", gap: 8, fontSize: 12.5, color: C.slate, marginBottom: 6 }}><CheckCircle2 size={13} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />{t}</div>)}
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
