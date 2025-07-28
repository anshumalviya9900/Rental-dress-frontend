import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import NavBar from "./NavBar";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const SignIn = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    "👋 Welcome back! Let's get you signed in.",
    "Please enter your email address:",
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const maskedInput = (step === 1) ? "******" : trimmed;
    pushMessage(`🧑 You: ${maskedInput}`);
    setInput("");

    if (step === 0) {
      const emailValid = /\S+@\S+\.\S+/.test(trimmed);
      if (!emailValid) return pushMessage(" Please enter a valid email address.");
      setEmail(trimmed);
      pushMessage("Great! Now enter your password:");
      setStep(1);
    } else if (step === 1) {
      if (trimmed.length < 6) {
        return pushMessage(" Password must be at least 6 characters.");
      }
      setPassword(trimmed);
      pushMessage(" Logging you in...");
      setLoading(true);

      try {
        const response = await fetch(`${baseUrl}/user/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: trimmed }),
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          pushMessage(` ${data.error || "Login failed. Try again!"}`);
          setStep(0);
          return;
        }

        if (data.user?.isVerified === false) {
          pushMessage(" Please verify your email before signing in.");
          setStep(0);
          return;
        }

        pushMessage(" Login successful! Redirecting...");

        const role = data.user.role;
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

      } catch (error) {
        pushMessage(" Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.mainpage}>
        <div style={styles.chatContainer}>
          <h2 style={{ textAlign: "center" }}>Sign In</h2>
          <br />
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <p key={i} style={styles.message}>{msg}</p>
            ))}
          </div>
          <form onSubmit={handleUserInput} style={styles.inputBar}>
            <input
              type={step === 1 && !showPassword ? "password" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              style={styles.input}
              disabled={loading}
            />
            {step === 1 && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                <FaEye size={18} color="#333" />
              </button>
            )}
            <button type="submit" style={styles.button} disabled={loading}>
              Send
            </button>
          </form>
          <p style={styles.redirectText}>
            Don't have an account? <a href="/sign-up">Click here</a>
          </p>
        </div>
      </div>
    </>
  );
};

const styles = {
  chatContainer: {
    marginTop: "80px",
    maxWidth: "600px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
  },
  mainpage: {
    marginTop: "-20px",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    height: "800px"
  },
  chatBox: {
    minHeight: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  message: {
    padding: "8px 12px",
    margin: "4px 0",
    background: "#eee",
    borderRadius: "8px",
  },
  inputBar: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px 18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  redirectText: {
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default SignIn;
