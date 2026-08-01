import { Card } from "./Card";
import { C } from "../../utils/theme";

const STAT_TONES = { navy: { fg: C.navy, bg: C.navySoft }, amber: { fg: C.amberDeep, bg: C.amberSoft }, green: { fg: C.green, bg: C.greenSoft }, red: { fg: C.red, bg: C.redSoft } };

export function StatCard({ label, value, icon: Icon, tone = "navy", sub }) {
  const t = STAT_TONES[tone] || STAT_TONES.navy;
  return (
    <Card style={{ padding: 18, flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: C.slate, fontWeight: 600, marginBottom: 8 }}>{label}</div>
          <div className="asc-display" style={{ fontSize: 27, fontWeight: 600, color: C.ink }}>{value}</div>
          {sub && <div style={{ fontSize: 11.5, color: C.slate, marginTop: 4 }}>{sub}</div>}
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={t.fg} />
        </div>
      </div>
    </Card>
  );
}
