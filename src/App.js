import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole("");
    setUserId(null);
    navigate("/");
  };
  

  const styles = {
    wrapper: {
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(135deg, #f6f9fc, #ddeaf6)",
      minHeight: "100vh",
      padding: "5vw 3vw",
      color: "#333",
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
    },
    link: {
      marginTop: "25px",
      fontSize: "1rem",
    },
    switchBtn: {
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 18px",
      fontSize: "15px",
      marginTop: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s",
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
  };

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
                  navigate("/");
                }}
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
