import { X } from "lucide-react";
import { C } from "../../utils/theme";

export function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ position: "fixed", inset: 0, background: C.overlay, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div className="asc-fade asc-scroll" onClick={(e) => e.stopPropagation()} style={{ background: C.card, borderRadius: 16, width, maxWidth: "100%", maxHeight: "88vh", overflowY: "auto", padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 className="asc-display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="asc-btn" style={{ background: "none", border: "none" }}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
