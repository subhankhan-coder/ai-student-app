import { useState } from "react";
import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Pill } from "../../components/ui/Pill";
import { Modal } from "../../components/ui/Modal";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { COMPANIES } from "../../data/jobs";
import { uid } from "../../utils/helpers";
import { inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function AdminJobsPage() {
  const { jobs, setJobs } = useData();
  const { showToast } = useToast();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", companyId: COMPANIES[0].id, location: "", type: "Full-time", salary: "" });
  const toggle = (id) => setJobs(jobs.map((j) => j.id === id ? { ...j, status: j.status === "Open" ? "Closed" : "Open" } : j));
  const add = () => {
    if (!form.title) return;
    setJobs([...jobs, { id: uid("j"), ...form, remote: form.location.toLowerCase().includes("remote"), skills: [], posted: "Just now", status: "Open", description: "" }]);
    setModal(false); setForm({ title: "", companyId: COMPANIES[0].id, location: "", type: "Full-time", salary: "" }); showToast("success", "Job posted successfully!");
  };
  return (
    <>
      <AdminTable title="Job management" eyebrow="Placements" columns={["Role", "Company", "Location", "Type", "Status"]} rows={jobs} onAdd={() => setModal(true)} addLabel="Post job" onDelete={(id) => setJobs(jobs.filter((j) => j.id !== id))}
        renderCell={(j) => (<><Td bold>{j.title}</Td><Td>{COMPANIES.find((c) => c.id === j.companyId)?.name}</Td><Td>{j.location}</Td><Td>{j.type}</Td><Td><button onClick={() => toggle(j.id)}><Pill tone={j.status === "Open" ? "green" : "red"}>{j.status}</Pill></button></Td></>)} />
      <Modal open={modal} onClose={() => setModal(false)} title="Post a new job">
        <Field label="Job title"><input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Company"><select style={inputStyle} value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}>{COMPANIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
        <div style={{ display: "flex", gap: 12 }}><Field label="Location"><input style={inputStyle} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field><Field label="Type"><select style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Full-time</option><option>Internship</option><option>Part-time</option></select></Field></div>
        <Field label="Salary range"><input style={inputStyle} value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></Field>
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={add}>Post job</Button>
      </Modal>
    </>
  );
}
