import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis from "../Apis";
import config from "../Config";
const baseUrl = config.BASE_URL;
const UserProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/admin/allproducts`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products);
        setProducts(data.products || []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={textStyle}>Available Dresses for Rent</h2>
      <div style={cardContainerStyle}>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div
              onClick={() => navigate(`/${product._id}`)}
              key={product._id}
              style={cardStyle}
              className="card-hover"
            >
              <div style={imgWrapper}>
                <img
                  src={`${baseUrl}/${(product?.image?.[0] || "").replace(/\\/g, "/")}`}
                  alt={product.name || "product"}
                  style={imgStyle}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/250x250?text=No+Image";
                  }}
                />
              </div>
              <div style={detailStyle}>
                <h4 style={nameStyle}>{product.name}</h4>
                <p style={inlineTextStyle}>₹{product.price}</p>
                <p style={inlineTextStyle}>Size: {product.size}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "30px 15px",
  fontFamily: "Segoe UI, sans-serif",
};

const textStyle = {
  textAlign: "center",
  fontSize: "26px",
  fontWeight: "600",
  color: "#6a1b1b",
  marginBottom: "20px",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "14px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  height: "320px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const imgWrapper = {
  width: "100%",
  height: "220px",
  overflow: "hidden",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const detailStyle = {
  padding: "10px 12px",
  color: "#333",
};

const nameStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "6px",
  color: "#4e342e",
};

const inlineTextStyle = {
  fontSize: "13px",
  margin: "3px 0",
};

const style = document.createElement("style");
style.innerHTML = `
  .card-hover:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

export default UserProductList;
