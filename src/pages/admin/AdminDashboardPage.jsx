import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Users, UserCheck, BookOpen, Briefcase, ClipboardList, DollarSign, Award } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { StatCard } from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import { SIGNUP_TREND, TRACK_DIST, PIE_COLORS } from "../../data/admin";
import { fmtINR } from "../../utils/helpers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function AdminDashboardPage() {
  const { students, jobs, courses, quizzes } = useData();
  const latestStudents = SIGNUP_TREND[SIGNUP_TREND.length - 1].students;
  const latestRevenue = 864000;
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Overview" title="Admin dashboard" />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Total students" value={latestStudents.toLocaleString()} icon={Users} tone="navy" />
        <StatCard label="Active students" value={students.filter((s) => s.status === "Active").length} icon={UserCheck} tone="amber" />
        <StatCard label="Total courses" value={courses.length} icon={BookOpen} tone="green" />
        <StatCard label="Total jobs" value={jobs.length} icon={Briefcase} tone="red" />
        <StatCard label="Total quizzes" value={quizzes.length} icon={ClipboardList} tone="navy" />
        <StatCard label="Monthly revenue" value={fmtINR(latestRevenue)} icon={DollarSign} tone="amber" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Student sign-ups</h3>
          <div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={SIGNUP_TREND}><CartesianGrid stroke="var(--border-c)" vertical={false} /><XAxis dataKey="m" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} width={30} /><Tooltip /><Bar dataKey="students" fill={C.navy} radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </Card>
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Enrollment by track</h3>
          <div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={TRACK_DIST} dataKey="value" nameKey="name" innerRadius={42} outerRadius={72} paddingAngle={3}>{TRACK_DIST.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip /><Legend wrapperStyle={{ fontSize: 10 }} /></PieChart></ResponsiveContainer></div>
        </Card>
      </div>
      <Card style={{ padding: 20, marginTop: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Recent activity</h3>
        {[
          { icon: Users, text: "Kabir Malhotra completed \"Cloud Computing Fundamentals\"", time: "1h ago" },
          { icon: Briefcase, text: "New application: Rohan Iyer → Frontend Developer at PixelForge Labs", time: "3h ago" },
          { icon: BookOpen, text: "\"DevOps Essentials\" course was published", time: "6h ago" },
          { icon: Award, text: "Certificate issued to Aditi Sharma for Cloud Computing Fundamentals", time: "1d ago" },
        ].map((a, i) => (
          <div key={i} className="asc-row" style={{ display: "flex", gap: 12, alignItems: "center", padding: "9px 8px", borderRadius: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: C.slateSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><a.icon size={14} color={C.slate} /></div>
            <div style={{ flex: 1, fontSize: 12.5 }}>{a.text}</div><div style={{ fontSize: 11, color: C.slate, flexShrink: 0 }}>{a.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
