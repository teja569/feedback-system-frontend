import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import FeedbackList from "../FeedbackList";
import axios from "axios";

function ManagerDashboard({ managerId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const handleLogout = () => {
  localStorage.clear(); // or any auth cleanup logic
  window.location.href = "/login"; // redirect to login page
};

  useEffect(() => {
    axios
      .get("http://localhost:8000/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👨‍💼 Manager Dashboard</h2>

      <div style={styles.card}>
        <h3 style={styles.subheading}>📝 Submit Feedback</h3>
        <FeedbackForm managerId={managerId} />
      </div>

      <div style={styles.card}>
        <h3 style={styles.subheading}>📄 View Feedback for Team Members</h3>
        <label style={styles.label}>Select an Employee:</label>
        <div style={styles.dropdownWrapper}>
          <select
            style={styles.select}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.username} (ID: {emp.id})
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <div style={styles.feedbackList}>
            <FeedbackList employeeId={selectedId} isManager={true} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "950px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#2c3e50",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#34495e",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    padding: "30px",
    marginBottom: "35px",
    border: "1px solid #e0e0e0",
  },
  subheading: {
    marginBottom: "25px",
    fontSize: "1.4rem",
    color: "#333",
    borderBottom: "2px solid #ecf0f1",
    paddingBottom: "10px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "10px",
    display: "block",
    color: "#555",
  },
  dropdownWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    outline: "none",
    appearance: "none",
    backgroundImage:
      "url('data:image/svg+xml;utf8,<svg fill=%22gray%22 height=%2220%22 viewBox=%220 0 24 24%22 width=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "16px",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04)",
  },
  feedbackList: {
    marginTop: "10px",
  },
};

export default ManagerDashboard;
