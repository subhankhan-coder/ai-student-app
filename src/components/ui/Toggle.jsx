import { C } from "../../utils/theme";

export function Toggle({ on, onChange, label, hint }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {hint && <div style={{ fontSize: 11.5, color: C.slate, marginTop: 2 }}>{hint}</div>}
      </div>
      <button onClick={() => onChange(!on)} className="asc-btn" role="switch" aria-checked={on} aria-label={label}
        style={{ width: 42, height: 24, borderRadius: 999, border: "none", background: on ? C.amber : C.track, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .15s ease" }} />
      </button>
    </div>
  );
}
