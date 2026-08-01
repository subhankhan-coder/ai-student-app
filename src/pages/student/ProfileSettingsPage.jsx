import { useState } from "react";
import { Save } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { Pill } from "../../components/ui/Pill";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { C, inputStyle } from "../../utils/theme";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";

export function ProfileSettingsPage() {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const [form, setForm] = useState({ ...user, program: "B.Tech, Computer Science", year: "2027", bio: "Curious CS student exploring full-stack development and machine learning." });
  const save = () => { updateUser({ name: form.name, email: form.email }); showToast("success", "Profile updated successfully!"); };

  return (
    <div style={{ padding: 24 }}>
      <SectionTitle eyebrow="Account" title="Profile settings" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }} className="asc-grid-stack">
        <Card style={{ padding: 24, textAlign: "center" }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: C.amber, color: "#fff", fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{form.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 2px" }}>{form.name}</h3>
          <div style={{ fontSize: 12.5, color: C.slate, marginBottom: 16 }}>{form.email}</div>
          <Pill tone="green">Active learner</Pill>
          <div style={{ marginTop: 20, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${C.border}` }}><span style={{ fontSize: 12, color: C.slate }}>Theme</span><ThemeToggle theme={theme} setTheme={setTheme} /></div>
          </div>
        </Card>
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Personal information</h3>
          <div style={{ display: "flex", gap: 12 }}><Field label="Full name"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field><Field label="Email"><input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field></div>
          <div style={{ display: "flex", gap: 12 }}><Field label="Program"><input style={inputStyle} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} /></Field><Field label="Graduation year"><input style={inputStyle} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></Field></div>
          <Field label="Bio"><textarea style={{ ...inputStyle, minHeight: 70 }} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Field>
          <Button variant="amber" icon={Save} onClick={save}>Save changes</Button>
        </Card>
      </div>
    </div>
  );
}
