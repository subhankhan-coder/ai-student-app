import { useState } from "react";
import { Save } from "lucide-react";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { Card } from "../../components/ui/Card";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { Toggle } from "../../components/ui/Toggle";
import { C, inputStyle } from "../../utils/theme";
import { useToast } from "../../hooks/useToast";

export function AdminSettingsPage() {
  const { showToast } = useToast();
  const [notifs, setNotifs] = useState({ signups: true, quizCompletions: false, jobApplications: true });
  const [twoFactor, setTwoFactor] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const save = () => showToast("success", "Settings saved successfully!");
  return (
    <div style={{ padding: 24, maxWidth: 820 }}>
      <SectionTitle eyebrow="Configuration" title="Settings" action={<Button variant="amber" icon={Save} onClick={save}>Save changes</Button>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="asc-grid-stack">
        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Platform</h3>
          <Field label="Platform name"><input style={inputStyle} defaultValue="Ascent Learning Platform" /></Field>
          <Field label="Support email"><input style={inputStyle} defaultValue="support@ascent.edu" /></Field>
        </Card>
        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Security</h3>
          <Toggle on={twoFactor} onChange={setTwoFactor} label="Two-factor authentication" hint="Require a code for admin sign-in" />
        </Card>
        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Notifications</h3>
          <Toggle on={notifs.signups} onChange={(v) => setNotifs({ ...notifs, signups: v })} label="New student sign-ups" />
          <Toggle on={notifs.quizCompletions} onChange={(v) => setNotifs({ ...notifs, quizCompletions: v })} label="Quiz completions" />
          <Toggle on={notifs.jobApplications} onChange={(v) => setNotifs({ ...notifs, jobApplications: v })} label="Job applications" />
        </Card>
        <Card style={{ padding: 22, border: `1px solid ${C.redSoft}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: C.red }}>Danger zone</h3>
          <Toggle on={maintenance} onChange={setMaintenance} label="Maintenance mode" hint="Temporarily block student sign-in" />
        </Card>
      </div>
    </div>
  );
}
