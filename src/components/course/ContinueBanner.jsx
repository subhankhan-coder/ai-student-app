import { PlayCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ProgressRing } from "../ui/ProgressRing";
import { courseProgress, nextLesson } from "../../utils/helpers";
import { C } from "../../utils/theme";

export function ContinueBanner({ course, onOpen }) {
  if (!course) return null;
  const p = courseProgress(course), nl = nextLesson(course);
  return (
    <Card style={{ padding: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", background: C.navyDeep, border: "none" }}>
      <ProgressRing value={p} size={64} stroke={6} color={C.amber} />
      <div style={{ flex: 1, minWidth: 200, color: "#fff" }}>
        <div className="asc-mono" style={{ fontSize: 10.5, color: "#DB9A16", letterSpacing: 1, marginBottom: 4 }}>PICK UP WHERE YOU LEFT OFF</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{course.title}</div>
        <div style={{ fontSize: 12, color: "#B7C2D4", marginTop: 3 }}>Next: {nl.title} · {nl.duration}</div>
      </div>
      <Button variant="amber" icon={PlayCircle} onClick={() => onOpen(course.id)}>Continue Learning</Button>
    </Card>
  );
}
