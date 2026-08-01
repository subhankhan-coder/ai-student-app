import { useEffect, useRef, useState } from "react";
import { Bot, User, Send, Loader2, RotateCcw } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { MarkdownMessage } from "../../components/ui/MarkdownMessage";
import { askTutor } from "../../services/openai";
import { TUTOR_SUGGESTIONS } from "../../data/tutorTopics";
import { C, inputStyle } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useToast } from "../../hooks/useToast";

export function AiTutorPage() {
  const { chatHistory, appendChatMessage, clearChatHistory } = useData();
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState(null);
  const endRef = useRef(null);
  const typingTimer = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading, typingText]);
  useEffect(() => () => clearInterval(typingTimer.current), []);

  const typeOut = (fullText) => new Promise((resolve) => {
    let i = 0;
    setTypingText("");
    typingTimer.current = setInterval(() => {
      i += 3;
      setTypingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingTimer.current);
        resolve();
      }
    }, 12);
  });

  const send = async (text) => {
    const t = text ?? input;
    if (!t.trim() || loading) return;
    appendChatMessage({ role: "user", text: t });
    setInput(""); setLoading(true);
    const result = await askTutor(t, chatHistory);
    setLoading(false);
    if (result.offline) showToast("info", `${result.reason} Showing an offline AI response instead.`);
    await typeOut(result.data);
    appendChatMessage({ role: "assistant", text: result.data });
    setTypingText(null);
  };

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", height: "calc(100vh - 62px)" }}>
      <SectionTitle eyebrow="AI-Powered" title="AI Tutor Chatbot" action={<Button variant="ghost" icon={RotateCcw} onClick={clearChatHistory}>Clear chat</Button>} />
      <Card style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="asc-scroll" style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {chatHistory.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.role === "user" ? C.inkSolid : C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.role === "user" ? <User size={13} color="#fff" /> : <Bot size={14} color={C.amberDeep} />}</div>
              <div style={{ maxWidth: "72%", background: m.role === "user" ? C.inkSolid : C.chatBubble, color: m.role === "user" ? "#fff" : C.ink, padding: "10px 14px", borderRadius: 12, whiteSpace: m.role === "user" ? "pre-wrap" : "normal" }}>
                {m.role === "user" ? <span style={{ fontSize: 13.5, lineHeight: 1.6 }}>{m.text}</span> : <MarkdownMessage text={m.text} />}
              </div>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Loader2 size={14} className="asc-spin" /><span style={{ fontSize: 12.5, color: C.slate }}>Thinking…</span></div>}
          {typingText !== null && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Bot size={14} color={C.amberDeep} /></div>
              <div style={{ maxWidth: "72%", background: C.chatBubble, color: C.ink, padding: "10px 14px", borderRadius: 12, fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{typingText}<span className="asc-cursor-blink" style={{ display: "inline-block" }}>▍</span></div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        {chatHistory.length < 2 && <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>{TUTOR_SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)} className="asc-btn" style={{ fontSize: 12, padding: "6px 12px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.card }}>{s}</button>)}</div>}
        <div style={{ borderTop: `1px solid ${C.border}`, padding: 14, display: "flex", gap: 10 }}>
          <input aria-label="Message the AI tutor" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about Python, React, SQL, ML and more…" style={{ ...inputStyle, flex: 1 }} disabled={loading || typingText !== null} />
          <Button variant="amber" icon={Send} onClick={() => send()} disabled={loading || typingText !== null}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
