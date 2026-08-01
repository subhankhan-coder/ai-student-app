import { useState } from "react";
import { Users, MessageSquare, Code2, Mic } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { QABankPanel } from "../../components/interview/QABankPanel";
import { MockInterviewPanel } from "../../components/interview/MockInterviewPanel";
import { CodingPracticeTab } from "../../components/quiz/CodingPracticeTab";
import { HR_QUESTIONS, TECHNICAL_QUESTIONS } from "../../data/interview";
import { C } from "../../utils/theme";

export function InterviewPrepPage() {
  const [tab, setTab] = useState("hr");
  const tabs = [{ key: "hr", label: "HR Questions", icon: Users }, { key: "technical", label: "Technical Questions", icon: MessageSquare }, { key: "coding", label: "Coding Challenges", icon: Code2 }, { key: "mock", label: "Mock Interview", icon: Mic }];
  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="AI-Powered" title="Interview preparation" />
      <div style={{ display: "flex", gap: 6, background: C.slateSoft, padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map((t) => <button key={t.key} onClick={() => setTab(t.key)} className="asc-btn" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 12.5, background: tab === t.key ? C.card : "transparent", color: tab === t.key ? C.ink : C.slate }}><t.icon size={13} />{t.label}</button>)}
      </div>
      {tab === "hr" && <QABankPanel kind="hr" questions={HR_QUESTIONS} />}
      {tab === "technical" && <QABankPanel kind="technical" questions={TECHNICAL_QUESTIONS} />}
      {tab === "coding" && <CodingPracticeTab />}
      {tab === "mock" && <MockInterviewPanel />}
    </div>
  );
}
