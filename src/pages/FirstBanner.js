import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const FirstBanner = () => {
  const navigate = useNavigate();
  const sectionStyle = {
    fontFamily: "'Segoe UI', sans-serif",
  };

  const goToTraditional = () => navigate("/category/Traditional");
  const goToWestern = () => navigate("/category/Western");
  const goToIndoWestern = () => navigate("/category/Indo-Western");
 

  const bannerContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fef9f6",
    padding: "20px 0",
    marginTop:"-35px"
  };

  const imgStyle = {
   width:"600px",
   height:"650px",
    objectFit: "cover",
  };

  const centerText = {
    width: "40%",
    textAlign: "center",
    color: "#222",
  };

  const bigText = {
    fontSize: "48px",
    fontWeight: "bold",
    letterSpacing: "4px",
    marginBottom: "10px",
  };

  const smallText = {
    fontSize: "20px",
    letterSpacing: "2px",
  };

  const overlayContainer = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 30px",
    background: "wheat",
    opacity:"0.6",
    color: "white",
    flexWrap: "wrap",
  };

  const overlayItem = {
    flex: "1 1 30%",
    margin: "10px",
    background: "brown",
    padding: "20px",
    borderRadius: "10px",
  };

  const overlayTitle = {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "10px",
  };

  const overlayText = {
    fontSize: "13px",
    lineHeight: "1.4",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 14px",
    background: "#fff",
    color: "#000",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
  };

  return (
    <>
    <NavBar/>
    <section style={sectionStyle}>
      {/* Top Bar */}
      <div style={bannerContainer}>
        <img
          src="/first.jpg"
          alt="Left Couple"
          style={imgStyle}
        />
        <div style={centerText}>
          <div style={bigText}>YOUR FAVOURITE DRESS</div>
          <div style={smallText}>RENT. WEAR. REPEAT</div>
        </div>
        <img
          src="/first2.jpg"
          alt="Right Couple"
          style={imgStyle}
        />
      </div>
      <div style={overlayContainer}>
        <div style={overlayItem}>
          <div style={overlayTitle}>On Demand</div>
          <div style={overlayText}>
            Rent for Occasion! The day is near and you have nothing to wear? When the style is sure, but not easy to procure?
          </div>
          <button onClick={goToWestern} style={buttonStyle}>Western →</button>
        </div>
        <div style={overlayItem}>
          <div style={overlayTitle}>Outfits on Rent</div>
          <div style={overlayText}>
            Click on us, we rent it out for the day. The selects would reach you on your chosen day.
          </div>
          <button onClick={goToTraditional} style={buttonStyle}>Ethnic →</button>
        </div>
        <div style={overlayItem}>
          <div style={overlayTitle}>Fashion Subscription</div>
          <div style={overlayText}>
            Shine without ownership. Wear new every week with our flexible fashion plan.
          </div>
          <button onClick={goToIndoWestern} style={buttonStyle}>Indo-Western →</button>
        </div>
      </div>
    </section>
  </>);
};

export default FirstBanner;
