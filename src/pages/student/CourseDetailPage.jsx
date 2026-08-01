import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Video, FileText, ClipboardList, PlayCircle } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { CourseThumb } from "../../components/course/CourseThumb";
import { VideoLessonsTab } from "../../components/course/VideoLessonsTab";
import { PdfNotesTab } from "../../components/course/PdfNotesTab";
import { AssignmentsTab } from "../../components/course/AssignmentsTab";
import { courseProgress } from "../../utils/helpers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, toggleLesson, submitAssignment } = useData();
  const { showToast } = useToast();
  const [tab, setTab] = useState("lessons");

  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return (
      <div style={{ padding: 24 }}>
        <EmptyState icon={Video} title="Course not found" body="This course may have been removed." />
      </div>
    );
  }

  const p = courseProgress(course);
  const tabs = [{ key: "lessons", label: "Video Lessons", icon: Video }, { key: "notes", label: "PDF Notes", icon: FileText }, { key: "assignments", label: "Assignments", icon: ClipboardList }];

  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => navigate("/student/courses")} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.slate, fontSize: 13, marginBottom: 16, cursor: "pointer" }}><ArrowLeft size={14} /> Back to courses</button>
      <Card style={{ padding: 22, marginBottom: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <CourseThumb size={56} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}><Pill tone="navy">{course.category}</Pill><Pill>{course.level}</Pill></div>
          <h2 className="asc-display" style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{course.title}</h2>
          <div style={{ fontSize: 12.5, color: C.slate, marginTop: 4 }}>{course.instructor} · {course.hours}h · {course.lessons.length} lessons</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}><ProgressRing value={p} size={62} stroke={6} color={p === 100 ? C.green : C.amber} /><Button variant="amber" icon={PlayCircle} onClick={() => setTab("lessons")}>Continue Learning</Button></div>
      </Card>
      <div style={{ display: "flex", gap: 6, background: C.slateSoft, padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 13, background: tab === t.key ? C.card : "transparent", color: tab === t.key ? C.ink : C.slate }}><t.icon size={14} />{t.label}</button>
        ))}
      </div>
      {tab === "lessons" && <VideoLessonsTab course={course} onToggleLesson={(lid) => toggleLesson(course.id, lid)} />}
      {tab === "notes" && <PdfNotesTab course={course} />}
      {tab === "assignments" && <AssignmentsTab course={course} onSubmit={(aid) => submitAssignment(course.id, aid)} onToast={showToast} />}
    </div>
  );
}
