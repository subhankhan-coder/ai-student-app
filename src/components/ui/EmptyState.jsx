import { C } from "../../utils/theme";

export function EmptyState({ icon: Icon, title, body }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px", color: C.slate }}>
      <Icon size={30} style={{ marginBottom: 10, opacity: 0.5 }} />
      <div style={{ fontWeight: 600, color: C.ink, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13 }}>{body}</div>
    </div>
  );
}
