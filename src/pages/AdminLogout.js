import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${baseUrl}/admin/logout`, {}, {
          withCredentials: true,
        });

      
        localStorage.removeItem("token");

        toast.success(" Logout successful");
        setTimeout(() => {
          navigate("/");
        }, 1500); 
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error(" Logout failed");
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <p>Logging out...</p>
    </>
  );
};

export default AdminLogout;
