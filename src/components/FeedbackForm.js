import React, { useEffect, useState } from "react";
import axios from "axios";

function FeedbackForm({ managerId }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [sentiment, setSentiment] = useState("positive");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://feedback-system-backend-9djn.onrender.com/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("manager_id", managerId);
    form.append("employee_id", employeeId);
    form.append("strengths", strengths);
    form.append("improvements", improvements);
    form.append("sentiment", sentiment);

    try {
      const res = await axios.post("https://feedback-system-backend-9djn.onrender.com/feedback", form);
      setMessage(res.data.message);
      setEmployeeId("");
      setStrengths("");
      setImprovements("");
      setSentiment("positive");
    } catch {
      setMessage("❌ Failed to submit feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>👤 Select Employee</label>
      <select
        style={styles.input}
        onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      >
        <option value="">-- Select --</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.username} (ID: {emp.id})
          </option>
        ))}
      </select>

      <label style={styles.label}>💪 Strengths</label>
      <textarea
        style={styles.textarea}
        placeholder="Write strengths here..."
        value={strengths}
        onChange={(e) => setStrengths(e.target.value)}
        required
      />

      <label style={styles.label}>📉 Areas to Improve</label>
      <textarea
        style={styles.textarea}
        placeholder="Write improvement suggestions here..."
        value={improvements}
        onChange={(e) => setImprovements(e.target.value)}
        required
      />

      <label style={styles.label}>🧭 Sentiment</label>
      <select
        style={styles.input}
        value={sentiment}
        onChange={(e) => setSentiment(e.target.value)}
      >
        <option value="positive">Positive</option>
        <option value="neutral">Neutral</option>
        <option value="negative">Negative</option>
      </select>

      <button type="submit" style={styles.button}>
        ✅ Submit Feedback
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    backgroundColor: "#fff",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
    height: "90px",
    backgroundColor: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "10px",
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default FeedbackForm;
