import { useState } from "react";
import { ScanSearch, Loader2, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { Pill } from "../../components/ui/Pill";
import { analyzeResume } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function ResumeAnalyzerPage() {
  const { resume } = useData();
  const { showToast } = useToast();
  const [role, setRole] = useState("Software Engineer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resumeText = () => `${resume.name}\n${resume.title}\nSummary: ${resume.summary}\nSkills: ${resume.skills}\nEducation: ${resume.education}\nExperience: ${resume.experience}\nProjects: ${resume.projects}`;

  const analyze = async () => {
    setLoading(true); setResult(null);
    const res = await analyzeResume({ resumeText: resumeText(), role });
    setLoading(false);
    if (res.offline) showToast("info", `${res.reason} Showing an offline analysis instead.`);
    setResult(res.data);
  };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered" title="Resume analyzer" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <Field label="Target job role"><input style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} /></Field>
          <p style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.6, marginBottom: 16 }}>This analyzes the resume you built in Resume Builder against your target role.</p>
          <Button variant="amber" icon={loading ? Loader2 : ScanSearch} disabled={loading} onClick={analyze} style={{ width: "100%", justifyContent: "center" }}>{loading ? "Analyzing…" : "Analyze resume"}</Button>
        </Card>
        <div>
          {!result && !loading && <Card style={{ padding: 20 }}><EmptyState icon={ScanSearch} title="No analysis yet" body="Analyze your resume to see an ATS score and suggestions." /></Card>}
          {loading && <Card style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="asc-spin" /><div style={{ marginTop: 10, fontSize: 13, color: C.slate }}>Reviewing your resume…</div></Card>}
          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Card style={{ padding: 20, display: "flex", alignItems: "center", gap: 18 }}>
                <ProgressRing value={result.atsScore} size={78} color={result.atsScore >= 70 ? C.green : result.atsScore >= 40 ? C.amber : C.red} />
                <div><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>ATS score for {role}</div><div style={{ fontSize: 12, color: C.slate, lineHeight: 1.6 }}>How well your resume matches applicant-tracking keyword scans for this role.</div></div>
              </Card>
              <Card style={{ padding: 18 }}><div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: C.green }}>Strengths</div>{(result.strengths || []).map((s, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 6 }}><CheckCircle2 size={14} color={C.green} style={{ flexShrink: 0, marginTop: 1 }} />{s}</div>)}</Card>
              <Card style={{ padding: 18 }}><div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: C.red }}>Weaknesses</div>{(result.weaknesses || []).map((s, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 6 }}><AlertCircle size={14} color={C.red} style={{ flexShrink: 0, marginTop: 1 }} />{s}</div>)}</Card>
              <Card style={{ padding: 18 }}><div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: C.amberDeep }}>Recommendations</div>{(result.recommendations || []).map((s, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 6 }}><Lightbulb size={14} color={C.amberDeep} style={{ flexShrink: 0, marginTop: 1 }} />{s}</div>)}</Card>
              {result.missingSkills?.length > 0 && <Card style={{ padding: 18 }}><div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Missing skills</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{result.missingSkills.map((k) => <Pill key={k} tone="amber">{k}</Pill>)}</div></Card>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
