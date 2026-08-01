import { useState } from "react";
import { Search, MapPin, Users, Building2, BookmarkCheck, Bookmark, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/EmptyState";
import { COMPANIES, STATUS_TONE } from "../../data/jobs";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function JobPortalPage() {
  const { jobs, applications, savedJobIds, toggleSaveJob, applyToJob } = useData();
  const { showToast } = useToast();
  const [tab, setTab] = useState("latest");
  const [query, setQuery] = useState("");
  const [modalJob, setModalJob] = useState(null);
  const companyOf = (j) => COMPANIES.find((c) => c.id === j.companyId);
  const appliedJobIds = applications.map((a) => a.jobId);
  const apply = (job) => {
    applyToJob(job.id);
    showToast("success", `Applied to ${job.title} at ${companyOf(job).name}!`);
    setModalJob(null);
  };

  const tabs = [{ key: "latest", label: "Latest Jobs" }, { key: "saved", label: "Saved Jobs" }, { key: "applied", label: "Applied Jobs" }, { key: "companies", label: "Companies" }];
  const filtered = jobs.filter((j) => (j.title + companyOf(j).name).toLowerCase().includes(query.toLowerCase()));
  const list = tab === "saved" ? filtered.filter((j) => savedJobIds.includes(j.id)) : tab === "applied" ? filtered.filter((j) => appliedJobIds.includes(j.id)) : filtered;

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Placements" title="Job portal" />
      <div style={{ display: "flex", gap: 6, background: C.slateSoft, padding: 4, borderRadius: 10, marginBottom: 18, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map((t) => <button key={t.key} onClick={() => setTab(t.key)} className="asc-btn" style={{ padding: "8px 15px", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 12.5, background: tab === t.key ? C.card : "transparent", color: tab === t.key ? C.ink : C.slate }}>{t.label}</button>)}
      </div>

      {tab === "companies" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
          {COMPANIES.map((c) => (
            <Card key={c.id} style={{ padding: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.navySoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.navy, fontSize: 13 }}>{c.name.slice(0, 2).toUpperCase()}</div>
                <div><div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div><div style={{ fontSize: 11.5, color: C.slate }}>{c.industry}</div></div>
              </div>
              <p style={{ fontSize: 12, color: C.slate, lineHeight: 1.6, marginBottom: 12 }}>{c.about}</p>
              <div style={{ fontSize: 11, color: C.slate, display: "flex", gap: 12 }}><span><MapPin size={11} style={{ display: "inline", verticalAlign: -1 }} /> {c.hq}</span><span><Users size={11} style={{ display: "inline", verticalAlign: -1 }} /> {c.size}</span></div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div style={{ position: "relative", marginBottom: 18, maxWidth: 380 }}><Search size={14} style={{ position: "absolute", left: 12, top: 12 }} color={C.slate} /><input aria-label="Search jobs" placeholder="Search by role or company…" style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} /></div>
          {list.length === 0 ? <EmptyState icon={Building2} title="No jobs found" body="Try a different search, or check back later." /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {list.map((j) => {
                const company = companyOf(j), applied = appliedJobIds.includes(j.id), app = applications.find((a) => a.jobId === j.id);
                return (
                  <Card key={j.id} style={{ padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: C.slateSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Building2 size={18} color={C.slate} /></div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{j.title}</div>
                        <div style={{ fontSize: 12, color: C.slate, marginTop: 2 }}>{company.name} · {j.location} · {j.posted}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}><Pill tone="navy">{j.type}</Pill><Pill tone="green">{j.salary}</Pill>{j.skills.map((s) => <Pill key={s}>{s}</Pill>)}{app && <Pill tone={STATUS_TONE[app.status]}>{app.status}</Pill>}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => toggleSaveJob(j.id)} aria-label="Save job" className="asc-btn" style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 9, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>{savedJobIds.includes(j.id) ? <BookmarkCheck size={16} color={C.amberDeep} /> : <Bookmark size={16} color={C.slate} />}</button>
                      {applied ? <Button variant="ghost" icon={CheckCircle2} disabled>Applied</Button> : <Button variant="amber" onClick={() => setModalJob(j)}>Apply now</Button>}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
      <Modal open={!!modalJob} onClose={() => setModalJob(null)} title={modalJob ? `Apply — ${modalJob.title}` : ""}>
        {modalJob && <><p style={{ fontSize: 13, color: C.slate, marginBottom: 16 }}>Your profile and resume will be shared with <strong>{companyOf(modalJob).name}</strong>.</p><Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={() => apply(modalJob)}>Submit application</Button></>}
      </Modal>
    </div>
  );
}
