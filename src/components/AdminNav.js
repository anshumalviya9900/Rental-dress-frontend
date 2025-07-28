import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Admin Panel</h2>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => handleNavigation("/admin/dashboard")}>Home</button>
          <button style={styles.navButton} onClick={() => handleNavigation("/admin/category")}>Category</button>
          <button style={styles.navButton} onClick={() => handleNavigation("/all-products")}>All Products</button>
          <button style={styles.navButton} onClick={() => handleNavigation("/pending-donation")}>Pending Donations</button>
          <button style={styles.navButton} onClick={() => handleNavigation("/alldonation")}>All Donations</button>
          <button style={styles.logoutButton} onClick={() => handleNavigation("/user-logout")}>Logout</button>
        </div>
      </nav>
    </>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "rgb(150, 89, 20)",
    fontFamily: "'Segoe UI', sans-serif",
    letterSpacing: "1px",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navButton: {
    padding: "10px 18px",
    fontSize: "14px",
    backgroundColor: "rgba(138, 85, 29, 0.71)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },
  logoutButton: {
    padding: "10px 18px",
    fontSize: "14px",
    backgroundColor: "rgb(95, 57, 14)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};

export default AdminNav;
