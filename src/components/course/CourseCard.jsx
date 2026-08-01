import { Star, Clock, Video, Users, CheckCircle2, PlayCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { CourseThumb } from "./CourseThumb";
import { courseProgress } from "../../utils/helpers";
import { C } from "../../utils/theme";

export function CourseCard({ course, onOpen }) {
  const p = courseProgress(course);
  return (
    <Card style={{ padding: 18, display: "flex", flexDirection: "column" }} className="asc-card-hover">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <CourseThumb />
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: C.amberDeep, fontWeight: 600 }}><Star size={12} fill={C.amber} color={C.amber} /> {course.rating}</div>
      </div>
      <Pill tone="navy">{course.category}</Pill>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "9px 0 4px" }}>{course.title}</h3>
      <div style={{ fontSize: 12, color: C.slate, marginBottom: 12 }}>{course.instructor} · {course.level}</div>
      <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: C.slate, marginBottom: 14 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {course.hours}h</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Video size={11} /> {course.lessons.length} lessons</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> {course.enrolled}</span>
      </div>
      {p > 0 && <div style={{ marginBottom: 12 }}><ProgressBar value={p} tone={p === 100 ? "green" : "amber"} /><div style={{ fontSize: 11, color: C.slate, marginTop: 4 }}>{p}% complete</div></div>}
      <div style={{ marginTop: "auto" }}>
        {p === 100 ? <Button variant="ghost" icon={CheckCircle2} style={{ width: "100%", justifyContent: "center" }} onClick={() => onOpen(course.id)}>Review course</Button>
          : p > 0 ? <Button variant="amber" icon={PlayCircle} style={{ width: "100%", justifyContent: "center" }} onClick={() => onOpen(course.id)}>Continue learning</Button>
            : <Button variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onOpen(course.id)}>Start course</Button>}
      </div>
    </Card>
  );
}
