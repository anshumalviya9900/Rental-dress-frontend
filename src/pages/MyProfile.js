import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../Config"; 

const baseUrl = BASE_URL;
const UserProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    setLoading(true);
    setError("");
    setMessage("");

    axios
      .get(`${baseUrl}/userprofile/fetch/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.profile);
        setLoading(false);
      })
      .catch((err) => {
        console.error(" Error fetching profile:", err);
        setError(err.response?.data?.error || "Something went wrong");
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/userprofile/delete`, {
        withCredentials: true,
      });
      setMessage(" Profile deleted successfully!");
      setProfile(null);
    } catch (err) {
      console.error(" Error deleting profile:", err);
      setError(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Your Profile</h2>

        {loading && <p style={styles.loading}>Loading profile...</p>}
        {error && <p style={styles.error}> {error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        {!loading && !error && profile && (
          <div style={styles.details}>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Email:</strong> {profile.email}</p>

            {profile.profilepicture && (
              <img
                src={`${baseUrl}${profile.profilepicture}`}
                alt="Profile"
                style={styles.image}
              />
            )}

            <button onClick={handleDelete} style={styles.deleteBtn}>Delete Profile</button>
          </div>
        )}

        {!loading && !error && !profile && !message && (
          <p style={{ textAlign: "center", color: "#777" }}>No profile found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    fontFamily: "'Segoe UI', sans-serif",
   
    minHeight: "100vh",
  },
  card: {
  marginTop:"-80px",
    padding: "40px",
    borderRadius: "20px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    border: "1px solid #eee",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "25px",
    textAlign: "center",
    color: "#222",
  },
  loading: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
  },
  error: {
    color: "red",
    fontWeight: "500",
    textAlign: "center",
  },
  success: {
    color: "green",
    fontWeight: "500",
    textAlign: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "16px",
    color: "#333",
  },
  image: {
    width: "140px",
    height: "140px",
    borderRadius: "12px",
    objectFit: "cover",
    marginTop: "10px",
    border: "1px solid #ccc",
  },
  deleteBtn: {
    marginTop: "20px",
    padding: "10px 16px",
    backgroundColor: "transparent",
    border: "1px solid #952851",
    color: "#952851",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default UserProfileView;
