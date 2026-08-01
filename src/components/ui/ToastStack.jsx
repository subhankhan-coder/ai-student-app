import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { C } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

/* type = "success" | "error" | "info" */
export function ToastStack() {
  const { toasts, dismissToast } = useToast();
  const styleFor = {
    success: { border: C.green, icon: CheckCircle2, color: C.green },
    error: { border: C.red, icon: AlertCircle, color: C.red },
    info: { border: C.amber, icon: Info, color: C.amberDeep },
  };
  return (
    <div aria-live="polite" role="status" style={{ position: "fixed", bottom: 18, right: 18, zIndex: 300, display: "flex", flexDirection: "column", gap: 10, width: 320, maxWidth: "calc(100vw - 32px)" }}>
      {toasts.map((t) => {
        const s = styleFor[t.type] || styleFor.info;
        return (
          <div key={t.id} className="asc-toast-in" style={{ background: C.card, border: `1px solid ${s.border}`, borderRadius: 12, padding: 13, display: "flex", gap: 10, alignItems: "flex-start", boxShadow: "0 8px 24px rgba(18,32,58,0.16)" }}>
            <s.icon size={17} color={s.color} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.5 }}>{t.message}</div>
            <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" style={{ background: "none", border: "none", color: C.slate, cursor: "pointer" }}><X size={13} /></button>
          </div>
        );
      })}
    </div>
  );
}
