import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { C, inputStyle } from "../utils/theme";
import { useAuth } from "../hooks/useAuth";
import { useData } from "../hooks/useData";
import { useToast } from "../hooks/useToast";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, registerStudent, emailExists, resetPassword } = useAuth();
  const { resetForNewStudent } = useData();
  const { showToast } = useToast();

  const [role, setRole] = useState("student");
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [forgotStep, setForgotStep] = useState("email"); // email | reset | done
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  /* Login is entirely credential-driven: the Student/Admin toggle only
     affects copy and whether Registration is available — it never decides
     which account you're signed into. The matched user record's own `role`
     is what determines redirect + dashboard, always. */
  const submitLogin = () => {
    if (!form.email.trim() || !form.password) { setError("Enter your email and password to sign in."); return; }
    const result = login(form.email, form.password);
    if (!result.ok) { setError(result.error); return; }
    setError("");
    showToast("success", `Welcome, ${result.name}!`);
    navigate(result.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
  };
  const submitRegister = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) { setError("Please fill in your name, email and password."); return; }
    if (form.password.length < 6) { setError("Password should be at least 6 characters."); return; }
    if (form.confirm && form.confirm !== form.password) { setError("Passwords don't match."); return; }
    const result = registerStudent(form.name, form.email, form.password);
    if (!result.ok) { setError(result.error); return; }
    setError("");
    resetForNewStudent(form.name, form.email);
    showToast("success", "Account created! Signing you in…");
    navigate(result.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
  };
  const submitForgotEmail = () => {
    if (!form.email.trim()) { setError("Enter the email associated with your account."); return; }
    if (!emailExists(form.email)) { setError("No account found for this email."); return; }
    setError("");
    setForgotStep("reset");
  };
  const submitNewPassword = () => {
    if (!newPassword || newPassword.length < 6) { setError("New password should be at least 6 characters."); return; }
    if (newPassword !== confirmNewPassword) { setError("Passwords don't match."); return; }
    const result = resetPassword(form.email, newPassword);
    if (!result.ok) { setError(result.error); return; }
    setError("");
    setForgotStep("done");
  };
  const resetForgotFlow = () => { setMode("login"); setForgotStep("email"); setNewPassword(""); setConfirmNewPassword(""); setError(""); };

  return (
    <div className="asc-root asc-fade" data-theme="light" style={{ minHeight: "100vh", display: "flex", background: C.paper }}>
      <div style={{ flex: 1, background: "#0D1B2E", color: "#fff", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }} className="asc-hide-sm">
        <Logo dark />
        <div style={{ maxWidth: 420, zIndex: 2 }}>
          <div className="asc-mono" style={{ fontSize: 12, color: "#DB9A16", letterSpacing: 1.5, marginBottom: 14 }}>LEARN · PREPARE · ASCEND</div>
          <h1 className="asc-display" style={{ fontSize: 36, lineHeight: 1.15, fontWeight: 600, margin: 0 }}>Your learning, your career — one connected trajectory.</h1>
          <p style={{ color: "#B7C2D4", fontSize: 14.5, marginTop: 16, lineHeight: 1.7 }}>Courses, an AI tutor, resume tools, interview practice, career guidance and real job listings — all in one portal.</p>
        </div>
        <div style={{ display: "flex", gap: 28, zIndex: 2 }}>
          <div><div className="asc-display" style={{ fontSize: 22, fontWeight: 600 }}>16</div><div style={{ fontSize: 12, color: "#8FA0B8" }}>Courses</div></div>
          <div><div className="asc-display" style={{ fontSize: 22, fontWeight: 600 }}>4.8k</div><div style={{ fontSize: 12, color: "#8FA0B8" }}>Learners</div></div>
          <div><div className="asc-display" style={{ fontSize: 22, fontWeight: 600 }}>310</div><div style={{ fontSize: 12, color: "#8FA0B8" }}>Hiring partners</div></div>
        </div>
        <svg style={{ position: "absolute", bottom: -20, right: -20, opacity: 0.5 }} width="260" height="260" viewBox="0 0 260 260">
          <path d="M0 230 L60 180 L110 205 L160 120 L200 140 L260 40" stroke="#DB9A16" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div className="asc-scroll" style={{ width: "100%", maxWidth: 380, maxHeight: "94vh", overflowY: "auto", padding: "4px 2px" }}>
          <div className="asc-hide-lg" style={{ marginBottom: 24 }}><Logo /></div>

          {mode !== "forgot" && (
            <div style={{ display: "flex", gap: 6, background: "#EDECE3", padding: 4, borderRadius: 10, marginBottom: 20 }}>
              {["student", "admin"].map((r) => (
                <button key={r} onClick={() => { setRole(r); setError(""); }} className="asc-btn"
                  style={{ flex: 1, padding: "9px 0", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 13, background: role === r ? "#fff" : "transparent", color: role === r ? "#12203A" : "#667085", boxShadow: role === r ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                  {r === "student" ? "Student" : "Admin"}
                </button>
              ))}
            </div>
          )}

          {mode !== "forgot" && (
            <div style={{ display: "flex", gap: 6, background: "#EDECE3", padding: 4, borderRadius: 10, marginBottom: 24 }}>
              {["login", "register"].map((m) => (
                <button key={m} onClick={() => { setMode(m); setError(""); }} disabled={m === "register" && role === "admin"} className="asc-btn"
                  style={{ flex: 1, padding: "9px 0", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 13, opacity: m === "register" && role === "admin" ? 0.4 : 1, background: mode === m ? "#fff" : "transparent", color: mode === m ? "#12203A" : "#667085", boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                  {m === "login" ? "Login" : "Registration"}
                </button>
              ))}
            </div>
          )}

          {mode === "forgot" ? (
            forgotStep === "done" ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#E3F1E8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><CheckCircle2 size={24} color="#2F7D5A" /></div>
                <h2 className="asc-display" style={{ fontSize: 21, fontWeight: 600, marginBottom: 6 }}>Password updated</h2>
                <p style={{ fontSize: 13, color: "#667085", marginBottom: 20 }}>Your password has been reset. Sign in with your new password.</p>
                <Button variant="ghost" style={{ width: "100%", justifyContent: "center" }} onClick={resetForgotFlow}>Back to sign in</Button>
              </div>
            ) : forgotStep === "reset" ? (
              <>
                <h2 className="asc-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Set a new password</h2>
                <p style={{ fontSize: 13, color: "#667085", marginBottom: 20 }}>Choose a new password for {form.email}.</p>
                <Field label="New password">
                  <div style={{ position: "relative" }}>
                    <Lock size={15} style={{ position: "absolute", left: 12, top: 12, color: "#667085" }} />
                    <input type={showPw ? "text" : "password"} style={{ ...inputStyle, paddingLeft: 34, paddingRight: 34, background: "#FCFBF8" }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
                    <button onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: "#667085" }}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>
                </Field>
                <Field label="Confirm new password" error={error}>
                  <input type={showPw ? "text" : "password"} style={{ ...inputStyle, background: "#FCFBF8" }} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="••••••••" />
                </Field>
                <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={submitNewPassword}>Reset password <ArrowRight size={15} /></Button>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button onClick={resetForgotFlow} style={{ background: "none", border: "none", color: "#9C6B0B", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Back to sign in</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="asc-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Reset your password</h2>
                <p style={{ fontSize: 13, color: "#667085", marginBottom: 20 }}>Enter the email on your account to reset your password.</p>
                <Field label="Email address" error={error}>
                  <div style={{ position: "relative" }}>
                    <Mail size={15} style={{ position: "absolute", left: 12, top: 12, color: "#667085" }} />
                    <input style={{ ...inputStyle, paddingLeft: 34, background: "#FCFBF8" }} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@school.edu" />
                  </div>
                </Field>
                <Button variant="amber" style={{ width: "100%", justifyContent: "center" }} onClick={submitForgotEmail}>Continue <ArrowRight size={15} /></Button>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button onClick={resetForgotFlow} style={{ background: "none", border: "none", color: "#9C6B0B", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Back to sign in</button>
                </div>
              </>
            )
          ) : (
            <>
              <h2 className="asc-display" style={{ fontSize: 23, fontWeight: 600, marginBottom: 4 }}>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
              <p style={{ fontSize: 13, color: "#667085", marginBottom: 20 }}>{role === "admin" ? "Administrator access to manage the portal." : mode === "login" ? "Sign in to continue your learning journey." : "Join to start learning, practicing and applying."}</p>

              {mode === "register" && (
                <Field label="Full name"><div style={{ position: "relative" }}><User size={15} style={{ position: "absolute", left: 12, top: 12, color: "#667085" }} /><input style={{ ...inputStyle, paddingLeft: 34, background: "#FCFBF8" }} placeholder="Aditi Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div></Field>
              )}
              <Field label="Email address">
                <div style={{ position: "relative" }}><Mail size={15} style={{ position: "absolute", left: 12, top: 12, color: "#667085" }} /><input style={{ ...inputStyle, paddingLeft: 34, background: "#FCFBF8" }} placeholder={role === "admin" ? "admin@ascent.edu" : "you@school.edu"} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              </Field>
              <Field label="Password">
                <div style={{ position: "relative" }}>
                  <Lock size={15} style={{ position: "absolute", left: 12, top: 12, color: "#667085" }} />
                  <input type={showPw ? "text" : "password"} style={{ ...inputStyle, paddingLeft: 34, paddingRight: 34, background: "#FCFBF8" }} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <button onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: "#667085" }}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
              </Field>
              {mode === "register" && <Field label="Confirm password"><input type={showPw ? "text" : "password"} style={{ ...inputStyle, background: "#FCFBF8" }} placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} /></Field>}

              {mode === "login" && (
                <div style={{ textAlign: "right", marginBottom: 14, marginTop: -6 }}>
                  <button onClick={() => { setMode("forgot"); setForgotStep("email"); setError(""); }} style={{ background: "none", border: "none", color: "#9C6B0B", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Forgot password?</button>
                </div>
              )}

              {error && <div role="alert" style={{ display: "flex", gap: 7, alignItems: "flex-start", background: "#FAE7E3", color: "#B84A38", padding: "9px 12px", borderRadius: 8, fontSize: 12.5, marginBottom: 14 }}><AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />{error}</div>}

              <Button variant={role === "admin" ? "primary" : "amber"} style={{ width: "100%", justifyContent: "center", padding: "11px 0", marginTop: 6 }} onClick={mode === "login" ? submitLogin : submitRegister}>
                {mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={15} />
              </Button>

              <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#667085" }}>
                {mode === "login" ? "New here?" : "Already registered?"}{" "}
                <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} style={{ background: "none", border: "none", color: "#9C6B0B", fontWeight: 600, cursor: "pointer" }}>{mode === "login" ? "Create an account" : "Sign in instead"}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
