export function Td({ children, bold, style }) {
  return <td style={{ padding: "11px 16px", fontWeight: bold ? 600 : 400, ...style }}>{children}</td>;
}
