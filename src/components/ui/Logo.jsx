import { C } from "../../utils/theme";

export function Logo({ dark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width="28" height="28" viewBox="0 0 30 30">
        <rect width="30" height="30" rx="8" fill={dark ? "#fff" : C.ink} />
        <path d="M6 20 L12 12 L17 16 L24 7" stroke={dark ? C.ink : C.amber} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="7" r="2" fill={dark ? C.ink : C.amber} />
      </svg>
      <span className="asc-display" style={{ fontSize: 18, fontWeight: 600, color: dark ? "#fff" : C.ink }}>Ascent</span>
    </div>
  );
}
