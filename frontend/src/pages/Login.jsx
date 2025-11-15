import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="auth-page container">
        <div className="card auth-card">
          <h2>Welcome back</h2>
          <p className="muted">Sign in to access your tasks</p>

          {error && <div className="alert">{error}</div>}

          <form onSubmit={onSubmit} className="form">
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
                placeholder="Your password"
              />
            </label>

            <div className="form-actions">
              <button className="btn primary" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <Link to="/register" className="btn outline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}