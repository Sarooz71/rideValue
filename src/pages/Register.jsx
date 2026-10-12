import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Info.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "User" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!form.email.includes("@")) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const res = register(form);
    if (!res.ok) return setError(res.error);
    navigate("/profile", { replace: true });
  };

  return (
    <div className="auth">
      <div className="auth__card card">
        <h1>Create your account</h1>
        <p className="auth__sub">Save bikes and keep track of your valuations.</p>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert--error" role="alert">{error}</div>}
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" className="input" autoComplete="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" autoComplete="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="input" autoComplete="new-password" value={form.password} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="role">I want to</label>
            <select id="role" name="role" className="input" value={form.role} onChange={handleChange}>
              <option value="User">Check bike values and buy</option>
              <option value="Seller">Sell my bike</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create account</button>
        </form>

        <p className="auth__switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth__demo">Demo signup only. Passwords are not stored.</p>
      </div>
    </div>
  );
}

export default Register;
