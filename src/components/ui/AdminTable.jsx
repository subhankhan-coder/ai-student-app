import { Plus, Trash2, Filter } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";
import { EmptyState } from "./EmptyState";
import { C } from "../../utils/theme";

export function AdminTable({ title, eyebrow, columns, rows, onAdd, onDelete, renderCell, addLabel = "Add new" }) {
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow={eyebrow} title={title} action={onAdd && <Button icon={Plus} variant="amber" onClick={onAdd}>{addLabel}</Button>} />
      <Card style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.rowHover, borderBottom: `1px solid ${C.border}` }}>
                {columns.map((c) => <th key={c} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 700, color: C.slate }}>{c.toUpperCase()}</th>)}
                {onDelete && <th style={{ padding: "11px 16px" }}></th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id || i} className="asc-row" style={{ borderBottom: `1px solid ${C.border}` }}>
                  {renderCell(r)}
                  {onDelete && <td style={{ padding: "10px 16px", textAlign: "right" }}><button onClick={() => onDelete(r.id)} aria-label="Delete row" style={{ background: "none", border: "none", cursor: "pointer", color: C.red }}><Trash2 size={14} /></button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <EmptyState icon={Filter} title="Nothing here yet" body="Add your first record to get started." />}
      </Card>
    </div>
  );
}
