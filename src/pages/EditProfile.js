import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    email: "",
    profilepicture: "",
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/userprofile/fetch/me`, { withCredentials: true })
      .then((res) => setFormData(res.data.profile))
      .catch((err) => {
        console.error(" Failed to load profile:", err);
        toast.error("Failed to load profile");
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("email", formData.email);
    if (newImage) data.append("profilepicture", newImage);

    try {
      await axios.post(`${baseUrl}/userprofile/update`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(" Update error:", err);
      toast.error(" Failed to update profile!");
    }
  };

  return (
    <div style={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Your Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            style={styles.input}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            style={styles.input}
            required
          />

          <input
            type="file"
            name="profilepicture"
            onChange={handleFileChange}
            style={styles.fileInput}
          />

          {formData.profilepicture && (
            <img
              src={`baseUrl${formData.profilepicture}?t=${Date.now()}`}
              alt="Profile"
              style={styles.profileImage}
            />
          )}

          <button type="submit" style={styles.button}>Update Profile</button>
        </form>
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
    padding: "40px",
    borderRadius: "20px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    border: "1px solid #eee",
    marginTop: "-85px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "25px",
    textAlign: "center",
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  fileInput: {
    fontSize: "14px",
    padding: "5px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginTop: "10px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "10px",
    backgroundColor: "#952851",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default EditProfileForm;
