import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
axios.defaults.withCredentials = true;
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const handleNavigation = (path) => {
    navigate(path);
  };
 useEffect(() => {
    axios.get(`${baseUrl}/admin/check-auth`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("✅ Admin Authenticated:", res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("❌ Admin Auth Failed:", err.response?.data);
      //navigate("/sign-in"); // Redirect to sign-in if not authorized
    });
  }, []);

  if (loading) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Checking admin access...</h3>;
  }


  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} />
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Admin Panel</h2>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => handleNavigation("/admin/dashboard")}>
            Home
          </button>
          <button style={styles.navButton} onClick={() => handleNavigation("/admin/category")}>
            Category
          </button>
          <button style={styles.navButton} onClick={() => navigate("/all-products")}>
            All Products
          </button>
          <button style={styles.navButton} onClick={() => navigate("/pending-donation")}>
            Pending Donations
          </button>
          <button style={styles.navButton} onClick={() => navigate("/alldonation")}>
            All Donations
          </button>
          <button style={styles.navButton} onClick={() => navigate("/admin-logout")}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.body}>
        <h3 style={styles.welcome}>Welcome, Admin!</h3>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/admin/category")}>
            Manage Categories
          </button>
          <button style={styles.button} onClick={() => navigate("/admin/products")}>
            Manage Products
          </button>
          <button style={styles.button} onClick={() => navigate("/alldonation")}>
            Donations
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundImage: `url("/adminbg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    color: "#fff",
    overflow: "auto",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "rgb(255, 254, 254)",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "24px",
    color: "rgb(96, 64, 17)",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navButton: {
    padding: "10px 16px",
    fontSize: "14px",
    backgroundColor: "rgba(123, 87, 32, 0.89)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  body: {
    textAlign: "center",
    paddingTop: "80px",
  },
  welcome: {
    fontSize: "36px",
    marginBottom: "40px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
  },
  button: {
    padding: "16px 32px",
    fontSize: "18px",
    backgroundColor: "rgba(123, 87, 32, 0.67)",
    color: "black",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default AdminDashboard;
