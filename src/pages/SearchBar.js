import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products/search?q=${search}`);
        setProducts(res.data.products || []);

        const wishlistRes = await axios.get(`${baseUrl}/wishlist/user-wishlist`, {
          withCredentials: true,
        });

        const wishlistProducts = wishlistRes.data?.wishlist?.products || [];
        const ids = wishlistProducts.map((p) => p._id);
        setWishlistIds(ids);
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (search) fetchSearchResults();
  }, [search]);

  const handleAddToWishlist = async (productId) => {
    try {
      if (!wishlistIds.includes(productId)) {
        await axios.post(`${baseUrl}/wishlist/add`, { productId }, { withCredentials: true });
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        await axios.delete(`${baseUrl}/wishlist/remove/${productId}`, { withCredentials: true });
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      if (err.response?.status === 401) {
        alert("Please log in to use wishlist");
        navigate("/sign-in");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
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
      marginLeft:"-150px",
      marginTop:"-30px"
      }}
    >
      ← Back
    </button>
  </div>
        <form onSubmit={handleSearch} style={formStyle}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for dresses..."
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Search</button>
        </form>

        <div style={cardContainerStyle}>
          {loading ? (
            <p></p>
          ) : products.length === 0 ? (
            <p>No matching products found.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} style={cardStyle} className="card-hover">
                <div
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    color: wishlistIds.includes(product._id) ? "red" : "gray",
                    transition: "color 0.3s ease",
                    marginLeft:"15px",
                    marginTop:"10px"
                  }}
                  onClick={() => handleAddToWishlist(product._id)}
                  title="Add to Wishlist"
                >
                  {wishlistIds.includes(product._id) ? "❤️" : "♡"}
                </div>

                <div onClick={() => navigate(`/${product._id}`)} style={imgWrapper}>
                  <img
                    src={`${baseUrl}/${(product?.image?.[0] || "").replace(/\\/g, "/")}`}
                    alt={product.name || "product"}
                    style={imgStyle}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                </div>

                <div style={detailStyle}>
                  <h4 style={nameStyle}>{product.name}</h4>
                  <p style={subNameStyle}>{product.description?.slice(0, 22) || product.size}</p>
                  <p style={priceStyle}>₹{product.price} rent <span style={mrpStyle}>(₹{Math.ceil(product.price * 2)} MRP)</span></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const containerStyle = {
  maxWidth: "100%",
  padding: "30px 20px",
  fontFamily: "Segoe UI, sans-serif",
  marginTop: "-15px",
  background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  height:"auto"
  
};

const formStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
};

const inputStyle = {
  padding: "10px",
  width: "70%",
  border: "1px solid #ccc",
  borderRadius: "5px 0 0 5px",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#952851",
  color: "white",
  border: "none",
  borderRadius: "0 5px 5px 0",
  cursor: "pointer",
};

const cardContainerStyle = {
   display: "flex",
  flexWrap: "wrap",
  gap: "40px",
  justifyContent: "center",
  
};

const cardStyle = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  overflow: "hidden",
  width:"300px",
  
};

const imgWrapper = {
  width: "300px",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  marginTop:"-10px"
};

const imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
};

const detailStyle = {
  padding: "10px 12px 15px",
  fontSize: "13px",
  color: "#333",
};

const nameStyle = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "4px",
  color: "#333",
};

const subNameStyle = {
  fontSize: "12px",
  color: "#555",
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
    transform: scale(1.04);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

export default SearchPage;
