import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ToastStack } from "../components/ui/ToastStack";
import { ADMIN_NAV } from "../data/navigation";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { C } from "../utils/theme";

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const current = ADMIN_NAV.find((n) => location.pathname.startsWith(n.path));
  const title = current?.label || "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="asc-root" data-theme={theme} style={{ background: C.paper, height: "100dvh", position: "relative", transform: "translateZ(0)", overflow: "hidden" }}>
      <Sidebar role="admin" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={handleLogout} user={user} />
      <div className="asc-main">
        <Navbar title={title} eyebrow="ADMIN PORTAL" setMobileOpen={setMobileOpen} onLogout={handleLogout} profilePath="/admin/settings" />
        <Outlet />
      </div>
      <ToastStack />
    </div>
  );
}
