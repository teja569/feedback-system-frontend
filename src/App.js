import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedId = localStorage.getItem("userId");
    if (savedRole && savedId) {
      setRole(savedRole);
      setUserId(Number(savedId));
    }
    setTimeout(() => setLoading(false), 500); // Simulate loading
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setRole("");
      setUserId(null);
      localStorage.clear();
      setLoggingOut(false);
      navigate("/");
    }, 800);
  };

  const styles = {
    wrapper: {
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(135deg, #f6f9fc, #ddeaf6)",
      minHeight: "100vh",
      padding: "5vw 3vw",
      color: "#333",
      transition: "opacity 0.4s ease",
      opacity: loggingOut ? 0.3 : 1,
    },
    card: {
      maxWidth: "500px",
      width: "100%",
      margin: "auto",
      backgroundColor: "#ffffff",
      borderRadius: "14px",
      padding: "5vw",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      textAlign: "center",
      transition: "transform 0.3s ease",
      transform: loggingOut ? "scale(0.98)" : "scale(1)",
    },
    logoutBtn: {
      marginTop: "30px",
      padding: "12px 22px",
      fontSize: "16px",
      borderRadius: "6px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    loader: {
      textAlign: "center",
      marginTop: "30vh",
      fontSize: "1.3rem",
      color: "#555",
    },
  };

  if (loading) {
    return <div style={styles.loader}>🔄 Loading app...</div>;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <Routes>
          <Route
            path="/"
            element={
              role ? (
                role === "manager" ? (
                  <>
                    <ManagerDashboard managerId={userId} />
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                      🔒 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <EmployeeDashboard employeeId={userId} />
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                      🔒 Logout
                    </button>
                  </>
                )
              ) : (
                <LoginPage
                  onLogin={(data) => {
                    setRole(data.role);
                    setUserId(data.id);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("userId", data.id);
                    navigate("/");
                  }}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                onSignupSuccess={(data) => {
                  setRole(data.role);
                  setUserId(data.id);
                  localStorage.setItem("role", data.role);
                  localStorage.setItem("userId", data.id);
                  navigate("/");
                }}
                goToLogin={() => navigate("/")}
              />
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
