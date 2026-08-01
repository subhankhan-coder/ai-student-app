import { useEffect, useState } from "react";
import { Play, Pause, CheckCircle2, Circle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { nextLesson } from "../../utils/helpers";
import { C } from "../../utils/theme";

export function VideoLessonsTab({ course, onToggleLesson }) {
  const [selected, setSelected] = useState(nextLesson(course).id);
  const [playing, setPlaying] = useState(false);
  const lesson = course.lessons.find((l) => l.id === selected) || course.lessons[0];
  useEffect(() => { setPlaying(false); }, [selected]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }} className="asc-grid-stack">
      <div>
        <div style={{ background: C.navyDeep, borderRadius: 14, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause video" : "Play video"} className="asc-btn" style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.14)", border: "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {playing ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" style={{ marginLeft: 3 }} />}
          </button>
          <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 999 }}><div style={{ width: playing ? "38%" : "0%", height: "100%", background: C.amber, borderRadius: 999, transition: "width .3s ease" }} /></div>
            <span className="asc-mono" style={{ fontSize: 11, color: "#fff" }}>{lesson.duration}</span>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{lesson.title}</div>
          <p style={{ fontSize: 13, color: C.slate, lineHeight: 1.7, marginTop: 6 }}>A guided walkthrough of {lesson.title.toLowerCase()}, with worked examples and a short recap. Simulated playback in this preview environment.</p>
          <Button variant={lesson.completed ? "ghost" : "amber"} icon={CheckCircle2} style={{ marginTop: 10 }} onClick={() => onToggleLesson(lesson.id)}>{lesson.completed ? "Marked as complete" : "Mark lesson complete"}</Button>
        </div>
      </div>
      <Card style={{ padding: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.slate, padding: "8px 10px" }}>{course.lessons.length} LESSONS</div>
        <div className="asc-scroll" style={{ maxHeight: 380, overflowY: "auto" }}>
          {course.lessons.map((l, i) => (
            <button key={l.id} onClick={() => setSelected(l.id)} className="asc-btn asc-row" style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 9, border: "none", background: selected === l.id ? C.chatBubble : "transparent", textAlign: "left" }}>
              {l.completed ? <CheckCircle2 size={15} color={C.green} style={{ flexShrink: 0 }} /> : <Circle size={15} color={C.slate} style={{ flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: selected === l.id ? 700 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i + 1}. {l.title}</div></div>
              <span className="asc-mono" style={{ fontSize: 11, color: C.slate, flexShrink: 0 }}>{l.duration}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
