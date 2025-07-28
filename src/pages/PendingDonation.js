import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const PendingDonation = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/admin/pending-donations`,
        { withCredentials: true }           
      );

      console.log("Pending Donations:", res.data.pendingProducts);
      setPendingProducts(res.data.pendingProducts);            
    } catch (error) {
      console.error("Error fetching pending donations:", error);
    }
  };

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${baseUrl}/admin/approve-donation/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setPendingProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error approving donation:", err);
    }
  };

  return (
    <>
      <AdminNav />

      <div style={styles.page}>
        <h2 style={styles.title}>Pending Donations</h2>

        <div style={styles.cardContainer}>
          {pendingProducts.length === 0 ? (
            <p style={styles.noData}>No pending donations.</p>
          ) : (
            pendingProducts.map((product) => (
              <div key={product._id} style={styles.card}>
                <img
                  src={`${baseUrl}/uploads/${product.image[0]}`}
                  alt={product.name}
                  style={styles.image}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <button
                  style={styles.button}
                  onClick={() => handleApprove(product._id)}
                >
                  Approve
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to right, #fff8f8, rgba(148, 98, 11, 0.59))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    minHeight: "100vh",
    padding: "30px 20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    width: "280px",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
  },
  image: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  noData: {
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
  },
};

export default PendingDonation;
