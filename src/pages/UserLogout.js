import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${baseUrl}/user/logout`, {}, {
          withCredentials: true,
        });

        localStorage.removeItem("token");

        alert("Logout successful");
        navigate("/"); 
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed");
      }
    };

    logoutUser();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default UserLogout;
