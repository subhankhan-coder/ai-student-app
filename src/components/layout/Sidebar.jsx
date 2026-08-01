import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Logo } from "../ui/Logo";
import { STUDENT_NAV, ADMIN_NAV } from "../../data/navigation";
import { C } from "../../utils/theme";

export function Sidebar({ role, mobileOpen, setMobileOpen, onLogout, user }) {
  const nav = role === "admin" ? ADMIN_NAV : STUDENT_NAV;
  return (
    <>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }} className="asc-hide-lg" />}
      <nav aria-label="Main navigation" className="asc-scroll asc-sidebar" style={{
        width: 246, background: C.navyDeep, color: "#fff", height: "100%", position: "fixed", left: 0, top: 0,
        display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto",
        transform: mobileOpen ? "translateX(0)" : undefined, transition: "transform .2s ease",
      }}>
        <div style={{ padding: "20px 20px 16px" }}><Logo dark /></div>
        <div style={{ padding: "0 14px 10px" }}>
          <div className="asc-mono" style={{ fontSize: 10.5, color: "#7C8AA0", letterSpacing: 1, padding: "0 8px", marginBottom: 6 }}>{role === "admin" ? "ADMIN PORTAL" : "STUDENT PORTAL"}</div>
        </div>
        <div style={{ flex: 1, padding: "0 10px" }}>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="asc-btn"
                style={({ isActive }) => ({
                  width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", marginBottom: 2, borderRadius: 8,
                  border: "none", cursor: "pointer", textAlign: "left", textDecoration: "none",
                  background: isActive ? "rgba(219,154,22,0.16)" : "transparent", color: isActive ? C.amber : "#C6CEDB",
                  fontSize: 13, fontWeight: isActive ? 600 : 500,
                })}
              >
                <Icon size={16} />{item.label}
              </NavLink>
            );
          })}
        </div>
        <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px", marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.amber, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>{user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "#8FA0B8" }}>{role === "admin" ? "Administrator" : "Student"}</div>
            </div>
          </div>
          <button onClick={onLogout} className="asc-btn" style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#C6CEDB", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </nav>
    </>
  );
}
