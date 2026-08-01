import { Loader2 } from "lucide-react";
import { C } from "../../utils/theme";

export function Button({ children, onClick, variant = "primary", icon: Icon, style, type = "button", disabled }) {
  const styles = {
    primary: { background: C.inkSolid, color: "#fff", border: `1px solid ${C.inkSolid}` },
    amber: { background: C.amber, color: "#fff", border: `1px solid ${C.amber}` },
    ghost: { background: "transparent", color: C.ink, border: `1px solid ${C.border}` },
    danger: { background: "transparent", color: C.red, border: `1px solid ${C.redSoft}` },
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="asc-btn"
      style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, padding: "9px 15px", borderRadius: 9, opacity: disabled ? 0.55 : 1, ...styles[variant], ...style }}
    >
      {Icon && <Icon size={15} className={Icon === Loader2 ? "asc-spin" : ""} />}
      {children}
    </button>
  );
}
