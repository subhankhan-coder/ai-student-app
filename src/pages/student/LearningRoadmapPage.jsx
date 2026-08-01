import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { learningRoadmap } from "../../services/openai";
import { C, inputStyle } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

const TRACKS = ["Python", "Java", "React", "Node", "SQL", "Power BI", "Machine Learning", "Artificial Intelligence", "AWS", "Cloud", "DevOps", "Data Science"];
const STAGE_COLORS = [C.navy, C.amberDeep, C.red, C.green, C.amberDeep, C.green];

export function LearningRoadmapPage() {
  const { showToast } = useToast();
  const [track, setTrack] = useState(TRACKS[0]);
  const [loading, setLoading] = useState(false);
  const [stages, setStages] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true); setStages(null);
      const result = await learningRoadmap({ track });
      if (cancelled) return;
      setLoading(false);
      if (result.offline) showToast("info", `${result.reason} Showing an offline roadmap instead.`);
      setStages(result.data);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered · Guided Path" title="Learning roadmap" />
      <Card style={{ padding: 20, marginBottom: 20, maxWidth: 420 }}>
        <Field label="Track">
          <select style={inputStyle} value={track} onChange={(e) => setTrack(e.target.value)}>
            {TRACKS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </Card>

      {loading && <Card style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="asc-spin" /><div style={{ marginTop: 10, fontSize: 13, color: C.slate }}>Generating your {track} roadmap…</div></Card>}

      {!loading && stages && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {stages.map((s, i) => {
            const color = STAGE_COLORS[i % STAGE_COLORS.length];
            return (
              <div key={s.stage} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  {i < stages.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: C.border }} />}
                </div>
                <Card style={{ padding: 18, marginBottom: 16, flex: 1 }}>
                  <div className="asc-mono" style={{ fontSize: 10.5, color: C.amberDeep, marginBottom: 4 }}>{(s.stage || "").toUpperCase()}</div>
                  {s.focus && <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{s.focus}</div>}
                  {(s.items || []).map((it, j) => <div key={j} style={{ display: "flex", gap: 8, fontSize: 12.5, color: C.slate, marginBottom: 6 }}><CheckCircle2 size={13} color={color} style={{ flexShrink: 0, marginTop: 2 }} />{it}</div>)}
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
