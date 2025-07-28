
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;

const AdminProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/admin/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.role == "admin") {
          navigate("/admin/dashboard");
          setIsAdmin(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (!isAdmin) return <Navigate to="/sign-in" />;
  
  return children;
};

export default AdminProtectedRoute;
