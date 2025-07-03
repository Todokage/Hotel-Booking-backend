import React, { useState } from "react";
import axios from "axios";
//import "../styles/Auth.css"; // your updated CSS

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register") {
      try {
        await axios.post("http://localhost:5000/api/auth/register", formData);
        alert("Registration successful! Please log in.");
        setMode("login");
        setFormData({ name: "", email: "", password: "" });
      } catch {
        alert("Registration failed");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        onLogin(res.data.user);
      } catch {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="auth-overlay" role="dialog" aria-modal="true">
      <section className="auth-modal" aria-labelledby="authTitle">
        <nav className="auth-toggle" role="tablist" aria-label="Authentication Modes">
          <button
            role="tab"
            aria-selected={mode === "login"}
            aria-controls="loginPanel"
            id="loginTab"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            role="tab"
            aria-selected={mode === "register"}
            aria-controls="registerPanel"
            id="registerTab"
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
            type="button"
          >
            Register
          </button>
        </nav>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          id={mode === "login" ? "loginPanel" : "registerPanel"}
          aria-labelledby="authTitle"
          noValidate
        >
          <h2 id="authTitle" className="sr-only">
            {mode === "login" ? "Login to your account" : "Register a new account"}
          </h2>

          {mode === "register" && (
            <label htmlFor="nameInput" className="sr-only">
              Full Name
            </label>
          )}
          {mode === "register" && (
            <input
              id="nameInput"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              required
              autoComplete="name"
              aria-required="true"
            />
          )}

          <label htmlFor="emailInput" className="sr-only">
            Email Address
          </label>
          <input
            id="emailInput"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            autoComplete="email"
            aria-required="true"
          />

          <label htmlFor="passwordInput" className="sr-only">
            Password
          </label>
          <input
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            aria-required="true"
          />

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </section>
    </div>
  );
}
