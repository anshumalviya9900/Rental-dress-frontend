
import React from "react";
import NavBar from "./NavBar";
import InKindDonations from "./InKindDonations";

const DonateHeroSection = () => {

  return (
    <>
      <NavBar />
      <div
        className="w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('HOPE.jpg')",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="bg-black bg-opacity-50 text-white text-center p-6 rounded-xl max-w-2xl"
          style={{ height: "500px", marginTop: "-20px" }}
        ></div>
        <div>
          <h1
            className="text-4xl font-bold"
            style={{ marginTop: "40px", textAlign: "center", color: "#901E3E" }}
          >
            "LET CLOTHING NOT BE A PRIVILEGE OR <br />
            <span className="text-pink-400">
              SUSTAINABILITY AN AFTERTHOUGHT"
            </span>
          </h1>
          <p className="text-lg mt-4" style={{ textAlign: "center" }}>
            Join us in giving hope through old clothes. Your donation can warm
            someone’s winter, protect from summer, and bring smiles.
          </p>
      <br></br>
      <br></br>

      <section className="py-10 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#901E3E] mb-8">
          Moments of Kindness 💖
        </h2>
        <br></br>
        <InKindDonations/>
       
       
      </section>
        </div>
      </div>
     
    </>
  );
};

export default DonateHeroSection;

