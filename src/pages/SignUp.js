import GoogleSignIn from "../components/GoogleSignIn";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import NavBar from "./NavBar";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [otpData, setOtpData] = useState({ email: "", otp: "" });
  const [messages, setMessages] = useState(["👋 Hi there! Let's get you signed up.\nWhat should I call you? 😊"]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const maskedInput = (step === 2 || step === 3) ? "******" : trimmed;
     pushMessage(`🧑 You: ${maskedInput}`);

    setInput("");

    if (step === 0) {
      setFormData((prev) => ({ ...prev, name: trimmed }));
      pushMessage(`😊 Nice to meet you, ${trimmed}!\nWhat's your email address?`);
      setStep(1);
    } else if (step === 1) {
      const emailValid = /\S+@\S+\.\S+/.test(trimmed);
      if (!emailValid) return pushMessage(" Hmm, that doesn't look like a valid email. Try again.");
      setFormData((prev) => ({ ...prev, email: trimmed }));
      pushMessage(" Cool! Now enter a password (at least 6 characters).");
      setStep(2);
    } else if (step === 2) {
      if (trimmed.length < 6) return pushMessage(" Your password is too short. Try again.");
      setFormData((prev) => ({ ...prev, password: trimmed }));
      pushMessage(" Password set: ******"); 
      pushMessage(" Please confirm your password.");
      setStep(3);
    } else if (step === 3) {
      if (trimmed !== formData.password) return pushMessage(" Passwords do not match. Try again.");
      setFormData((prev) => ({ ...prev, confirmPassword: trimmed }));
      pushMessage("Password confirmed.");
      pushMessage("⏳ Creating your account and sending OTP...");
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/user/sign-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          pushMessage(" Signup successful!  OTP sent to your email.");
          setOtpData((prev) => ({ ...prev, email: formData.email }));
          pushMessage(" Now enter the 6-digit OTP sent to your email.");
          setStep(4);
        } else {
          pushMessage(` ${data.error || data.message || "Signup failed"}`);
          setStep(0);
        }
      } catch {
        pushMessage(" Network error. Please try again.");
        setStep(0);
      } finally {
        setLoading(false);
      }
    } else if (step === 4) {
      const otpValid = /^\d{6}$/.test(trimmed);
      if (!otpValid) return pushMessage(" OTP must be a 6-digit number.");
      setOtpData((prev) => ({ ...prev, otp: trimmed }));
      pushMessage("⏳ Verifying OTP...");
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/user/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: otpData.email, otp: trimmed }),
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          pushMessage("🎉 OTP verified! Redirecting you to Sign In page...");
          setTimeout(() => navigate("/sign-in"), 2500);
        } else {
          pushMessage(` ${data.message || "OTP verification failed"}`);
        }
      } catch {
        pushMessage(" Network error while verifying OTP.");
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
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <p key={i} style={styles.message}>{msg}</p>
            ))}
          </div>
          <form onSubmit={handleUserInput} style={styles.inputBar}>
            <input
              type={(step === 2 || step === 3) && !showPassword ? "password" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              style={styles.input}
              disabled={loading}
            />
            {(step === 2 || step === 3) && (
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
            <button type="submit" style={styles.button} disabled={loading}>Send</button>
          </form>
          <br />
          <div style={{ textAlign: "center" }}>
            <p>Have an account? <a href="/sign-in">Click here</a></p>
            <p>or</p>
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  mainpage: {
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    height: "680px",
    marginTop: "-15px"
  },
  chatContainer: {
    marginTop: "80px",
    maxWidth: "600px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
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
};

export default Signup;
