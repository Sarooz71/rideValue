import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Info.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate(location.state?.from || "/profile", { replace: true });
  };

  return (
    <div className="auth">
      <div className="auth__card card">
        <h1>Welcome back</h1>
        <p className="auth__sub">Log in to see your dashboard and saved bikes.</p>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert--error" role="alert">{error}</div>}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" autoComplete="email"
              value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="input" autoComplete="current-password"
              value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Log in</button>
        </form>

        <p className="auth__switch">
          New to RideValue? <Link to="/register">Create an account</Link>
        </p>
        <p className="auth__demo">Demo login only. Real JWT authentication comes with the backend.</p>
      </div>
    </div>
  );
}

export default Login;
