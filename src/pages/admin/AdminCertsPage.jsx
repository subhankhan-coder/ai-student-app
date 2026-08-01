import { useState } from "react";
import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Pill } from "../../components/ui/Pill";
import { useToast } from "../../hooks/useToast";

export function AdminCertsPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState([
    { id: "ac1", student: "Kabir Malhotra", course: "Cloud Computing Fundamentals", date: "Jul 20, 2026", status: "Issued" },
    { id: "ac2", student: "Aditi Sharma", course: "Cloud Computing Fundamentals", date: "Feb 04, 2026", status: "Issued" },
    { id: "ac3", student: "Rohan Iyer", course: "Python Programming", date: "Pending", status: "Pending" },
  ]);
  const approve = (id) => { setRows(rows.map((r) => r.id === id ? { ...r, status: "Issued", date: "Jul 25, 2026" } : r)); showToast("success", "Certificate approved and issued."); };
  return (
    <AdminTable title="Certificate management" eyebrow="Achievements" columns={["Student", "Course", "Date", "Status"]} rows={rows}
      renderCell={(r) => (<><Td bold>{r.student}</Td><Td>{r.course}</Td><Td>{r.date}</Td><Td>{r.status === "Pending" ? <button onClick={() => approve(r.id)}><Pill tone="amber">Approve</Pill></button> : <Pill tone="green">Issued</Pill>}</Td></>)} />
  );
}
