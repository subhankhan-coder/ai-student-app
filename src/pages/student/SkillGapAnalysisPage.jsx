import { useState } from "react";
import { CheckCircle2, AlertCircle, Rocket, Sparkles, Loader2, Clock, BookOpen } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { Pill } from "../../components/ui/Pill";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { CAREER_PROFILES, CAREER_TITLES } from "../../data/careerProfiles";
import { SKILLS } from "../../data/skills";
import { skillGapAnalysis } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

const LEVEL_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 };

function currentLevelFor(skillName) {
  const match = SKILLS.find((s) => s.skill.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(s.skill.toLowerCase()));
  return match ? match.level : 0;
}
function currentRank(level) {
  if (level >= 70) return 3;
  if (level >= 40) return 2;
  if (level > 0) return 1;
  return 0;
}
const RANK_LABEL = ["Not started", "Beginner", "Intermediate", "Advanced"];

export function SkillGapAnalysisPage() {
  const { showToast } = useToast();
  const [role, setRole] = useState(CAREER_TITLES[0]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const profile = CAREER_PROFILES[role];

  const analysis = profile.requiredSkills.map((req) => {
    const level = currentLevelFor(req.skill);
    const rank = currentRank(level);
    const requiredRank = LEVEL_RANK[req.level];
    return { ...req, currentLevel: level, currentLabel: RANK_LABEL[rank], gap: requiredRank - rank };
  });
  const missing = analysis.filter((a) => a.gap > 0).sort((a, b) => b.gap - a.gap);
  const onTrack = analysis.filter((a) => a.gap <= 0);

  const runAiAnalysis = async () => {
    setAiLoading(true); setAiResult(null);
    const result = await skillGapAnalysis({ currentSkills: analysis, targetJob: role });
    setAiLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing an offline analysis instead.`);
    setAiResult(result.data);
  };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered" title="Skill gap analysis" />
      <Card style={{ padding: 20, marginBottom: 20, maxWidth: 420 }}>
        <Field label="Target career">
          <select style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)}>
            {CAREER_TITLES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={15} color={C.red} /> Missing / underdeveloped skills</h3>
          {missing.length === 0 && <p style={{ fontSize: 12.5, color: C.slate, marginTop: 10 }}>You are at or above the required level on every core skill for {role}. Great position!</p>}
          {missing.map((m) => (
            <div key={m.skill} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{m.skill}</span>
                <span style={{ fontSize: 11.5, color: C.slate }}>{m.currentLabel} → <strong style={{ color: C.ink }}>{m.level}</strong></span>
              </div>
              <ProgressBar value={m.currentLevel} tone={m.currentLevel === 0 ? "navy" : "amber"} />
              <div style={{ fontSize: 11, color: C.slate, marginTop: 4 }}>{m.note}</div>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={15} color={C.green} /> On track</h3>
          {onTrack.length === 0 && <p style={{ fontSize: 12.5, color: C.slate, marginTop: 10 }}>No skills are fully on-track yet — start with the highest-gap item on the left.</p>}
          {onTrack.map((m) => (
            <div key={m.skill} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{m.skill}</span>
              <Pill tone="green">{m.currentLabel}</Pill>
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ padding: 20, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 14 }}>Learning plan to close the gap</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
          {profile.roadmap.map((ph, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${i === 0 ? C.amber : C.border}`, paddingLeft: 14 }}>
              <div className="asc-mono" style={{ fontSize: 10, color: C.amberDeep, marginBottom: 4 }}>{ph.phase.toUpperCase()}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{ph.focus}</div>
              {ph.milestones.map((m, j) => <div key={j} style={{ display: "flex", gap: 6, fontSize: 11.5, color: C.slate, marginBottom: 5 }}><CheckCircle2 size={11} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />{m}</div>)}
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 20, background: C.navyDeep, border: "none" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}><Rocket size={15} color="#DB9A16" /> Suggested projects</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          {(missing.length ? missing : analysis).slice(0, 4).map((m) => (
            <div key={m.skill} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 9, padding: 12, fontSize: 12, color: "#E7ECF3" }}>
              Build a small end-to-end project that applies <strong>{m.skill}</strong> — e.g. {m.note.toLowerCase()}.
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, margin: 0 }}>AI-powered deep dive</h3>
          <Button variant="ghost" icon={aiLoading ? Loader2 : Sparkles} disabled={aiLoading} onClick={runAiAnalysis}>{aiLoading ? "Analyzing…" : aiResult ? "Refresh analysis" : "Get AI analysis"}</Button>
        </div>
        <p style={{ fontSize: 12, color: C.slate, marginBottom: 14 }}>Get a live comparison of your current skills against {role}, with specific learning resources and a time estimate.</p>
        {aiLoading && <div style={{ textAlign: "center", padding: 24 }}><Loader2 size={20} className="asc-spin" /><div style={{ marginTop: 8, fontSize: 12.5, color: C.slate }}>Thinking…</div></div>}
        {aiResult && !aiLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }} className="asc-grid-stack">
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.slate, marginBottom: 8 }}>MISSING SKILLS & RESOURCES</div>
              {(aiResult.missingSkills || []).map((m, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 600 }}><span>{m.skill}</span><span style={{ color: C.slate, fontWeight: 500 }}>{m.currentLevel} → {m.requiredLevel}</span></div>
                  <div style={{ fontSize: 11.5, color: C.slate, marginTop: 2 }}>{m.note}</div>
                </div>
              ))}
              <div style={{ marginTop: 10 }}>
                {(aiResult.learningResources || []).map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: C.slate, marginBottom: 6 }}><BookOpen size={13} color={C.amberDeep} style={{ flexShrink: 0, marginTop: 1 }} /><span><strong style={{ color: C.ink }}>{r.skill}:</strong> {r.resource}</span></div>
                ))}
              </div>
            </div>
            <Card style={{ padding: 16, alignSelf: "start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Clock size={15} color={C.amberDeep} /><span style={{ fontSize: 12.5, fontWeight: 700 }}>Estimated time</span></div>
              <p style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.6, margin: 0 }}>{aiResult.estimatedTime}</p>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
