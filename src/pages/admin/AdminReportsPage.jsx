import { Download } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { MONTHLY_REPORT } from "../../data/admin";
import { C } from "../../utils/theme";

export function AdminReportsPage() {
  const handleDownload = () => window.print();
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Insights" title="Reports" action={<Button variant="ghost" icon={Download} onClick={handleDownload}>Export report</Button>} />
      <Card style={{ padding: 22 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead><tr style={{ background: C.rowHover, borderBottom: `1px solid ${C.border}` }}>{["Month", "New students", "Revenue", "Avg. quiz score", "Courses completed"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: C.slate }}>{h.toUpperCase()}</th>)}</tr></thead>
            <tbody>{MONTHLY_REPORT.map((row) => <tr key={row.month} className="asc-row" style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{row.month}</td><td style={{ padding: "10px 14px" }}>{row.newUsers}</td><td style={{ padding: "10px 14px" }}>{row.revenue}</td><td style={{ padding: "10px 14px" }}>{row.avgScore}</td><td style={{ padding: "10px 14px" }}>{row.coursesCompleted}</td></tr>)}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
