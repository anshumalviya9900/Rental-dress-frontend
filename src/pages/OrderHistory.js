import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../Config";
const baseUrl = config.BASE_URL;
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderHistory();
  }, []);


  const fetchOrderHistory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/order/history`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders.");
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`${baseUrl}/order/cancel/${orderId}`, {
        withCredentials: true,
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      alert("Order cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  const isCancelable = (placedDate) => {
    const now = new Date();
    const placed = new Date(placedDate);
    const diffInMs = now - placed;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 2;
  };

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Loading order history...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (orders.length === 0) return <p style={{ textAlign: "center" }}>No orders found.</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#952851" }}>
        Your Order History
      </h2>

      {orders.map((order, index) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            marginBottom: "25px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#444" }}>Order #{index + 1}</strong>
            <p style={{ margin: "5px 0" }}>
              <strong>ID:</strong> {order._id}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Rental Dates:</strong> {new Date(order.fromDate).toLocaleDateString()} to{" "}
              {new Date(order.toDate).toLocaleDateString()}
            </p>

            {isCancelable(order.createdAt) ? (
              <button
                onClick={() => cancelOrder(order._id)}
                style={{
                  backgroundColor: "#c0392b",
                  color: "#fff",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Cancel Order
              </button>
            ) : (
              <p style={{ color: "gray", marginTop: "10px", fontStyle: "italic" }}>
                 Order can no longer be cancelled (past 2 days)
              </p>
            )}
          </div>

          <div>
            <strong style={{ color: "#952851" }}>Products:</strong>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {order.products.map((item, i) => {
                const product = item.productId;
                return (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "200px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <p style={{ margin: "10px 0 5px", fontWeight: "bold" }}>
                      {product?.name || "Untitled"}
                    </p>
                    <p style={{ color: "#333" }}>{product?.price}</p>
                    <p style={{ fontSize: "12px", color: "#777" }}>
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
