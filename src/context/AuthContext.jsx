import { createContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { uid } from "../utils/helpers";

export const AuthContext = createContext(null);

const DEFAULT_SESSION = { id: null, name: "", email: "", role: null, isAuthenticated: false };

/* Pre-created accounts so the app is immediately demoable. Admin accounts are
   never created through the registration form — only seeded here or, in a
   real backend, provisioned by the system. Registration always creates
   role: "student" users. */
const DEFAULT_USERS = [
  { id: "u_admin_1", name: "Admin", email: "admin@lms.com", password: "Admin@123", role: "admin" },
  { id: "u_student_1", name: "Gopal", email: "gopal@gmail.com", password: "Student@123", role: "student" },
];

export function AuthProvider({ children }) {
  const [session, setSession] = useLocalStorage("ascent_auth", DEFAULT_SESSION);
  const [users, setUsers] = useLocalStorage("ascent_users", DEFAULT_USERS);

  const findByEmail = useCallback((email) => users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase()), [users]);

  /* Single credential-driven login for BOTH roles. The role is read from the
     matched user record after the password checks out — never chosen by a UI
     toggle — so the caller decides where to redirect based on the returned role. */
  const login = useCallback((email, password) => {
    const found = findByEmail(email);
    if (!found) return { ok: false, error: "No account found for this email." };
    if (found.password !== password) return { ok: false, error: "Incorrect password." };
    setSession({ id: found.id, name: found.name, email: found.email, role: found.role, isAuthenticated: true });
    return { ok: true, role: found.role, name: found.name };
  }, [findByEmail, setSession]);

  const registerStudent = useCallback((name, email, password) => {
    if (findByEmail(email)) return { ok: false, error: "An account with this email already exists. Try signing in instead." };
    const newUser = { id: uid("u"), name, email, password, role: "student" };
    setUsers((u) => [...u, newUser]);
    setSession({ id: newUser.id, name: newUser.name, email: newUser.email, role: "student", isAuthenticated: true });
    return { ok: true, role: "student", name };
  }, [findByEmail, setUsers, setSession]);

  const emailExists = useCallback((email) => !!findByEmail(email), [findByEmail]);

  const resetPassword = useCallback((email, newPassword) => {
    if (!findByEmail(email)) return { ok: false, error: "No account found for this email." };
    setUsers((us) => us.map((u) => u.email.toLowerCase() === email.toLowerCase() ? { ...u, password: newPassword } : u));
    return { ok: true };
  }, [findByEmail, setUsers]);

  const logout = useCallback(() => {
    setSession(DEFAULT_SESSION);
  }, [setSession]);

  const updateUser = useCallback((partial) => {
    setSession((s) => ({ ...s, ...partial }));
    setUsers((us) => us.map((u) => u.id === session.id ? { ...u, ...partial } : u));
  }, [setSession, setUsers, session.id]);

  const value = {
    authed: session.isAuthenticated,
    role: session.role,
    user: { id: session.id, name: session.name, email: session.email },
    login, registerStudent, logout, updateUser, emailExists, resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
