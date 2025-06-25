import React, { useEffect, useState } from "react";
import axios from "axios";

function PeerFeedbackForm({ senderId }) {
  const [employees, setEmployees] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState("");
  const [statusVisible, setStatusVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://feedback-system-backend-9djn.onrender.com/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://feedback-system-backend-9djn.onrender.com/peer-feedback", {
        sender_id: senderId,
        receiver_id: receiverId,
        message,
        anonymous,
      });
      setStatus("✅ Feedback submitted successfully!");
      setReceiverId("");
      setMessage("");
      setAnonymous(false);
    } catch {
      setStatus("❌ Failed to send feedback.");
    }
  };

  useEffect(() => {
    if (status) {
      setStatusVisible(true);
      const timer = setTimeout(() => {
        setStatusVisible(false);
        setTimeout(() => setStatus(""), 500); // Let animation complete before clearing
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🤝 Send Peer Feedback</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>To</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">-- Select Peer --</option>
          {employees
            .filter((emp) => emp.id !== senderId)
            .map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.username} (ID: {emp.id})
              </option>
            ))}
        </select>

        <label style={styles.label}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Write your feedback..."
          style={styles.textarea}
        />

        <div style={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label htmlFor="anonymous" style={styles.checkboxLabel}>
            Send anonymously
          </label>
        </div>

        <button type="submit" style={styles.button}>
          🚀 Submit Feedback
        </button>

        {status && (
          <p
            style={{
              ...styles.status,
              opacity: statusVisible ? 1 : 0,
              transform: statusVisible ? "translateY(0px)" : "translateY(-10px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.5rem",
    color: "#2c3e50",
    marginBottom: "20px",
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "600",
    color: "#34495e",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    backgroundColor: "#fff",
    transition: "border-color 0.3s ease",
  },
  textarea: {
    width: "100%",
    height: "90px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    backgroundColor: "#fff",
    resize: "vertical",
    fontFamily: "Segoe UI, sans-serif",
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "5px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#555",
    userSelect: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  status: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "15px",
    color: "#2ecc71",
  },
};

export default PeerFeedbackForm;
