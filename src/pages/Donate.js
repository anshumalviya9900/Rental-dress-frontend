import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DressDonationSection = () => {
  const navigate = useNavigate();

  return (
    <div style={mainContainer}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div style={leftSection}>
        <div style={imageWrapper}>
          <img src="/Donate1.jpg" alt="Sequin Dress" style={dressImage} />
          <button onClick={() => navigate("/all-donation")} style={collectionBtn}>
            SEE THE COLLECTION →
          </button>
        </div>
      </div>

      <div style={rightSection}>
        <img src="/Donate.jpg" alt="Sketch" style={sketchImage} />
        <h2 style={heading}>
          OWN A <span style={cursive}>Designer Label?</span>
        </h2>
        <button onClick={() => navigate("/donation-form")} style={donateBtn}>
          DONATE NOW
        </button>
      </div>
    </div>
  );
};

const mainContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  background: "#f4eee7",
  width: "1320px",
  gap: "0",
  marginLeft: "100px",
  flexWrap: "wrap",
};

const leftSection = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const imageWrapper = {
  position: "relative",
  width: "100%",
  maxWidth: "700px",
};

const dressImage = {
  width: "100%",
  borderRadius: "10px",
};

const collectionBtn = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 24px",
  border: "1px solid #000",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "5px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
};

const rightSection = {
  backgroundColor: "#f6f0f2",
  padding: "30px 20px",
  width: "400px",
  height: "400px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const sketchImage = {
  height: "200px",
  width: "300px",
  marginBottom: "15px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
};

const cursive = {
  fontFamily: "cursive",
};

const donateBtn = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default DressDonationSection;
