import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PayButton from "./PayButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Config";
const baseUrl = config.BASE_URL;
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const res = await axios.get(`${baseUrl}/userprofile/fetch/me`, {
        withCredentials: true,
      });
      setUserName(res.data.name || "Unknown");
    } catch (err) {
      console.error("User fetch failed", err);
      setUserName("Unknown");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseUrl}/cart/user-cart`, {
        withCredentials: true,
      });
      const products = res.data.products || [];
      setCartItems(products);
      calculateTotal(products);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (products) => {
    const total = products.reduce((sum, item) => sum + (item.productId?.price || 0), 0);
    setTotalPrice(total);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/cart/remove/${productId}`, { withCredentials: true });
      const updated = cartItems.filter(item => item.productId._id !== productId);
      setCartItems(updated);
      calculateTotal(updated);
      toast.success(" Removed from cart");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error(" Failed to remove item");
    }
  };

  const handleOrderNow = async () => {
    if (!fromDate || !toDate) {
      toast.error(" Please select both From and To dates");
      return;
    }
    if (cartItems.length === 0) {
      toast.error(" Your cart is empty");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/order/place`, {
        fromDate,
        toDate,
      }, {
        withCredentials: true,
      });

      localStorage.setItem("orderId", res.data.orderId);
      setOrderPlaced(true);
      toast.success(" Order placed! Proceed to payment");
    } catch (error) {
      console.error("Order placement failed", error);
      toast.error(" Failed to place order");
    }
  };

  const handlePaymentSuccess = async () => {
    if (!orderPlaced) {
      toast.error(" Please click 'Order Now' before payment");
      return;
    }

    const orderId = localStorage.getItem("orderId");

    try {
      await axios.post(`${baseUrl}/payment/payment-success`, { orderId }, { withCredentials: true });
      toast.success(" Payment successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Payment success or cart clear failed", error.response?.data || error.message);
      toast.error("Something went wrong after payment");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <div style={styles.pageContainer}>
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
              marginLeft: "-80px",
              marginTop: "20px"
            
            }}
          >
            ← Back
          </button>
        </div>

        <div style={styles.wrapper}>
          <h2 style={styles.title}>MY BAG (TOTAL {cartItems.length} ITEMS)</h2>

          {cartItems.map((item, i) => {
            const product = item.productId;
            if (!product || !Array.isArray(product.image)) return null;

            return (
              <div key={i} style={styles.productRow}>
                <img
                  src={`${baseUrl}/${product.image[0].replace(/\\/g, "/")}`}
                  alt="Product"
                  style={styles.image}
                />
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.text}>By: {product.brand || "Unknown"}</p>
                  <p style={styles.text}>Color: {product.color || "N/A"}</p>
                  <p style={styles.text}>Size: {product.size || "M,L"}</p>
                  <p style={styles.text}>Security: ₹{product.security || 4000}</p>
                  <p style={styles.text}>Rental: ₹{product.price}</p>
                </div>
                <div style={styles.metaBox}>
                  <button style={styles.button} onClick={() => removeFromCart(product._id)}>REMOVE</button>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <label style={styles.metaText}>From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={styles.inputSmall}
            />

            <label style={{ ...styles.metaText, marginLeft: "20px" }}>To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate || new Date().toISOString().split("T")[0]}
              style={styles.inputSmall}
            />

            <button
              style={{ ...styles.button, marginLeft: "20px", backgroundColor: "black", color: "white" }}
              onClick={handleOrderNow}
            >
              ORDER NOW
            </button>
          </div>

          <div style={styles.totalsBox}>
            <h5 style={styles.subtitle}>CART TOTALS</h5>
            <p style={styles.totalRow}><span>SUBTOTAL</span><span>₹{(totalPrice * 0.89).toFixed(2)}</span></p>
            <p style={styles.totalRow}><span>SECURITY</span><span>₹4000.00</span></p>
            <p style={styles.totalRow}><span>SHIPPING</span><span style={{ color: "#b30059" }}>FREE</span></p>
            <p style={styles.totalRow}><span>DISCOUNT</span><span>- ₹0.00</span></p>
            <p style={styles.totalRow}><span>ESTIMATED TAX</span><span>₹{(totalPrice * 0.11).toFixed(2)}</span></p>
            <h3 style={styles.grandTotal}>TOTAL ₹{totalPrice}</h3>
            <PayButton amount={totalPrice} disabled={!orderPlaced} onSuccess={handlePaymentSuccess} />
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "40px 80px",
    marginTop: "-80px",
   
  },
  wrapper: {
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "1200px",
    margin: "auto",
  },
  title: {
    fontSize: "22px",
    marginBottom: "20px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    fontWeight: "600",
  },
  productRow: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "20px 0",
    gap: "20px",
    alignItems: "flex-start",
  },
  image: {
    width: "140px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  productInfo: {
    flex: 1,
    fontSize: "14px",
  },
  productName: {
    fontWeight: "600",
    fontSize: "17px",
    marginBottom: "5px",
  },
  text: {
    fontSize: "13px",
    margin: "3px 0",
  },
  metaBox: {
    textAlign: "right",
    minWidth: "200px",
  },
  metaText: {
    fontSize: "13px",
    marginBottom: "4px",
    display: "inline-block",
  },
  button: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },
  inputSmall: {
    padding: "6px",
    fontSize: "13px",
    width: "150px",
    marginBottom: "6px",
  },
  totalsBox: {
    marginTop: "20px",
    maxWidth: "300px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginBottom: "6px",
  },
  grandTotal: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default CartPage;
