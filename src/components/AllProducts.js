import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import Apis from "../Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Config";
const baseUrl = config.BASE_URL;
const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    size: "",
    categoryName: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin/allproducts`, {
        method: "GET",
        credentials: "include", 
      });

      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(" Failed to load products.");
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${baseUrl}/admin/delete-product/${productId}`, {
        method: "DELETE",
        credentials: "include", 
      });

      await res.json();
      if (res.ok) {
        toast.success(" Product deleted successfully.");
        fetchProducts();
      } else {
        toast.error(" Failed to delete the product.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error while deleting product.");
    }
  };

  const handleUpdate = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      size: product.size,
      categoryName: product.categoryName,
      description: product.description || "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/admin/update-product/${editingProduct}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(" Product updated successfully!");
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error(" Failed to update the product.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(" Error while updating product.");
    }
  };

  const styles = {
    page: {
      backgroundImage: `url("/adminbg.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "#fff",
      padding: "30px",
      fontFamily: "'Segoe UI', sans-serif",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    card: {
      flex: "0 1 calc(22% - 20px)",
      backgroundColor: "#ffffff",
      color: "#000",
      padding: "12px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      maxWidth: "250px",
    },
    image: {
      width: "100%",
      height: "360px",
      objectFit: "cover",
      borderRadius: "6px",
      marginBottom: "10px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "6px",
      marginTop: "8px",
      flexWrap: "wrap",
    },
    button: {
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      cursor: "pointer",
      border: "none",
    },
    delete: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    update: {
      backgroundColor: "#ffc107",
      color: "#000",
    },
    form: {
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "12px",
      maxWidth: "500px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    save: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    cancel: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      color: "rgb(144, 83, 13)",
      textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
      marginBottom: "20px",
    },
    text: {
      margin: "4px 0",
      fontSize: "14px",
    },
    title: {
      margin: "8px 0",
      fontSize: "18px",
    },
  };

  return (
    <>
      <AdminNav />
      <ToastContainer position="top-center" />
      <div style={styles.page}>
        <h2 style={styles.heading}>All Products</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div style={styles.cardContainer}>
            {products.map((prod) => (
              <div key={prod._id} style={styles.card}>
                <img
                  src={`${baseUrl}/${(prod.image[0] || "").replace(/\\/g, "/")}`}
                  alt={prod.name}
                  style={styles.image}
                />
                <h4 style={styles.title}>{prod.name}</h4>
                <p style={styles.text}>₹{prod.price}</p>
                <p style={styles.text}>Size: {prod.size}</p>
                <p style={styles.text}>{prod.categoryName}</p>
                <div style={styles.buttonGroup}>
                  <button style={{ ...styles.button, ...styles.delete }} onClick={() => handleDelete(prod._id)}>
                     Delete
                  </button>
                  <button style={{ ...styles.button, ...styles.update }} onClick={() => handleUpdate(prod)}>
                     Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingProduct && (
          <form onSubmit={handleUpdateSubmit} style={styles.form}>
            <h3>Update Product</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Product Name"
              required
              style={styles.input}
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="Price"
              required
              style={styles.input}
            />
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleFormChange}
              placeholder="Size"
              required
              style={styles.input}
            />
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleFormChange}
              placeholder="Category"
              required
              style={styles.input}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Description"
              required
              style={{ ...styles.input, height: "80px", resize: "none" }}
            ></textarea>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button type="submit" style={{ ...styles.button, ...styles.save }}>
                 Save
              </button>
              <button type="button" onClick={() => setEditingProduct(null)} style={{ ...styles.button, ...styles.cancel }}>
                 Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AllProducts;
