import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { EmptyState } from "../../components/ui/EmptyState";
import { ContinueBanner } from "../../components/course/ContinueBanner";
import { CourseCard } from "../../components/course/CourseCard";
import { CATEGORIES } from "../../data/courses";
import { courseProgress } from "../../utils/helpers";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function CoursesPage() {
  const { courses } = useData();
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const cats = ["All", ...CATEGORIES];
  const inProgress = courses.filter((c) => { const p = courseProgress(c); return p > 0 && p < 100; });
  const onOpen = (id) => navigate(`/student/courses/${id}`);

  const filtered = courses.filter((c) => (category === "All" || c.category === category) && c.title.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [category, query]);

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Learning" title="My courses" />
      <ContinueBanner course={inProgress[0]} onOpen={onOpen} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        <div className="asc-mono" style={{ fontSize: 11, color: C.slate, letterSpacing: 0.6, display: "flex", alignItems: "center", gap: 6 }}><Layers size={13} /> COURSE CATEGORIES</div>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: 12 }} color={C.slate} aria-hidden="true" />
          <input aria-label="Search courses" placeholder="Search courses…" style={{ ...inputStyle, paddingLeft: 30, width: 220 }} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className="asc-btn" aria-pressed={category === c}
            style={{ padding: "7px 13px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, border: `1px solid ${category === c ? C.inkSolid : C.border}`, background: category === c ? C.inkSolid : C.card, color: category === c ? "#fff" : C.slate }}>
            {c}{c !== "All" ? ` (${courses.filter((x) => x.category === c).length})` : ""}
          </button>
        ))}
      </div>

      {pageItems.length === 0 ? <EmptyState icon={Search} title="No courses found" body="Try a different search term or category." /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
          {pageItems.map((c) => <CourseCard key={c.id} course={c} onOpen={onOpen} />)}
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label="Course pagination" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 22 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page" className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, opacity: currentPage === 1 ? 0.4 : 1 }}><ChevronLeft size={14} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} aria-current={currentPage === p ? "page" : undefined} className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${currentPage === p ? C.inkSolid : C.border}`, background: currentPage === p ? C.inkSolid : C.card, color: currentPage === p ? "#fff" : C.ink, fontSize: 12.5, fontWeight: 600 }}>{p}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page" className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, opacity: currentPage === totalPages ? 0.4 : 1 }}><ChevronRight size={14} /></button>
        </nav>
      )}
    </div>
  );
}
