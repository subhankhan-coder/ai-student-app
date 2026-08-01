import { useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { C } from "../../utils/theme";
import { CATEGORY } from "../../data/notifications";
import { useClickOutside } from "../../hooks/useClickOutside";

export function NotificationBell({ notifications, onMarkRead, onOpenAll }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unread = notifications.filter((n) => !n.read).length;
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} className="asc-btn" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} aria-expanded={open}
        style={{ position: "relative", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: C.ink }}>
        <Bell size={16} />
        {unread > 0 && <span className="asc-pulse" style={{ position: "absolute", top: -3, right: -3, background: C.red, color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 999, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>}
      </button>
      {open && (
        <div role="menu" className="asc-fade asc-scroll" style={{ position: "absolute", right: 0, top: 44, width: 330, maxHeight: 420, overflowY: "auto", background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, boxShadow: "0 12px 32px rgba(18,32,58,0.16)", zIndex: 100 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 15px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Notifications</span>
          </div>
          {notifications.length === 0 ? (
            <div style={{ padding: 26, textAlign: "center" }}><BellOff size={20} color={C.slate} style={{ opacity: 0.5 }} /><div style={{ fontSize: 12, color: C.slate, marginTop: 8 }}>No notifications yet</div></div>
          ) : notifications.slice(0, 5).map((n) => {
            const cat = CATEGORY[n.category], Icon = cat.icon;
            return (
              <button key={n.id} role="menuitem" onClick={() => onMarkRead(n.id)} className="asc-btn asc-row" style={{ width: "100%", textAlign: "left", display: "flex", gap: 9, padding: "11px 15px", border: "none", borderBottom: `1px solid ${C.border}`, background: n.read ? "transparent" : C.chatBubble }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={13} color={C.amberDeep} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: n.read ? 500 : 700 }}>{n.title}</div>
                  <div style={{ fontSize: 10.5, color: C.slate, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.body}</div>
                </div>
              </button>
            );
          })}
          <button onClick={() => { onOpenAll(); setOpen(false); }} style={{ width: "100%", padding: "11px 15px", background: "none", border: "none", color: C.amberDeep, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>View all notifications</button>
        </div>
      )}
    </div>
  );
}
