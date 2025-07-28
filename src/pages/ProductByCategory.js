import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const ProductsByCategory = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch(
          `${baseUrl}/products/category/${categoryName}`
        );
        const productData = await productRes.json();
        setProducts(productData.products || []);

        const wishlistRes = await axios.get(
          `${baseUrl}/wishlist/user-wishlist`,
          { withCredentials: true }
        );

        const ids =
          wishlistRes.data?.wishlist?.products?.map((p) => p._id) || [];
        setWishlistIds(ids);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryName]);

  const handleAddToWishlist = async (productId) => {
    try {
      if (!wishlistIds.includes(productId)) {
        await axios.post(
          `${baseUrl}/wishlist/add`,
          { productId },
          { withCredentials: true }
        );
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        await axios.delete(
          `${baseUrl}/wishlist/remove/${productId}`,
          { withCredentials: true }
        );
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
      }
    } catch (err) {
      console.error(" Wishlist Error:", err);
      if (err.response?.status === 401) {
        navigate("/sign-in");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div style={outerBackground}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "10px 20px" }}>
          <button onClick={() => navigate(-1)} style={backButtonStyle}>
            ← Back
          </button>
        </div>

        <div style={containerStyle}>
          <div style={cardContainerStyle}>
            {loading ? (
              <p>Loading...</p>
            ) : products.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} style={cardStyle} className="card-hover">
                
                  <div style={wishlistWrapper}>
                    <span
                      onClick={() => handleAddToWishlist(product._id)}
                      style={{
                        fontSize: "18px",
                        color: wishlistIds.includes(product._id) ? "#e74c3c" : "#aaa",
                        cursor: "pointer",
                      }}
                    >
                      {wishlistIds.includes(product._id) ? <FaHeart /> : <FaRegHeart />}
                    </span>
                  </div>

               
                  <div onClick={() => navigate(`/${product._id}`)} style={imgWrapper}>
                    <img
                      src={ `${baseUrl}/${(product.image?.[0] || "").replace(/\\/g, "/")}`}
                      alt={product.name}
                      style={imgStyle}
                    />
                  </div>

               
                  <div style={detailStyle}>
                    <h4 style={nameStyle}>{product.name}</h4>
                    {product.description && (
                      <p style={subNameStyle}>
                        {product.description.length > 50
                          ? product.description.slice(0, 50) + "..."
                          : product.description}
                        <br />
                        <span style={{ color: "#888" }}>Size: {product.size}</span>
                      </p>
                    )}
                    <p style={priceStyle}>
                      ₹{product.price} rent{" "}
                      <span style={mrpStyle}>(₹{Math.ceil(product.price * 2)} MRP)</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const outerBackground = {
  background: "linear-gradient(to right, #fff8f8, rgba(20, 25, 95, 0.25))",
  minHeight: "100vh",
  paddingTop: "10px",
  marginTop: "-20px",
};

const backButtonStyle = {
  padding: "8px 16px",
  fontSize: "14px",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  marginBottom: "20px",
  marginLeft: "-150px",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  marginTop: "-30px",
  padding: "30px 20px",
  fontFamily: "Segoe UI, sans-serif",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "60px",
};

const cardStyle = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.07)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  overflow: "hidden",
};

const wishlistWrapper = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 2,
};

const imgWrapper = {
  width: "100%",
  height: "270px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8f8f8",
};

const imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "cover",
};

const detailStyle = {
  padding: "12px 15px 16px",
  fontSize: "13px",
  color: "#333",
};

const nameStyle = {
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "5px",
};

const subNameStyle = {
  fontSize: "12px",
  color: "#666",
  marginBottom: "8px",
};

const priceStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#b12704",
};

const mrpStyle = {
  fontSize: "12px",
  color: "#999",
  fontWeight: "normal",
};


const style = document.createElement("style");
style.innerHTML = `
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(style);

export default ProductsByCategory;
