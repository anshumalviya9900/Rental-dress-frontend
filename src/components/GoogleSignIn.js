import React from "react";
import { auth, provider } from "../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserHome from "../pages/UserHome";
import Apis from "../Apis";
import {BASE_URL} from "../Config"; 


const baseUrl = BASE_URL;
const GoogleSignIn = () => {
     const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const response = await fetch(`${baseUrl}/user/google-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: user.email,
                    name: user.displayName,
                }),
            });

            const data = await response.json();
            console.log("🔐 Backend response:", data);

            if (data.message === "Google Sign-in Success") {
                alert(" Sign In Success");
                setTimeout(() => {
            navigate("/");
          }, 1000);
              
            } else {
                alert(" Sign In Failed");
            }
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            alert(" Something went wrong!");
        }
    };

    return (
        <button onClick={handleGoogleLogin} style={{ padding: '10px 20px' , background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",}}>
            Sign in with Google
        </button>
    
    );
};


export default GoogleSignIn;
