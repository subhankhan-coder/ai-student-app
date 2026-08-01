import { AlertCircle } from "lucide-react";
import { C } from "../../utils/theme";

export function Field({ label, children, error }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: C.slate, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
      {error && <div role="alert" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: C.red, marginTop: 5 }}><AlertCircle size={12} />{error}</div>}
    </div>
  );
}
