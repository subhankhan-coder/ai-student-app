import { useEffect, useState } from "react";
import { Search, MailOpen, BellOff, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { CATEGORY } from "../../data/notifications";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";

export function NotificationsPage() {
  const { notifications, markNotifRead, markAllNotifRead } = useData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const filtered = notifications.filter((n) => (category === "All" || n.category === category) && (n.title + n.body).toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [query, category]);

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Notification Center" title="Notifications" action={<Button variant="ghost" icon={MailOpen} onClick={markAllNotifRead}>Mark all read</Button>} />
      <div style={{ position: "relative", marginBottom: 14, maxWidth: 380 }}><Search size={14} style={{ position: "absolute", left: 12, top: 12 }} color={C.slate} /><input aria-label="Search notifications" placeholder="Search notifications…" style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {["All", ...Object.keys(CATEGORY)].map((c) => <button key={c} onClick={() => setCategory(c)} className="asc-btn" style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: `1px solid ${category === c ? C.inkSolid : C.border}`, background: category === c ? C.inkSolid : C.card, color: category === c ? "#fff" : C.slate }}>{c === "All" ? "All" : CATEGORY[c].label}</button>)}
      </div>
      {pageItems.length === 0 ? <EmptyState icon={BellOff} title="No notifications found" body="Try a different search or filter." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pageItems.map((n) => {
            const cat = CATEGORY[n.category], Icon = cat.icon;
            return (
              <Card key={n.id} style={{ padding: 16, display: "flex", gap: 14, alignItems: "flex-start", background: n.read ? C.card : C.unread }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={16} color={C.amberDeep} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 700, fontSize: 13 }}>{n.title}</span><Pill tone={cat.tone}>{cat.label}</Pill></div><span style={{ fontSize: 11, color: C.slate }}>{n.time}</span></div>
                  <div style={{ fontSize: 12.5, color: C.slate, marginTop: 4 }}>{n.body}</div>
                </div>
                {!n.read && <button onClick={() => markNotifRead(n.id)} aria-label="Mark as read" className="asc-btn" style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 7, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckCircle2 size={13} color={C.green} /></button>}
              </Card>
            );
          })}
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label="Notifications pagination" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page" className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, opacity: currentPage === 1 ? 0.4 : 1 }}><ChevronLeft size={14} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button key={p} onClick={() => setPage(p)} aria-current={currentPage === p ? "page" : undefined} className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${currentPage === p ? C.inkSolid : C.border}`, background: currentPage === p ? C.inkSolid : C.card, color: currentPage === p ? "#fff" : C.ink, fontSize: 12.5, fontWeight: 600 }}>{p}</button>)}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page" className="asc-btn" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, opacity: currentPage === totalPages ? 0.4 : 1 }}><ChevronRight size={14} /></button>
        </nav>
      )}
    </div>
  );
}
