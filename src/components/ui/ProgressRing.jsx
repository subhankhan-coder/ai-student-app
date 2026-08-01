import { C } from "../../utils/theme";

export function ProgressRing({ value, size = 78, stroke = 8, color = C.amber }) {
  const r = (size - stroke) / 2, circumf = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circumf} strokeDashoffset={circumf - (value / 100) * circumf} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="asc-display" style={{ fontSize: size > 90 ? 20 : 16, fontWeight: 600 }}>{value}%</span>
      </div>
    </div>
  );
}
