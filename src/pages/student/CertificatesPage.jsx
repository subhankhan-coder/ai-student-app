import { Award, Download, Target } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { courseProgress } from "../../utils/helpers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function CertificatesPage() {
  const { courses, certs } = useData();
  const completed = courses.filter((c) => courseProgress(c) === 100);
  const inProgress = courses.filter((c) => { const p = courseProgress(c); return p > 0 && p < 100; }).sort((a, b) => courseProgress(b) - courseProgress(a))[0];
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Achievements" title="Certificates" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
        {completed.map((c) => (
          <Card key={c.id} style={{ padding: 22, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: C.amberSoft }} />
            <Award size={24} color={C.amberDeep} style={{ position: "relative" }} />
            <h3 style={{ fontSize: 14.5, fontWeight: 700, margin: "12px 0 4px", position: "relative" }}>{c.title}</h3>
            <div style={{ fontSize: 11.5, color: C.slate, marginBottom: 14, position: "relative" }}>Issued Jul 2026</div>
            <Button variant="ghost" icon={Download} style={{ position: "relative" }}>Download</Button>
          </Card>
        ))}
        {certs.map((c) => (
          <Card key={c.course} style={{ padding: 22, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: C.amberSoft }} />
            <Award size={24} color={C.amberDeep} style={{ position: "relative" }} />
            <h3 style={{ fontSize: 14.5, fontWeight: 700, margin: "12px 0 4px", position: "relative" }}>{c.course}</h3>
            <div style={{ fontSize: 11.5, color: C.slate, marginBottom: 14, position: "relative" }}>Issued {c.issued}</div>
            <Button variant="ghost" icon={Download} style={{ position: "relative" }}>Download</Button>
          </Card>
        ))}
        {inProgress && (
          <Card style={{ padding: 22, border: `1.5px dashed ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: "transparent" }}>
            <Target size={20} color={C.slate} /><div style={{ fontSize: 13, fontWeight: 600, marginTop: 10 }}>{inProgress.title}</div>
            <div style={{ fontSize: 11.5, color: C.slate, marginTop: 4 }}>{courseProgress(inProgress)}% complete — keep going!</div>
          </Card>
        )}
      </div>
    </div>
  );
}
