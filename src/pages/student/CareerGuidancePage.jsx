import { useState } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { ArrowLeft, Briefcase, Compass, TrendingUp, CheckCircle2, Loader2 } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Pill } from "../../components/ui/Pill";
import { CAREER_QUESTIONS } from "../../data/career";
import { SKILLS } from "../../data/skills";
import { careerRecommendation } from "../../services/openai";
import { courseProgress } from "../../utils/helpers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function CareerGuidancePage() {
  const { courses } = useData();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recs, setRecs] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const choose = async (optIdx) => {
    const chosenText = CAREER_QUESTIONS[step].options[optIdx];
    const newInterests = [...interests, chosenText];
    setInterests(newInterests);
    if (step + 1 < CAREER_QUESTIONS.length) { setStep(step + 1); return; }
    setRecLoading(true);
    const result = await careerRecommendation({
      skills: SKILLS.filter((s) => s.level > 0).map((s) => s.skill),
      courses: courses.filter((c) => courseProgress(c) > 0).map((c) => c.title),
      interests: newInterests,
    });
    setRecLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing offline recommendations instead.`);
    setRecs(result.data);
  };
  const explore = (career) => setSelectedCareer(career);
  const restart = () => { setStep(0); setInterests([]); setRecs(null); setSelectedCareer(null); };

  if (selectedCareer) {
    const detail = selectedCareer;
    return (
      <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
        <button onClick={() => setSelectedCareer(null)} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.slate, fontSize: 13, marginBottom: 16, cursor: "pointer" }}><ArrowLeft size={14} /> Back to recommendations</button>
        <Card style={{ padding: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Briefcase size={20} color={C.amberDeep} /></div>
          <div><h2 className="asc-display" style={{ fontSize: 21, fontWeight: 600, margin: 0 }}>{selectedCareer.title}</h2><div style={{ fontSize: 12, color: C.slate }}>{selectedCareer.matchPercent}% match</div></div>
        </Card>
        <Card style={{ padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 14 }}>Learning path</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
            {(detail.learningPath || []).map((ph, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${i === 0 ? C.amber : C.border}`, paddingLeft: 14 }}>
                <div className="asc-mono" style={{ fontSize: 10, color: C.amberDeep, marginBottom: 4 }}>{ph.phase?.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{ph.focus}</div>
                {(ph.milestones || []).map((m, j) => <div key={j} style={{ display: "flex", gap: 6, fontSize: 11.5, color: C.slate, marginBottom: 5 }}><CheckCircle2 size={11} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />{m}</div>)}
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="asc-grid-stack">
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Required skills</h3>
            {(detail.requiredSkills || []).map((s, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}><div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{s.skill}</div><div style={{ fontSize: 11, color: C.slate }}>{s.note}</div></div><Pill tone={{ Beginner: "green", Intermediate: "amber", Advanced: "red" }[s.level] || "slate"}>{s.level}</Pill></div>)}
          </Card>
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Salary range</h3>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ label: "Entry", value: detail.salaryRange?.entry }, { label: "Mid", value: detail.salaryRange?.mid }, { label: "Senior", value: detail.salaryRange?.senior }]}>
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip formatter={(v) => [`₹${v} LPA`, "Salary"]} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>{[C.navy, C.amber, C.green].map((c, i) => <Cell key={i} fill={c} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ fontSize: 11.5, color: C.slate, marginTop: 6 }}>{detail.salaryRange?.note}</div>
          </Card>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="asc-grid-stack">
          <Card style={{ padding: 20 }}><h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Future opportunities</h3><p style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.7 }}>{detail.futureOpportunities}</p></Card>
          <Card style={{ padding: 20 }}><h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Industry trends</h3>{(detail.industryTrends || []).map((t, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: C.slate, marginBottom: 7 }}><TrendingUp size={12} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />{t}</div>)}</Card>
        </div>
      </div>
    );
  }

  if (recs) return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <SectionTitle eyebrow="Career Recommendations" title="Careers that fit you" action={<Button variant="ghost" onClick={restart}>Retake</Button>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 16 }}>
        {recs.map((r, i) => (
          <Card key={i} style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><Compass size={18} color={C.amberDeep} /><div className="asc-display" style={{ fontSize: 18, fontWeight: 600, color: C.green }}>{r.matchPercent}%</div></div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{r.title}</h3>
            <p style={{ fontSize: 12, color: C.slate, lineHeight: 1.6, marginBottom: 12 }}>{r.why}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>{(r.tags || []).map((t) => <Pill key={t} tone="navy">{t}</Pill>)}</div>
            <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={() => explore(r)}>Explore this path</Button>
          </Card>
        ))}
      </div>
    </div>
  );

  if (recLoading) return <div style={{ padding: 24, textAlign: "center", marginTop: 60 }}><Loader2 size={24} className="asc-spin" /><div style={{ marginTop: 10, fontSize: 13, color: C.slate }}>Matching you to career paths…</div></div>;

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered · Skill Assessment" title="Career guidance" />
      <Card style={{ padding: 26, maxWidth: 600 }}>
        <div className="asc-mono" style={{ fontSize: 11, color: C.slate, marginBottom: 8 }}>QUESTION {step + 1} OF {CAREER_QUESTIONS.length}</div>
        <ProgressBar value={(step / CAREER_QUESTIONS.length) * 100} tone="navy" />
        <h3 className="asc-display" style={{ fontSize: 19, fontWeight: 600, margin: "18px 0 14px" }}>{CAREER_QUESTIONS[step].q}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>{CAREER_QUESTIONS[step].options.map((o, i) => <button key={i} onClick={() => choose(i)} className="asc-btn" style={{ textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${C.border}`, background: C.card, fontSize: 13 }}>{o}</button>)}</div>
      </Card>
    </div>
  );
}
