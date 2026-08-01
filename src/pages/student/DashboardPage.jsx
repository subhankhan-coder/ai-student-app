import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, PlayCircle, BookOpen, CheckCircle2, Clock, Award, Loader2 } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { StatCard } from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { EmptyState } from "../../components/ui/EmptyState";
import { Pill } from "../../components/ui/Pill";
import { COMPANIES } from "../../data/jobs";
import { courseProgress } from "../../utils/helpers";
import { simulateCourseRecommendations, thinkingDelay } from "../../utils/aiSimulator";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useAuth } from "../../hooks/useAuth";

export function DashboardPage() {
  const { courses, jobs, certs } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const avg = Math.round(courses.reduce((a, c) => a + courseProgress(c), 0) / courses.length);
  const inProgress = courses.filter((c) => { const p = courseProgress(c); return p > 0 && p < 100; });
  const [recLoading, setRecLoading] = useState(false);
  const [recs, setRecs] = useState(null);

  const getRecs = async () => {
    setRecLoading(true);
    await thinkingDelay(500);
    setRecs(simulateCourseRecommendations(inProgress.map((c) => c.title)));
    setRecLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Overview" title={`Welcome back, ${user.name.split(" ")[0]}`} action={<Button icon={Sparkles} variant="amber" onClick={() => navigate("/student/tutor")}>Ask AI Tutor</Button>} />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total courses" value={courses.length} icon={BookOpen} tone="navy" />
        <StatCard label="Completed courses" value={courses.filter((c) => courseProgress(c) === 100).length} icon={CheckCircle2} tone="green" />
        <StatCard label="Pending courses" value={courses.filter((c) => courseProgress(c) < 100).length} icon={Clock} tone="amber" />
        <StatCard label="Certificates" value={certs.length} icon={Award} tone="red" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Continue learning</h3>
            <button onClick={() => navigate("/student/courses")} style={{ background: "none", border: "none", color: C.amberDeep, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>View all <ChevronRight size={13} /></button>
          </div>
          {inProgress.slice(0, 3).map((c) => {
            const p = courseProgress(c);
            return (
              <div key={c.id} className="asc-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 8px", borderRadius: 9 }}>
                <div style={{ width: 40, height: 40, borderRadius: 9, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><PlayCircle size={18} color={C.amberDeep} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.title}</div>
                  <div style={{ marginTop: 5 }}><ProgressBar value={p} /></div>
                </div>
                <div className="asc-mono" style={{ fontSize: 12.5, color: C.slate, width: 34, textAlign: "right" }}>{p}%</div>
              </div>
            );
          })}
          {inProgress.length === 0 && <EmptyState icon={BookOpen} title="Nothing in progress" body="Enroll in a course from My Courses to get started." />}
        </Card>
        <Card style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px" }}>Overall progress</h3>
          <ProgressRing value={avg} size={104} color={C.amber} />
          <div style={{ fontSize: 12.5, color: C.slate, marginTop: 12 }}>Across {courses.length} courses</div>
          <Button variant="ghost" style={{ marginTop: 14, width: "100%", justifyContent: "center" }} onClick={() => navigate("/student/progress")}>View analytics</Button>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Job recommendations</h3>
            <button onClick={() => navigate("/student/jobs")} style={{ background: "none", border: "none", color: C.amberDeep, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>View all</button>
          </div>
          {jobs.slice(0, 3).map((j) => (
            <div key={j.id} className="asc-row" style={{ padding: "9px 8px", borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{j.title}</div><div style={{ fontSize: 12, color: C.slate }}>{COMPANIES.find((c) => c.id === j.companyId).name} · {j.location}</div></div>
              <Pill tone="navy">{j.type}</Pill>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Upcoming interviews</h3>
            <button onClick={() => navigate("/student/interview")} style={{ background: "none", border: "none", color: C.amberDeep, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Practice</button>
          </div>
          <div className="asc-row" style={{ padding: "9px 8px", borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>PixelForge Labs — Frontend Developer</div><div style={{ fontSize: 12, color: C.slate }}>Aug 1, 2026 · 2:00 PM</div></div>
            <Pill tone="green">Scheduled</Pill>
          </div>
          <div className="asc-row" style={{ padding: "9px 8px", borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>StratoNet — Cloud Support Engineer</div><div style={{ fontSize: 12, color: C.slate }}>Under review</div></div>
            <Pill tone="amber">Pending</Pill>
          </div>
        </Card>
      </div>

      <Card style={{ padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Sparkles size={15} color={C.amberDeep} /><h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>AI-recommended courses for you</h3></div>
          <Button variant="ghost" icon={recLoading ? Loader2 : Sparkles} disabled={recLoading} onClick={getRecs}>{recLoading ? "Thinking…" : recs ? "Refresh" : "Get recommendations"}</Button>
        </div>
        {recs && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {recs.map((title) => <Pill key={title} tone="amber">{title}</Pill>)}
          </div>
        )}
      </Card>
    </div>
  );
}
