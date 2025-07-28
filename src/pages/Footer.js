import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <h3 style={followText}>FOLLOW US</h3>
            <div style={iconContainer}>
                <Link to ="https://www.facebook.com/flyrobe" style={facebook}><i className="fab fa-facebook-f"></i></Link>
                <Link to="https://www.instagram.com/flyrobe/" style={instagram}><i className="fab fa-instagram"></i></Link>
                <Link to="https://x.com/flyrobe" style={twitter}><i className="fab fa-twitter"></i></Link>
                <Link to="https://in.pinterest.com/flyrobesays/" style={pinterest}><i className="fab fa-pinterest-p"></i></Link>
                <Link to="https://www.youtube.com/c/flyrobe-largest-fashion-rental-service-in-India" style={youtube}><i className="fab fa-youtube"></i></Link>
            </div>
        </footer>
    );
};


const footerStyle = {
    backgroundColor: "black",
    padding: "1px 0",
    height:"80px",
    textAlign: "center",
};

const followText = {
    padding:"10px",
    color: "white",
    fontSize: "18px",
    marginBottom: "0px",
    fontWeight: "bold",
};

const iconContainer = {
    display: "flex",
    marginBottom:"20px",
    justifyContent: "center",
    gap: "15px",
};

const socialBase = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
};

/* Platform-specific background styles */
const facebook = {
    ...socialBase,
    backgroundColor: "#3b5998",
};

const instagram = {
    ...socialBase,
    backgroundColor: "#2c3e50",
};

const twitter = {
    ...socialBase,
    backgroundColor: "#1da1f2",
};

const pinterest = {
    ...socialBase,
    backgroundColor: "#bd081c",
};

const youtube = {
    ...socialBase,
    backgroundColor: "#ff0000",
};


export default Footer;
