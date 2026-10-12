import { useState } from "react";
import { AuthContext } from "./authContext";
import {
  getUsers,
  setUsers,
  getSession,
  setSession,
  clearSession,
} from "../services/storage";

// TEMPORARY, frontend-only auth. It never stores passwords.
// It will be replaced by real JWT authentication from the Express API.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);

  const register = ({ name, email, role }) => {
    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = { name: name.trim(), email: cleanEmail, role, joinedAt: new Date().toISOString() };
    setUsers([...users, newUser]);
    setSession(newUser);
    setUser(newUser);
    return { ok: true };
  };

  const login = ({ email }) => {
    const found = getUsers().find((u) => u.email === email.trim().toLowerCase());
    if (!found) {
      return { ok: false, error: "No account found with this email. Please register first." };
    }
    setSession(found);
    setUser(found);
    return { ok: true };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
