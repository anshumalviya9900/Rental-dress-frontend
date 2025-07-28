import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/orders/my-orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#952851", marginBottom: "15px" }}>🛍️ My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={styles.orderList}>
          {orders.map((order, idx) => (
            <li key={idx} style={styles.orderItem}>
              <b>Order #{order._id}</b> – ₹{order.totalAmount} – {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  orderList: {
    listStyle: "none",
    padding: 0,
    background: "#f9f9f9",
    borderRadius: "10px",
    paddingInline: "20px",
  },
  orderItem: {
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
};

export default OrderList;
