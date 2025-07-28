import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Config";
const baseUrl = config.BASE_URL;
const DeleteProfileDetail = () => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${baseUrl}/profile/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(res.data.message || "Profile deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || " Failed to delete profile");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <button onClick={handleDelete}>Delete My Profile</button>
    </>
  );
};

export default DeleteProfileDetail;
