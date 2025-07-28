import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const PayButton = ({ amount = 0, onSuccess, disabled = false }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (disabled) {
      toast.warning(" Please click 'Order Now' before making payment.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      console.log(" Creating order for amount:", amount);

      const orderRes = await axios.post(
        `${baseUrl}/payment/create-order`,
        { amount: Number(amount) },
        { withCredentials: true }
      );

      const { order } = orderRes.data;

      const options = {
        key: "rzp_test_ETwvc8LnKae7pn",
        amount: order.amount,
        currency: "INR",
        name: "Dress Rental Payment",
        description: "Secure Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
             `${baseUrl}/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            toast.success(" Payment successful!");
            await onSuccess();
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error(" Payment verified failed. Please contact support.");
          }
        },
        theme: {
          color: "#00bcd4",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(" Error creating order or session expired:", err);
      toast.error(" Session expired or order creation failed.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      style={{
        padding: "10px",
        background: disabled ? "#ccc" : "black",
        color: "white",
        borderRadius: "6px",
        width: "100%",
        fontSize: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        marginTop: "10px",
      }}
    >
      PAY ₹{amount}
    </button>
  );
};

export default PayButton;
