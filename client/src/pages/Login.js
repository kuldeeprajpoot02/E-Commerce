import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("auth", JSON.stringify(data));
        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message || "Login failed. Details check karein.");
      }
    } catch (error) {
      setMessage("Server se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
        <h1>Login</h1>
        <p>Apne account mein login karein.</p>

        {message && <p role="status">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            style={inputStyle}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", marginTop: "10px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Account nahi hai? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </Layout>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  margin: "6px 0 14px",
};

export default Login;