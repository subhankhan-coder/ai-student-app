import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ToastStack } from "../components/ui/ToastStack";
import { STUDENT_NAV } from "../data/navigation";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { C } from "../utils/theme";

export function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const current = STUDENT_NAV.find((n) => location.pathname.startsWith(n.path));
  const title = location.pathname.includes("/courses/") ? "Course" : current?.label || "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="asc-root" data-theme={theme} style={{ background: C.paper, height: "100dvh", position: "relative", transform: "translateZ(0)", overflow: "hidden" }}>
      <Sidebar role="student" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={handleLogout} user={user} />
      <div className="asc-main">
        <Navbar title={title} eyebrow="STUDENT PORTAL" setMobileOpen={setMobileOpen} onLogout={handleLogout} profilePath="/student/profile" />
        <Outlet />
      </div>
      <ToastStack />
    </div>
  );
}
