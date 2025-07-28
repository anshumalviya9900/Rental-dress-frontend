import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${baseUrl}/wishlist/user-wishlist`, {
        withCredentials: true,
      });
      const products = res.data.wishlist?.products || [];
      setWishlistItems(products);
    } catch (err) {
      alert("Please login to view wishlist");
      navigate("/sign-in");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/wishlist/remove/${productId}`, {
        withCredentials: true,
      });
      const updated = wishlistItems.filter((item) => item._id !== productId);
      setWishlistItems(updated);
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handleRentNow = (productId) => {
    navigate(`/rent/${productId}`);
  };

 
  useEffect(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    .wishlist-card:hover {
      transform: scale(1.03);
      box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    }
    button:hover {
      filter: brightness(0.95);
    }
  `;
  document.head.appendChild(style);
}, []);


  return (
    <>
    <NavBar/>
    <div style={styles.container}>
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "10px 20px" }}>
    <button
      onClick={() => navigate(-1)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        fontSize: "14px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginLeft:"-50px",
      marginTop:"-5px"
      }}
    >
      ← Back
    </button>
  </div>
      <h2 style={styles.heading}></h2>
      {wishlistItems.length === 0 ? (
        <p style={styles.empty}>No items in wishlist.</p>
      ) : (
        <div style={styles.grid}>
          {wishlistItems.map((product, index) => (
            <div key={index} style={styles.card} className="wishlist-card">
              <img
                src={`${baseUrl}/${product.image[0].replace(/\\/g, "/")}`}
                alt={product.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                }}
              />
              <div style={styles.details}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.price}>₹{product.price} rent</p>
                <div style={styles.buttonRow}>
                  <button style={styles.rentBtn}onClick={() => navigate(`/${product._id}`)}>
                    Rent Now
                  </button>
                  <button style={styles.removeBtn} onClick={() => handleRemove(product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
 </> );
};

const styles = {
  container: {
    padding: "30px 20px",
    minHeight: "100vh",
    background: "linear-gradient(to right, #fff8f8, rgba(20, 25, 95, 0.1))",
    fontFamily: "Segoe UI, sans-serif",
    marginTop:"-20px"
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#952851",
    marginBottom: "30px",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "50px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "260px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "370px",
    objectFit: "cover",
    borderBottom: "1px solid #eee",
  },
  details: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  },
  price: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#b12704",
    marginBottom: "12px",
  },
  buttonRow: {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "8px",
},

  rentBtn: {
  backgroundColor: "#d47a95", 
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
},

removeBtn: {
  backgroundColor: "#bcbcbc", 
  color: "#333",
  border: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
},
};

export default WishlistPage;
