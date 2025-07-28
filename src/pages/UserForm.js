import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    email: "",
  });
  const [profilepicture, setProfilePicture] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/current-user`, { withCredentials: true })
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          email: res.data.email,
        }));
        setUserEmail(res.data.email);
      })
      .catch((err) => {
        console.error(" Error fetching user data", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilepicture) {
      alert("Please upload a profile picture.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("email", userEmail);
    data.append("profilepicture", profilepicture);

    try {
      const res = await axios.post(`${baseUrl}/userprofile/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Profile created!");
      console.log(res.data);
    } catch (err) {
      console.error(" Profile creation failed:", err);
      alert(err.response?.data?.error || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
      <h2 style={styles.heading}>Create Your Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <select name="gender" value={formData.gender} onChange={handleChange} required style={styles.input}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        name="address"
        placeholder="Enter address"
        value={formData.address}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        disabled
        style={styles.input}
      />

      <input
        type="file"
        name="profilepicture"
        accept="image/*"
        onChange={handleFileChange}
        required
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default UserProfileForm;
