import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "./Register.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    try {
      await register(form.name, form.email, form.password);
      setMsg("Account created. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="auth-page container">
        <div className="card auth-card">
          <h2>Create account</h2>
          <p className="muted">Start managing your tasks in minutes</p>

          {msg && <div className="success">{msg}</div>}
          {error && <div className="alert">{error}</div>}

          <form onSubmit={onSubmit} className="form">
            <label>
              <span>Name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={onChange}
                type="text"
                placeholder="Full name"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                required
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                required
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
                placeholder="At least 6 characters"
              />
            </label>

            <div className="form-actions">
              <button className="btn primary" disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </button>
              <button
                type="button"
                className="btn outline"
                onClick={() => navigate("/login")}
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}