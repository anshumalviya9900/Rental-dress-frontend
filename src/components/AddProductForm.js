import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import Apis from "../Apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {BASE_URL} from "../Config"; 


// const baseUrl = BASE_URL;
import config from "../Config";
const baseUrl = config.BASE_URL;

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    size: "",
    categoryName: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/admin/allcategory`,{
           credentials: "include",
        });
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("size", formData.size);
    data.append("categoryName", formData.categoryName);
    data.append("description", formData.description);
    image.forEach((imgFile) => {
      data.append("images", imgFile);
    });

    try {
      const response = await fetch(`${baseUrl}/admin/addproduct`, {
        credentials: "include",
        method: "POST",
        body: data,
      });

      await response.json();
      if (response.ok) {
        toast.success(" Product added successfully!");
        setFormData({
          name: "",
          price: "",
          size: "",
          categoryName: "",
          description: "",
        });
        setImage(null);
      } else {
        toast.error(" Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(" Error adding product");
    }
  };

  const mainContainer = {
    backgroundImage: `url("/adminbg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    color: "#fff",
    overflow: "auto",
  };

  const formStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    maxWidth: "500px",
    width: "100%",
    color: "#fff",
    marginLeft: "100px",
    marginTop: "20px",
    border: "1px solid rgba(255,255,255,0.3)",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    background: "#fdf5e6",
    color: "#333",
    outline: "none",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
    color: "#f8f1e3",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "rgba(246, 167, 31, 0.77)",
    color: "#333",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "25px",
    color: "#fff8dc",
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "1px",
  };

  return (
    <>
      <AdminNav />
      <ToastContainer position="top-right" autoClose={1000} />
      <div style={mainContainer}>
        <div style={formStyle}>
          <h2 style={headingStyle}> Add New Product</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label style={labelStyle}>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Red Lehenga"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Price</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 2500"
              value={formData.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Size</option>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
              <option value="XXL">Double XL (XXL)</option>
            </select>

            <label style={labelStyle}>Category</label>
            <select
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.categoryName}>
                  {cat.categoryName} ({cat.size})
                </option>
              ))}
            </select>

            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              style={{ ...inputStyle, resize: "vertical" }}
            ></textarea>

            <label style={labelStyle}>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              required
              style={{ ...inputStyle, padding: "8px", background: "#f5f5dc" }}
            />

            <button type="submit" style={buttonStyle}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
