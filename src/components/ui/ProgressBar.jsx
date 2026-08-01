import { C } from "../../utils/theme";

export function ProgressBar({ value, tone = "amber", h = 7 }) {
  const color = { amber: C.amber, green: C.green, navy: C.navy }[tone];
  return (
    <div style={{ background: C.track, height: h, borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 999, transition: "width .4s ease" }} />
    </div>
  );
}
