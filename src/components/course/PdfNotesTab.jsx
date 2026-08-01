import { FileText, Download } from "lucide-react";
import { Card } from "../ui/Card";
import { C } from "../../utils/theme";

export function PdfNotesTab({ course }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
      {course.notes.map((n) => (
        <Card key={n.id} style={{ padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: C.redSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><FileText size={18} color={C.red} /></div>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.title}</div><div style={{ fontSize: 11.5, color: C.slate, marginTop: 2 }}>{n.pages} pages · {n.size}</div></div>
          <button aria-label={`Download ${n.title}`} className="asc-btn" style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Download size={14} color={C.ink} /></button>
        </Card>
      ))}
    </div>
  );
}
