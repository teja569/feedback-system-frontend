import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import PeerFeedbackForm from "../PeerFeedbackForm";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeDashboard({ employeeId }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [peerFeedbacks, setPeerFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const [managerRes, peerRes] = await Promise.all([
          axios.get(`https://feedback-system-backend-9djn.onrender.com/feedback/${employeeId}`),
          axios.get(`https://feedback-system-backend-9djn.onrender.com/peer-feedback/${employeeId}`),
        ]);

        setFeedbackList(managerRes.data.reverse());
        setPeerFeedbacks(peerRes.data.reverse());
      } catch (err) {
        console.error("Failed to load feedback", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [employeeId]);

  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  feedbackList.forEach((fb) => {
    if (fb.sentiment in sentimentCounts) {
      sentimentCounts[fb.sentiment]++;
    }
  });

  const totalSentiment = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment",
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#27ae60", "#f1c40f", "#e74c3c"],
        borderColor: ["#219150", "#d4af0c", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  const handleAcknowledge = async (feedbackId) => {
    try {
      await axios.put(
        `https://feedback-system-backend-9djn.onrender.com/feedback/acknowledge/${feedbackId}`
      );
      const updated = feedbackList.map((fb) =>
        fb.id === feedbackId ? { ...fb, acknowledged: true } : fb
      );
      setFeedbackList(updated);
    } catch (err) {
      alert("Failed to acknowledge");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>🔄 Loading dashboard...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎯 Employee Dashboard</h2>

      {totalSentiment > 0 && (
        <div style={styles.chartSection}>
          <h3>📊 Sentiment Summary</h3>
          <div style={styles.chartWrapper}>
            <Doughnut data={data} />
          </div>
        </div>
      )}

      <h3 style={styles.subheading}>📥 Feedback from Manager</h3>
      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbackList.map((fb) => (
          <div
            key={fb.id}
            style={{
              ...styles.feedbackCard,
              backgroundColor:
                fb.sentiment === "positive"
                  ? "#e8f8f5"
                  : fb.sentiment === "neutral"
                  ? "#fcf3cf"
                  : "#f9ebea",
            }}
          >
            <p><strong>Strengths:</strong> {fb.strengths}</p>
            <p><strong>Improvements:</strong> {fb.improvements}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
            <p style={styles.timestamp}>
              <em>Received on:</em> {new Date(fb.created_at).toLocaleString()}
            </p>
            {!fb.acknowledged ? (
              <button
                style={styles.ackBtn}
                onClick={() => handleAcknowledge(fb.id)}
              >
                ✅ Mark as Read
              </button>
            ) : (
              <p style={styles.acknowledged}>✔ Acknowledged</p>
            )}
          </div>
        ))
      )}

      <h3 style={styles.subheading}>🧑‍🤝‍🧑 Peer Feedback</h3>
      {peerFeedbacks.length === 0 ? (
        <p>No peer feedback yet.</p>
      ) : (
        peerFeedbacks.map((pf) => (
          <div key={pf.id} style={{ ...styles.feedbackCard, backgroundColor: "#f4f6f7" }}>
            <p><strong>Message:</strong> {pf.message}</p>
            <p>
              <strong>From:</strong>{" "}
              {pf.anonymous ? "Anonymous" : `User ID ${pf.sender_id}`}
            </p>
            <p style={styles.timestamp}>
              <em>Sent on:</em> {new Date(pf.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <div style={styles.peerSection}>
        <h3>📤 Send Feedback to Peer</h3>
        <PeerFeedbackForm senderId={employeeId} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    color: "#2c3e50",
    marginBottom: "25px",
  },
  subheading: {
    marginTop: "40px",
    marginBottom: "20px",
    color: "#34495e",
  },
  chartSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  chartWrapper: {
    maxWidth: "300px",
    margin: "20px auto",
  },
  feedbackCard: {
    border: "1px solid #dcdcdc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  timestamp: {
    fontSize: "0.9em",
    color: "#7f8c8d",
    marginTop: "10px",
  },
  ackBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  acknowledged: {
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
  },
  peerSection: {
    marginTop: "50px",
    paddingTop: "25px",
    borderTop: "2px solid #ecf0f1",
  },
};

export default EmployeeDashboard;
