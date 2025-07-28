import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
    const navigate = useNavigate();
    const [role] = useState(""); 

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {!role && (
                <>
                    <button  onClick={() => navigate('/admin/sign-in')} style={{ margin: '10px', padding: '10px 20px' }}>Admin</button>
                </> 
            )}
        </div>
    );
};

export default RoleSelector;
