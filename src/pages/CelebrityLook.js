import React from "react";
import Slider from "react-slick";
import "./CelebrityLook.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const allImages = [
  "/row1.jpg",
  "/row11.jpg",
  "/row12.jpg",
  "/row2.jpg",
  "/row21.jpg",
  "/row23.jpg"
];

// Custom arrows
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const CelebrityLook = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="celebrity-container">
      <h2 className="celebrity-title">CELEBRITY LOOK</h2>
      <Slider {...settings}>
        {allImages.map((img, i) => (
          <div key={i} className="celebrity-slide">
            <img src={img} alt={`look-${i}`} className="celebrity-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CelebrityLook;
