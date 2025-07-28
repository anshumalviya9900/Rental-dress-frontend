import React, { useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ContactUs = () => {
  const formRef = useRef(null);

  const handleScroll = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
    <NavBar/>
    
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
<div
  style={{
    position: "relative",
    height: "60vh",
    backgroundImage: "url('/contact.jpg')", // 🔁 Replace with your path
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop:"70px"
  }}

>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.68)", // 🖤 Transparent black
      zIndex: 1,
    }}
  />

  {/* Content */}
  <div
    style={{
      position: "relative",
      zIndex: 2,
      height: "100%",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <h1 style={{ fontSize: "42px", border: "1px solid #fff", padding: "10px 40px" }}>
      REACH US
    </h1>
    <div
      onClick={handleScroll}
      style={{
        marginTop: "30px",
        cursor: "pointer",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "2px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
      }}
    >
      ⬇
    </div>
  </div>
</div>

      {/* 📬 Contact Section */}
      <div ref={formRef} style={{ padding: "60px 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* Left Info Section */}
        <div style={{ flex: "1", minWidth: "300px", marginBottom: "30px" }}>
          <h2 style={{ color: "#8B2D36", marginBottom: "20px" }}>WE’RE ALWAYS HAPPY TO HELP</h2>
          <p>📞 +91-959-959-5513 <br /><span style={{ color: "green" }}>WhatsApp Enabled</span></p>
          <p>📧 care@vastraa.com</p>
          <p>🕒 Operations: 10AM - 7PM</p>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            {/* Social Icons (placeholder) */}
            <span>🔵</span>
            <span>🐦</span>
            <span>📸</span>
            <span>📌</span>
            <span>▶️</span>
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2 style={{ color: "#8B2D36", marginBottom: "20px" }}>GO ON, LEAVE US A MESSAGE</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", border: "none", borderBottom: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", border: "none", borderBottom: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="email"
                name="email"
                placeholder="Email (required)"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", border: "none", borderBottom: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <textarea
                name="message"
                placeholder="...have a query or a question, leave a message here and we will get back with an answer soon....."
                rows="4"
                maxLength="150"
                value={formData.message}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", border: "none", borderBottom: "1px solid #ccc", resize: "none" }}
              />
              <div style={{ textAlign: "right", fontSize: "12px" }}>
                {formData.message.length}/150
              </div>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
 </> );
};

export default ContactUs;
