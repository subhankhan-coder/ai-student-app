/* Color tokens resolve to CSS custom properties set on the .asc-root wrapper
   (see src/index.css) so every color automatically follows the light/dark theme. */
export const C = {
  ink: "var(--text-primary)",
  inkSolid: "var(--ink-solid)",
  navy: "var(--navy-soft-fg)",
  navyDeep: "#0D1B2E",
  paper: "var(--page-bg)",
  card: "var(--card-bg)",
  amber: "var(--amber)",
  amberDeep: "var(--amber-fg)",
  amberSoft: "var(--amber-soft)",
  green: "var(--green)",
  greenSoft: "var(--green-soft)",
  red: "var(--red)",
  redSoft: "var(--red-soft)",
  slate: "var(--text-secondary)",
  slateSoft: "var(--chip-bg)",
  border: "var(--border-c)",
  line: "var(--border-strong)",
  navySoft: "var(--navy-soft-bg)",
  chatBubble: "var(--chat-bubble)",
  banner: "var(--banner-bg)",
  unread: "var(--unread-bg)",
  rowHover: "var(--row-hover)",
  track: "var(--track-bg)",
  inputBg: "var(--input-bg)",
  overlay: "var(--modal-overlay)",
};

export const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${C.border}`,
  fontSize: 13.5,
  background: C.inputBg,
  color: C.ink,
};
