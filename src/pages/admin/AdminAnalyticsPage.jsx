import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar } from "recharts";
import { Star, Briefcase, Award, ClipboardList } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { StatCard } from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import { REVENUE_TREND } from "../../data/admin";
import { fmtINR } from "../../utils/helpers";
import { C } from "../../utils/theme";

export function AdminAnalyticsPage() {
  const radial = [{ name: "Completion", value: 71, fill: C.amber }];
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Insights" title="Analytics" />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard label="Avg. course rating" value="4.7" icon={Star} tone="amber" />
        <StatCard label="Job placement rate" value="61%" icon={Briefcase} tone="green" />
        <StatCard label="Certificate completion" value="88%" icon={Award} tone="red" />
        <StatCard label="Avg. quiz score" value="74%" icon={ClipboardList} tone="navy" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue trend</h3>
          <div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><LineChart data={REVENUE_TREND}><CartesianGrid stroke="var(--border-c)" vertical={false} /><XAxis dataKey="m" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip formatter={(v) => [fmtINR(v), "Revenue"]} /><Line type="monotone" dataKey="revenue" stroke={C.amber} strokeWidth={2.4} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
        </Card>
        <Card style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, alignSelf: "flex-start" }}>Avg. course completion</h3>
          <div style={{ height: 190, width: "100%" }}><ResponsiveContainer width="100%" height="100%"><RadialBarChart innerRadius="70%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}><RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--track-bg)" }} /></RadialBarChart></ResponsiveContainer></div>
          <div className="asc-display" style={{ fontSize: 24, fontWeight: 600, marginTop: -100 }}>71%</div>
        </Card>
      </div>
    </div>
  );
}
