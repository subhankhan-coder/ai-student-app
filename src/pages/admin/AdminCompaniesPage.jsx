import { useState } from "react";
import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Modal } from "../../components/ui/Modal";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { uid } from "../../utils/helpers";
import { inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function AdminCompaniesPage() {
  const { companies, setCompanies } = useData();
  const { showToast } = useToast();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", hq: "" });
  const add = () => {
    if (!form.name) return;
    setCompanies([...companies, { id: uid("co"), ...form, size: "1-50", founded: "2026", color: "slate", about: "" }]);
    setModal(false); setForm({ name: "", industry: "", hq: "" }); showToast("success", "Company added successfully!");
  };
  return (
    <>
      <AdminTable title="Company management" eyebrow="Hiring partners" columns={["Company", "Industry", "HQ", "Size", "Founded"]} rows={companies} onAdd={() => setModal(true)} addLabel="Add company" onDelete={(id) => setCompanies(companies.filter((c) => c.id !== id))}
        renderCell={(c) => (<><Td bold>{c.name}</Td><Td>{c.industry}</Td><Td>{c.hq}</Td><Td>{c.size}</Td><Td>{c.founded}</Td></>)} />
      <Modal open={modal} onClose={() => setModal(false)} title="Add hiring partner">
        <Field label="Company name"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Industry"><input style={inputStyle} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></Field>
        <Field label="Headquarters"><input style={inputStyle} value={form.hq} onChange={(e) => setForm({ ...form, hq: e.target.value })} /></Field>
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={add}>Add company</Button>
      </Modal>
    </>
  );
}
