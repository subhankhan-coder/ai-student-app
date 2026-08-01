import { ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp, Flame, ClipboardList, BadgeCheck } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { StatCard } from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { QUIZ_TREND, SKILLS } from "../../data/skills";
import { courseProgress } from "../../utils/helpers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function ProgressAnalyticsPage() {
  const { courses, quizzes } = useData();
  const avg = Math.round(courses.reduce((a, c) => a + courseProgress(c), 0) / courses.length);
  const avgQuiz = Math.round(quizzes.filter((q) => q.bestScore != null).reduce((a, q) => a + q.bestScore, 0) / (quizzes.filter((q) => q.bestScore != null).length || 1));
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Learning Analytics" title="Progress & analytics" />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Overall completion" value={`${avg}%`} icon={TrendingUp} tone="amber" />
        <StatCard label="Study streak" value="12 days" icon={Flame} tone="red" />
        <StatCard label="Avg. quiz score" value={`${avgQuiz || 0}%`} icon={ClipboardList} tone="green" />
        <StatCard label="Courses completed" value={courses.filter((c) => courseProgress(c) === 100).length} icon={BadgeCheck} tone="navy" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Quiz performance trend</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={QUIZ_TREND}>
                <CartesianGrid stroke="var(--border-c)" vertical={false} /><XAxis dataKey="m" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} width={30} /><Tooltip />
                <Line type="monotone" dataKey="score" stroke={C.amber} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Skill radar</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={SKILLS} outerRadius="70%">
                <PolarGrid stroke="var(--border-c)" /><PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: C.slate }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: C.slate }} />
                <Radar dataKey="level" stroke={C.amber} fill={C.amber} fillOpacity={0.32} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card style={{ padding: 20, marginTop: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Course completion</h3>
        {courses.map((c) => {
          const p = courseProgress(c);
          return <div key={c.id} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span>{c.title}</span><span className="asc-mono" style={{ color: C.slate }}>{p}%</span></div><ProgressBar value={p} tone={p === 100 ? "green" : "amber"} /></div>;
        })}
      </Card>
    </div>
  );
}
