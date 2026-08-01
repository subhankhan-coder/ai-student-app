import { Sun, Moon } from "lucide-react";
import { C } from "../../utils/theme";

export function ThemeToggle({ theme, setTheme }) {
  const dark = theme === "dark";
  return (
    <button onClick={() => setTheme(dark ? "light" : "dark")} className="asc-btn" aria-label="Toggle dark mode" aria-pressed={dark}
      style={{ display: "flex", alignItems: "center", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, height: 36, padding: "0 4px", position: "relative", width: 60, flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: dark ? 27 : 3, width: 26, height: 26, borderRadius: 7, background: dark ? C.inkSolid : C.amberSoft, transition: "left .18s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {dark ? <Moon size={12} color="#fff" /> : <Sun size={12} color={C.amberDeep} />}
      </div>
    </button>
  );
}
