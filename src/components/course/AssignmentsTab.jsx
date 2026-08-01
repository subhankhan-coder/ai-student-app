import { useState } from "react";
import { ClipboardList, Calendar, UploadCloud } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { C } from "../../utils/theme";

export function AssignmentsTab({ course, onSubmit, onToast }) {
  const [modalAssignment, setModalAssignment] = useState(null);
  const [fileName, setFileName] = useState("");
  const statusTone = { "Not submitted": "red", Submitted: "amber", Graded: "green" };
  const submit = () => { onSubmit(modalAssignment.id); onToast("success", "Assignment submitted successfully!"); setModalAssignment(null); setFileName(""); };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {course.assignments.map((a) => (
          <Card key={a.id} style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.slateSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ClipboardList size={16} color={C.slate} /></div>
              <div><div style={{ fontSize: 13.5, fontWeight: 700 }}>{a.title}</div><div style={{ fontSize: 12, color: C.slate, marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}><Calendar size={11} /> Due {a.dueDate}{a.grade ? ` · Grade: ${a.grade}` : ""}</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Pill tone={statusTone[a.status]}>{a.status}</Pill>
              {a.status === "Not submitted" && <Button variant="amber" icon={UploadCloud} onClick={() => setModalAssignment(a)}>Submit</Button>}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!modalAssignment} onClose={() => setModalAssignment(null)} title={modalAssignment ? `Submit — ${modalAssignment.title}` : ""}>
        <p style={{ fontSize: 13, color: C.slate, marginBottom: 14 }}>Due {modalAssignment?.dueDate}. Attach your work below.</p>
        <div style={{ border: `1.5px dashed ${C.border}`, borderRadius: 10, padding: 20, textAlign: "center", marginBottom: 16 }}>
          <UploadCloud size={22} color={C.slate} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 12.5, color: C.slate, marginBottom: 10 }}>{fileName || "No file chosen"}</div>
          <Button variant="ghost" onClick={() => setFileName(`${(modalAssignment?.title || "submission").slice(0, 18).replace(/\s+/g, "_")}.pdf`)}>Choose file</Button>
        </div>
        <Button variant="amber" disabled={!fileName} style={{ width: "100%", justifyContent: "center" }} onClick={submit}>Submit assignment</Button>
      </Modal>
    </>
  );
}
