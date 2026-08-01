import { C } from "../../utils/theme";

export function Pill({ children, tone = "slate" }) {
  const map = {
    slate: { bg: C.slateSoft, fg: C.slate }, amber: { bg: C.amberSoft, fg: C.amberDeep },
    green: { bg: C.greenSoft, fg: C.green }, red: { bg: C.redSoft, fg: C.red }, navy: { bg: C.navySoft, fg: C.navy },
  };
  const t = map[tone] || map.slate;
  return (
    <span className="asc-mono" style={{ background: t.bg, color: t.fg, fontSize: 11, padding: "3px 9px", borderRadius: 999, fontWeight: 500, letterSpacing: 0.3 }}>
      {children}
    </span>
  );
}
