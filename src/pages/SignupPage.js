import React, { useState } from "react";
import axios from "axios";

function SignupPage({ onSignupSuccess, goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      form.append("role", role);

      const res = await axios.post(
        "https://feedback-system-backend-9djn.onrender.com/signup",
        form
      );

      if (res.data.role) {
        setMessage("✅ Account created successfully!");
        setIsSuccess(true);
        onSignupSuccess?.(res.data);
      } else {
        setMessage("❌ " + res.data.error);
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📝 Create Account</h2>
      <form onSubmit={handleSubmit}>
  <label htmlFor="username" style={{ display: "none" }}>Username</label>
  <input
    style={styles.input}
    id="username"
    name="username"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
    autoComplete="username"
  />

  <label htmlFor="password" style={{ display: "none" }}>Password</label>
  <input
    style={styles.input}
    id="password"
    name="password"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    autoComplete="new-password"
  />

  <label htmlFor="role" style={{ display: "none" }}>Role</label>
  <select
    id="role"
    style={styles.select}
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <option value="employee">Employee</option>
    <option value="manager">Manager</option>
  </select>

  <button style={styles.button} type="submit" disabled={loading}>
    {loading ? "Creating..." : "Sign Up"}
  </button>
</form>


      {message && (
        <p style={{ ...styles.message, color: isSuccess ? "green" : "red" }}>
          {message}
        </p>
      )}

      <p style={styles.link}>
        Already have an account?{" "}
        <button style={styles.switchBtn} onClick={goToLogin}>
          Switch to Login
        </button>
      </p>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    marginBottom: "25px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  link: {
    marginTop: "20px",
    fontSize: "1rem",
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    fontSize: "1rem",
  },
};

export default SignupPage;
