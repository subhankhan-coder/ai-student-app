import { useState } from "react";
import { Video, FileText, UploadCloud, Plus } from "lucide-react";
import { AdminTable } from "../../components/ui/AdminTable";
import { Td } from "../../components/ui/Td";
import { Pill } from "../../components/ui/Pill";
import { Modal } from "../../components/ui/Modal";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { CATEGORIES } from "../../data/courses";
import { mkLessons, uid } from "../../utils/helpers";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function AdminCoursesPage() {
  const { courses, setCourses } = useData();
  const { showToast } = useToast();
  const [modal, setModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], level: "Beginner", instructor: "" });
  const [tab, setTab] = useState("videos");
  const [videoName, setVideoName] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [assignTitle, setAssignTitle] = useState("");

  const addCourse = () => {
    if (!form.title) return;
    const lessons = mkLessons(["Introduction", "Core Concepts", "Practical Application"], 0);
    setCourses([...courses, { id: uid("c"), ...form, hours: 12, rating: "4.5", enrolled: 0, lessons, notes: [], assignments: [] }]);
    setAddModal(false); setForm({ title: "", category: CATEGORIES[0], level: "Beginner", instructor: "" });
    showToast("success", "Course created successfully!");
  };
  const uploadVideo = () => {
    if (!videoName.trim()) return;
    const newLesson = { id: uid("l"), title: videoName, duration: "10:00", completed: false };
    setCourses(courses.map((c) => c.id === modal.id ? { ...c, lessons: [...c.lessons, newLesson] } : c));
    setModal({ ...modal, lessons: [...modal.lessons, newLesson] });
    showToast("success", `Video "${videoName}" uploaded.`); setVideoName("");
  };
  const uploadPdf = () => {
    if (!pdfName.trim()) return;
    const newNote = { id: uid("n"), title: pdfName, pages: 8, size: "1.1 MB" };
    setCourses(courses.map((c) => c.id === modal.id ? { ...c, notes: [...c.notes, newNote] } : c));
    setModal({ ...modal, notes: [...modal.notes, newNote] });
    showToast("success", `PDF "${pdfName}" uploaded.`); setPdfName("");
  };
  const addAssignment = () => {
    if (!assignTitle.trim()) return;
    const a = { id: uid("a"), title: assignTitle, dueDate: "Aug 30, 2026", status: "Not submitted", grade: null };
    setCourses(courses.map((c) => c.id === modal.id ? { ...c, assignments: [...c.assignments, a] } : c));
    setModal({ ...modal, assignments: [...modal.assignments, a] });
    showToast("success", "Assignment added."); setAssignTitle("");
  };

  return (
    <>
      <AdminTable title="Course management" eyebrow="Curriculum" columns={["Course", "Category", "Level", "Hours", "Enrolled"]} rows={courses}
        onAdd={() => setAddModal(true)} onDelete={(id) => setCourses(courses.filter((c) => c.id !== id))}
        renderCell={(c) => (<><Td bold><button onClick={() => setModal(c)} style={{ background: "none", border: "none", color: C.ink, fontWeight: 600, cursor: "pointer", textAlign: "left", padding: 0 }}>{c.title}</button><div style={{ fontWeight: 400, fontSize: 11.5, color: C.slate }}>{c.instructor}</div></Td><Td>{c.category}</Td><Td><Pill>{c.level}</Pill></Td><Td>{c.hours}h</Td><Td>{c.enrolled}</Td></>)} />
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add new course">
        <Field label="Course title"><input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Category"><select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
        <Field label="Level"><select style={inputStyle} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
        <Field label="Instructor"><input style={inputStyle} value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} /></Field>
        <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={addCourse}>Create course</Button>
      </Modal>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal ? `Manage — ${modal.title}` : ""} width={560}>
        {modal && (
          <>
            <div style={{ display: "flex", gap: 6, background: C.slateSoft, padding: 4, borderRadius: 9, marginBottom: 16 }}>
              {[{ key: "videos", label: "Upload Videos" }, { key: "pdfs", label: "Upload PDFs" }, { key: "assignments", label: "Assignments" }].map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)} className="asc-btn" style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 11.5, background: tab === t.key ? C.card : "transparent", color: tab === t.key ? C.ink : C.slate }}>{t.label}</button>
              ))}
            </div>
            {tab === "videos" && (
              <>
                {modal.lessons.map((l) => <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12.5 }}><span><Video size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 6 }} />{l.title}</span><span style={{ color: C.slate }}>{l.duration}</span></div>)}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input style={inputStyle} placeholder="New lesson title…" value={videoName} onChange={(e) => setVideoName(e.target.value)} /><Button variant="amber" icon={UploadCloud} onClick={uploadVideo}>Upload</Button></div>
              </>
            )}
            {tab === "pdfs" && (
              <>
                {modal.notes.map((n) => <div key={n.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12.5 }}><span><FileText size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 6 }} />{n.title}</span><span style={{ color: C.slate }}>{n.size}</span></div>)}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input style={inputStyle} placeholder="New PDF title…" value={pdfName} onChange={(e) => setPdfName(e.target.value)} /><Button variant="amber" icon={UploadCloud} onClick={uploadPdf}>Upload</Button></div>
              </>
            )}
            {tab === "assignments" && (
              <>
                {modal.assignments.map((a) => <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12.5 }}><span>{a.title}</span><Pill tone={a.status === "Graded" ? "green" : a.status === "Submitted" ? "amber" : "red"}>{a.status}</Pill></div>)}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input style={inputStyle} placeholder="New assignment title…" value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)} /><Button variant="amber" icon={Plus} onClick={addAssignment}>Add</Button></div>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
