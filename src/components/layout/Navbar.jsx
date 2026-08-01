import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { C, inputStyle } from "../../utils/theme";
import { NotificationBell } from "./NotificationBell";
import { ProfileMenu } from "./ProfileMenu";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useData } from "../../hooks/useData";

export function Navbar({ title, eyebrow, setMobileOpen, onLogout, profilePath }) {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const { theme, setTheme } = useTheme();
  const { notifications, markNotifRead } = useData();

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 30, background: "var(--topbar-bg)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        <button className="asc-hide-lg asc-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{ background: "none", border: "none", color: C.ink }}><Menu size={20} /></button>
        <div className="asc-hide-sm" style={{ minWidth: 0 }}>
          <div className="asc-mono" style={{ fontSize: 10.5, color: C.slate, letterSpacing: 0.6 }}>{eyebrow}</div>
          <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative" }} className="asc-hide-sm">
          <Search size={14} style={{ position: "absolute", left: 10, top: 9 }} color={C.slate} aria-hidden="true" />
          <input aria-label="Search the platform" placeholder="Search courses, jobs, resources…" style={{ ...inputStyle, paddingLeft: 30, width: 230, background: C.card }} />
        </div>
        <NotificationBell notifications={notifications} onMarkRead={markNotifRead} onOpenAll={() => role === "student" && navigate("/student/notifications")} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <ProfileMenu user={user} onLogout={onLogout} onProfile={() => navigate(profilePath)} />
      </div>
    </div>
  );
}
