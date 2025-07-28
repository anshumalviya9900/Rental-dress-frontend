import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
  axios.get(`${baseUrl}/user/current-user`, { withCredentials: true })
    .then((res) => {
      console.log("User Info:", res.data); 
      console.log("User Info:", res.data.role); 
      setIsLoggedIn(true);
      setUserName(res.data.name);
      setUserRole(res.data.role);
    })
    .catch((err) => {
      console.error("User not logged in", err);
      setIsLoggedIn(false);
    });
}, []);

  const handleLogout = async () => {
    await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
    setIsLoggedIn(false);
    navigate("/"); 
  };

  
  const goToTraditional = () => navigate("/category/Traditional");
  const goToWestern = () => navigate("/category/Western");
  const goToIndoWestern = () => navigate("/category/Indo-Western");
  const goToMens = () => navigate("/category/Mens-Collection");

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "12px",
          padding: "6px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1001,
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>🌐 INDORE</span>
          <span onClick={() => navigate("/contact-us")} style={{ cursor: "pointer" }}>
            📞 SUPPORT (10AM - 7PM)
          </span>
           <span onClick={() => navigate("/our-store")} style={{ cursor: "pointer" }}>
            OUR STORES
          </span>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
         
          {!isLoggedIn ? (
            <>
              <span onClick={() => navigate("/sign-in")} style={{ cursor: "pointer" }}>
                SIGN IN
              </span>
              <span onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}>
                REGISTER
              </span>
            </>
          ) : (
            <>
              <span>👤 {userName}</span>
              <span onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
                LOGOUT
              </span>
            </>
          )}

          <span onClick={() => navigate("/my-account")} style={{ cursor: "pointer" }}>
            ACCOUNT
          </span>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "30px",
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 30px",
          borderBottom: "1px solid #eee",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            letterSpacing: "2px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <span style={{ fontSize: "28px", transform: "rotate(-90deg)" }}>V</span>
          <span>VASTRAA</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <div onClick={goToWestern}>Western</div>
          <div onClick={goToTraditional}>Traditional</div>
          <div onClick={goToIndoWestern}>Indo-Western</div>
          <div onClick={goToMens}>Men's Collection</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          <span onClick={() => navigate("/wishlist")}>♡</span>
          <span onClick={() => navigate("/user/cart")}>
            🛍️
          </span>
          <span onClick={() => navigate("/search")}>🔍</span>
        </div>
      </div>

      <div style={{ marginTop: "110px" }}></div>
    </div>
  );
};

export default NavBar;
