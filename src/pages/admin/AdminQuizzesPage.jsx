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

export function AdminQuizzesPage() {
  const { quizzes, setQuizzes } = useData();
  const { showToast } = useToast();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", course: "", questions: 8, duration: 12 });
  const add = () => {
    if (!form.title) return;
    setQuizzes([...quizzes, { id: uid("q"), ...form, questions: Number(form.questions), duration: Number(form.duration), attempts: 0, bestScore: null }]);
    setModal(false); setForm({ title: "", course: "", questions: 8, duration: 12 }); showToast("success", "Quiz created successfully!");
  };
  return (
    <>
      <AdminTable title="Quiz management" eyebrow="Assessments" columns={["Quiz", "Course", "Questions", "Duration", "Attempts"]} rows={quizzes} onAdd={() => setModal(true)} onDelete={(id) => setQuizzes(quizzes.filter((q) => q.id !== id))}
        renderCell={(q) => (<><Td bold>{q.title}</Td><Td>{q.course}</Td><Td>{q.questions}</Td><Td>{q.duration} min</Td><Td>{q.attempts}</Td></>)} />
      <Modal open={modal} onClose={() => setModal(false)} title="Create new quiz">
        <Field label="Quiz title"><input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Linked course"><input style={inputStyle} value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} /></Field>
        <div style={{ display: "flex", gap: 12 }}><Field label="Question count"><input type="number" style={inputStyle} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} /></Field><Field label="Duration (min)"><input type="number" style={inputStyle} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></Field></div>
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={add}>Create quiz</Button>
      </Modal>
    </>
  );
}
