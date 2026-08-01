import { useState } from "react";
import { Download, Sparkles, Loader2 } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { enhanceResumeSummary } from "../../services/openai";
import { inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function ResumeBuilderPage() {
  const { resume, setResume } = useData();
  const { showToast } = useToast();
  const [enhancing, setEnhancing] = useState(false);
  const update = (k, v) => setResume({ ...resume, [k]: v });
  const enhanceSummary = async () => {
    setEnhancing(true);
    const result = await enhanceResumeSummary(resume.summary);
    setEnhancing(false);
    if (result.offline) showToast("info", `${result.reason} Showing an offline rewrite instead.`);
    update("summary", result.data);
  };
  const onDownload = () => setTimeout(() => window.print(), 80);

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Career Tools" title="Resume builder" action={<Button variant="amber" icon={Download} onClick={onDownload}>Download Resume</Button>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 14 }}>Your details</h3>
          <Field label="Full name"><input style={inputStyle} value={resume.name} onChange={(e) => update("name", e.target.value)} /></Field>
          <Field label="Target title"><input style={inputStyle} value={resume.title} onChange={(e) => update("title", e.target.value)} /></Field>
          <div style={{ display: "flex", gap: 10 }}><Field label="Email"><input style={inputStyle} value={resume.email} onChange={(e) => update("email", e.target.value)} /></Field><Field label="Phone"><input style={inputStyle} value={resume.phone} onChange={(e) => update("phone", e.target.value)} /></Field></div>
          <Field label={<span style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>Professional summary <button onClick={enhanceSummary} disabled={enhancing} style={{ background: "none", border: "none", color: "var(--amber-fg)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11.5 }}>{enhancing ? <Loader2 size={11} className="asc-spin" /> : <Sparkles size={11} />} Enhance with AI</button></span>}>
            <textarea style={{ ...inputStyle, minHeight: 70 }} value={resume.summary} onChange={(e) => update("summary", e.target.value)} />
          </Field>
          <Field label="Skills (comma separated)"><input style={inputStyle} value={resume.skills} onChange={(e) => update("skills", e.target.value)} /></Field>
          <Field label="Education"><textarea style={{ ...inputStyle, minHeight: 50 }} value={resume.education} onChange={(e) => update("education", e.target.value)} /></Field>
          <Field label="Experience"><textarea style={{ ...inputStyle, minHeight: 70 }} value={resume.experience} onChange={(e) => update("experience", e.target.value)} /></Field>
          <Field label="Projects"><textarea style={{ ...inputStyle, minHeight: 60 }} value={resume.projects} onChange={(e) => update("projects", e.target.value)} /></Field>
        </Card>
        <div>
          <Card id="resume-print-area" style={{ padding: "32px 30px", fontFamily: "'Inter',sans-serif", background: "#FFFFFF", border: "1px solid #E4E2D8" }}>
            <h2 style={{ fontSize: 21, fontWeight: 700, margin: 0, color: "#12203A" }}>{resume.name}</h2>
            <div style={{ fontSize: 12.5, color: "#9C6B0B", fontWeight: 600, marginBottom: 6 }}>{resume.title}</div>
            <div style={{ fontSize: 11.5, color: "#667085", marginBottom: 16 }}>{resume.email} · {resume.phone}</div>
            <div style={{ borderTop: "2px solid #12203A", marginBottom: 14 }} />
            <div style={{ fontSize: 12.5, lineHeight: 1.7, marginBottom: 16, color: "#333" }}>{resume.summary}</div>
            {[["Skills", resume.skills], ["Education", resume.education], ["Experience", resume.experience], ["Projects", resume.projects]].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 14 }}><div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "#1E3A5F", marginBottom: 5 }}>{label}</div><div style={{ fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#333" }}>{val}</div></div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
