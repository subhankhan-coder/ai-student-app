import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Pill } from "../../components/ui/Pill";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { useData } from "../../hooks/useData";

export function AdminStudentsPage() {
  const { students, setStudents } = useData();
  const toggle = (id) => setStudents(students.map((s) => s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s));
  return (
    <AdminTable title="Student management" eyebrow="Students" columns={["Student", "Program", "Progress", "Status", "Joined"]} rows={students} onDelete={(id) => setStudents(students.filter((s) => s.id !== id))}
      renderCell={(u) => (<><Td bold>{u.name}<div style={{ fontWeight: 400, fontSize: 11.5, color: "var(--text-secondary)" }}>{u.email}</div></Td><Td>{u.program}</Td><Td style={{ width: 140 }}><ProgressBar value={u.progress} /></Td><Td><button onClick={() => toggle(u.id)}><Pill tone={u.status === "Active" ? "green" : "slate"}>{u.status}</Pill></button></Td><Td>{u.joined}</Td></>)} />
  );
}
