import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const response = await fetch(
                `${baseUrl}/verify/${token}`,
                { method: "GET" }
            );

            if (response.redirected) {
            
                navigate("/sign-in");
            } else if (!response.ok) {
                alert("Invalid or expired verification link");
                navigate("/sign-up");
            }
        };
        verify();
    }, [token, navigate]);

    return <div>Verifying your email, please wait...</div>;
}

export default VerifyEmail;
