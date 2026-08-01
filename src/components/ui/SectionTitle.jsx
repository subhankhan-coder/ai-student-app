import { C } from "../../utils/theme";

export function SectionTitle({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
      <div>
        {eyebrow && <div className="asc-mono" style={{ fontSize: 11, color: C.amberDeep, fontWeight: 500, letterSpacing: 1, marginBottom: 4 }}>{eyebrow.toUpperCase()}</div>}
        <h2 className="asc-display" style={{ fontSize: 23, fontWeight: 600, margin: 0 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}
