import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const DonateForm = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [donations, setDonations] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const res = await axios.get(`${baseUrl}/dress/my-donations`, {
        withCredentials: true,
      });
      setDonations(res.data.donations || []);
    } catch (err) {
      console.error("Error fetching donations:", err);
      toast.error("Failed to fetch donations");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setImages([...files]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post(`${baseUrl}/dress/donate`, formData, {
        withCredentials: true,
      });
      toast.success("🎉 Dress Donated Successfully!");
      setForm({ name: "", description: "" });
      setImages([]);
      fetchMyDonations();
    } catch (err) {
      console.error(err);
      toast.error("Login required or donation failed!");
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={1000} />
      <div style={mainpage}>
        <div style={containerStyle}>
          <h2 style={headingStyle}>Donate Dress</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="name"
              placeholder="Dress Name"
              onChange={handleChange}
              value={form.name}
              required
              style={formInputStyle}
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={form.description}
              required
              style={textareaStyle}
            />
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              required
              style={formInputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1c1c1c")}
            >
              Donate Now
            </button>
          </form>

          <h3 style={donationsHeadingStyle}>Your Donations</h3>
          {donations.length === 0 ? (
            <p>No donations yet.</p>
          ) : (
            <div style={cardGridStyle}>
              {donations.map((dress) => (
                <div key={dress._id} style={cardStyle}>
                  {dress.image && (
                    <img
                      src={`${baseUrl}/uploads/${dress.image}`}
                      alt={dress.name}
                      style={{
                        width: "200px",
                        height: "270px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <strong>{dress.name}</strong>
                  <p>{dress.description}</p>
                  <em>Status:</em>{" "}
                  <span
                    style={dress.isApproved ? statusApprovedStyle : statusPendingStyle}
                  >
                    {dress.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mainpage = {
  background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  marginTop: "-15px",

};

const containerStyle = {
  maxWidth: "800px",
  // margin: "40px auto",
  // padding: "20px",
 marginLeft:"350px",
  borderRadius: "10px",
  fontFamily: "Arial, sans-serif",
};

const headingStyle = {
  textAlign: "center",
  color: "#444",
  
};

const formInputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...formInputStyle,
  resize: "vertical",
  minHeight: "80px",
};

const buttonStyle = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: "12px 25px",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  width: "100%",
};

const donationsHeadingStyle = {
  marginTop: "30px",
  color: "#444",
};

const statusApprovedStyle = {
  color: "green",
  fontWeight: "bold",
};

const statusPendingStyle = {
  color: "orange",
  fontWeight: "bold",
};

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "20px",
  marginTop: "30px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default DonateForm;
