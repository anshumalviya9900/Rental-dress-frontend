import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;

const AllDonation = () => {
  const [approvedDonations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllDonations();
  }, []);

  const fetchAllDonations = async () => {
    try {
      const res = await axios.get(`${baseUrl}/dress/all-donations`, {
        withCredentials: true,
      });
      setDonations(res.data.donations || []);
    } catch (err) {
      console.error("Error fetching all donations:", err);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNav />
      <ToastContainer position="top-center" />
      <div style={outerBackground}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "30px 20px" }}>
          <h2 style={headingStyle}>All Donations</h2>

          {loading ? (
            <p>Loading donations...</p>
          ) : approvedDonations.length === 0 ? (
            <p>No approved donations found.</p>
          ) : (
            <div style={cardContainerStyle}>
              {approvedDonations.map((dress) => (
                <div key={dress._id} style={cardStyle} className="card-hover">
                  <div style={imgWrapper}>
                    {dress.image ? (
                      <img
                        src={`${baseUrl}/uploads/${dress.image}`}
                        alt={dress.name}
                        style={imgStyle}
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/300x400?text=No+Image")
                        }
                      />
                    ) : (
                      <div style={placeholderStyle}>No Image</div>
                    )}
                  </div>
                  <div style={detailStyle}>
                    <h4 style={nameStyle}>{dress.name}</h4>
                    <p style={subNameStyle}>
                      {dress.description?.slice(0, 50) || "No description"}
                    </p>
                    <p style={statusStyle}>
                      Status: <span style={{ color: "green", fontWeight: "bold" }}>Approved</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const outerBackground = {
  background: "linear-gradient(to right, #fff8f8, rgba(20, 25, 95, 0.25))",
  minHeight: "100vh",
};

const headingStyle = {
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "30px",
  fontSize: "28px",
  fontWeight: "bold",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "40px",
};

const cardStyle = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.07)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  overflow: "hidden",
};

const imgWrapper = {
  width: "100%",
  height: "270px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8f8f8",
};

const imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "cover",
};

const placeholderStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#e1e1e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  color: "#666",
};

const detailStyle = {
  padding: "12px 15px 16px",
  fontSize: "13px",
  color: "#333",
};

const nameStyle = {
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "5px",
};

const subNameStyle = {
  fontSize: "12px",
  color: "#666",
  marginBottom: "8px",
};

const statusStyle = {
  fontSize: "13px",
  color: "#333",
};

const style = document.createElement("style");
style.innerHTML = `
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(style);

export default AllDonation;
