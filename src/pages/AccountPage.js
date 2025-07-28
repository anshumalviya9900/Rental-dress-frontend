import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistPage from "./WishList";
import CartPage from "./CartPage";
import NavBar from "./NavBar";
import UserProfileView from "./MyProfile";
import EditProfileForm from "./EditProfile";
import OrderHistory from "./OrderHistory";
import { useNavigate } from "react-router-dom";
import Apis from "../Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
export default function AccountPage() {
  const [view, setView] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/userprofile/fetch/me`, {
          withCredentials: true,
        });
        setProfile(data.profile);
      } catch (err) {
        console.error(" profile fetch", err.response?.data || err.message);
        toast.error(" Failed to fetch user profile");
      }
    })();
  }, []);

  async function handleLogout() {
    try {
      await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
      window.location.href = "/";
    } catch (err) {
      console.error(" logout", err.response?.data || err.message);
      toast.error(" Logout failed");
    }
  }

  function renderView() {
    switch (view) {
      case "profile":
        return <div style={{marginTop:"40px"}}><UserProfileView /></div>;
      case "create":
        return <div style={{marginTop:"40px"}}><EditProfileForm /></div>;
      case "orders":
        return <OrderHistory />;
      case "wishlist":
        return <div style={{marginTop:"-100px", marginRight:"-40px"}}><WishlistPage /></div>;
      case "cart":
        return <div style={{marginTop:"-130px", marginRight:"-30px",marginLeft:"-30px", width:"1300px",height:"auto"}}><CartPage /></div>;
      default:
        return <h2 style={{marginTop:"30px"}}>Welcome to your dashboard!</h2>;
    }
  }

  const avatarSrc = profile?.profilepicture
    ? `${baseUrl}${profile.profilepicture}`
    : "https://via.placeholder.com/100";

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.page}>
        <aside style={styles.sidebar}>
          <header style={styles.profile}>
            <img src={avatarSrc} style={styles.avatar} alt="profile" />
            <h3>{profile?.name || "User"}</h3>
          </header>

          <nav>
            <ul style={styles.navList}>
              <li onClick={() => setView("profile")}  >My Profile</li>
              <li onClick={() => setView("create")}>Update Profile</li>
              <li onClick={() => setView("orders")}>My Orders</li>
              <li onClick={() => setView("wishlist")}>My Favourites</li>
              <li onClick={() => setView("cart")}>My Cart</li>
              <li style={{ color: "red" }} onClick={handleLogout}>
                Sign Out
              </li>
            </ul>
          </nav>
        </aside>

        <main style={styles.content}>{renderView()}</main>
      </div>
    </>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
   
  },
  sidebar: {
    width: "250px",
    background: "rgba(24, 58, 208, 0.14)",
    borderRight: "1px solid #ddd",
    padding: "20px",
    boxShadow: "2px 0 8px rgba(24, 58, 208, 0.2)",
    position: "fixed",
    top: "94px",
    left: 0,
    bottom: 0,
  },
  profile: {
    textAlign: "center",
    marginBottom: "30px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    border: "2px solid #952851",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    cursor: "pointer",
  },
  content: {
    marginLeft: "250px",
    marginTop: "-60px",
    padding: "30px",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
  },
};
