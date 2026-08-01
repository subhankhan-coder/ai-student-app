import { useRef, useState } from "react";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { C } from "../../utils/theme";
import { useClickOutside } from "../../hooks/useClickOutside";

export function ProfileMenu({ user, onLogout, onProfile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: "relative" }} className="asc-hide-sm">
      <button onClick={() => setOpen(!open)} className="asc-btn" aria-label="Profile menu" aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, padding: "5px 8px 5px 5px" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.amber, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
        <ChevronDown size={13} color={C.slate} />
      </button>
      {open && (
        <div role="menu" className="asc-fade" style={{ position: "absolute", right: 0, top: 44, width: 190, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: "0 12px 32px rgba(18,32,58,0.16)", zIndex: 100, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: C.slate, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
          </div>
          <button onClick={() => { onProfile(); setOpen(false); }} role="menuitem" className="asc-btn asc-row" style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "none", background: "none", fontSize: 12.5 }}><Settings size={13} /> Profile Settings</button>
          <button onClick={onLogout} role="menuitem" className="asc-btn asc-row" style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "none", background: "none", fontSize: 12.5, color: C.red }}><LogOut size={13} /> Sign out</button>
        </div>
      )}
    </div>
  );
}
