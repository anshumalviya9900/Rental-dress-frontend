import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis from "../Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Config";
const baseUrl = config.BASE_URL;
const AdminSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch(`${baseUrl}/admin/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.user?.role === "admin") {
      console.log("Logged in admin data:", data);

      toast.success("Admin Login Success");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } else {
      setError(data.message || "Not authorized as admin");
      toast.error(data.message || "Not authorized as admin");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div style={styles.mainpage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.container}>
        <h2>Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button style={styles.button}>Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  mainpage: {
    marginTop: "-20px",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    height: "800px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    marginTop: "15px",
    fontSize: "18px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default AdminSignIn;
