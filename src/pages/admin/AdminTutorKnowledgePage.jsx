import { useState } from "react";
import { Sparkles, Loader2, Bot } from "lucide-react";
import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Pill } from "../../components/ui/Pill";
import { Modal } from "../../components/ui/Modal";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { uid } from "../../utils/helpers";
import { simulateTutorKnowledgePreview, thinkingDelay } from "../../utils/aiSimulator";
import { C, inputStyle } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

export function AdminTutorKnowledgePage() {
  const { showToast } = useToast();
  const [topics, setTopics] = useState([
    { id: "t1", topic: "Programming Fundamentals", prompts: 42, tone: "Socratic", status: "Active" },
    { id: "t2", topic: "Web Development", prompts: 35, tone: "Practical", status: "Active" },
    { id: "t3", topic: "Data & AI", prompts: 28, tone: "Analytical", status: "Draft" },
    { id: "t4", topic: "Career Readiness", prompts: 19, tone: "Encouraging", status: "Active" },
  ]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ topic: "", tone: "Encouraging" });
  const [preview, setPreview] = useState(null);
  const [genLoading, setGenLoading] = useState(false);

  const generatePreview = async () => {
    if (!form.topic.trim()) return;
    setGenLoading(true); setPreview(null);
    await thinkingDelay(450);
    setPreview(simulateTutorKnowledgePreview(form.topic, form.tone));
    setGenLoading(false);
  };
  const add = () => {
    if (!form.topic) return;
    setTopics([...topics, { id: uid("t"), topic: form.topic, prompts: preview ? preview.length : 0, tone: form.tone, status: "Draft" }]);
    setModal(false); setForm({ topic: "", tone: "Encouraging" }); setPreview(null); showToast("success", "Knowledge topic added.");
  };
  return (
    <>
      <AdminTable title="AI tutor knowledge management" eyebrow="AI Tutor" columns={["Topic area", "Prompt bank", "Tone", "Status"]} rows={topics} onAdd={() => setModal(true)} addLabel="Add topic" onDelete={(id) => setTopics(topics.filter((t) => t.id !== id))}
        renderCell={(t) => (<><Td bold>{t.topic}</Td><Td>{t.prompts} prompts</Td><Td>{t.tone}</Td><Td><Pill tone={t.status === "Active" ? "green" : "slate"}>{t.status}</Pill></Td></>)} />
      <Modal open={modal} onClose={() => { setModal(false); setPreview(null); }} title="Add tutor topic" width={520}>
        <Field label="Topic area"><input style={inputStyle} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} /></Field>
        <Field label="Tutor tone"><select style={inputStyle} value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })}><option>Encouraging</option><option>Socratic</option><option>Practical</option><option>Analytical</option></select></Field>
        <button onClick={generatePreview} disabled={genLoading || !form.topic.trim()} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.amberDeep, fontWeight: 600, fontSize: 12.5, padding: 0, marginBottom: 14 }}>{genLoading ? <Loader2 size={13} className="asc-spin" /> : <Sparkles size={13} />}{genLoading ? "Generating…" : "Preview sample prompts with AI"}</button>
        {preview && <div style={{ background: C.chatBubble, borderRadius: 10, padding: 14, marginBottom: 14 }}>{preview.map((p, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, marginBottom: 7 }}><Bot size={13} color={C.amberDeep} style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>)}</div>}
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={add}>Add topic</Button>
      </Modal>
    </>
  );
}
