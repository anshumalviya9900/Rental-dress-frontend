import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const StoreLocations = () => {
  const stores = [
    {
      name: "VASTRAA Delhi (Rajouri Garden)",
      address: "F-134, Rajouri Garden Main Market, New Delhi, Delhi-110027, India",
      contact: "011-49856846",
      email: "rajouri.store@vastraa.com",
      timing: "11:30 AM - 8:30 PM (Mon-Sun)",
      img: "/delhi.png", 
    },
    {
      name: "VASTRAA Mens Exclusive Delhi (Kohat Enclave)",
      address: "17, Lower Ground Floor, Kapil Vihar, Kohat Enclave, New Delhi, Delhi-110034",
      contact: "+91-9990911335",
      email: "kohat.gurgaon@vastraa.com",
      timing: "11:30 AM - 8:30 PM (Mon-Sun)",
      img: "/delhi.png",
    },
    {
      name: "VASTRAA Gurgaon",
      address: "Shop no. 24, DLF Phase 4, Gurgaon, Haryana - 122002",
      contact: "+91-9898989898",
      email: "gurgaon.store@vastraa.com",
      timing: "11:30 AM - 8:30 PM (Mon-Sun)",
      img: "/gurugram.png",
    },
    {
      name: "VASTRAA Hyderabad",
      address: "Gachibowli Road, Hyderabad, Telangana - 500032",
      contact: "+91-9876543210",
      email: "hyderabad.store@vastraa.com",
      timing: "11:30 AM - 8:30 PM (Mon-Sun)",
      img: "/hyderabad.png",
    },
  ];

  return (
    <>
    <NavBar/>
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
    
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#bbc3b4", 
          padding: "60px 40px",
          flexWrap: "wrap",
          height:"450px",
          marginTop:"-50px"
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#000" ,marginLeft:"100px",marginTop:"-20px"}}>
          VASTRAA <br /> STORE LOCATIONS
        </h1>
        <img
          src="/storelocation.jpeg" 
          alt="Flyrobe Model"
          style={{ height: "420px",width:"1200px", objectFit: "contain",
            marginTop:"-30px",marginRight:"-295px"
           }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "50px",
          padding: "60px",
        }}
      >
        {stores.map((store, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "20px",
              border: "1px solid #eee",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              background: "#fff",
            }}
          >
            <img
              src={store.img}
              alt={store.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{store.name}</h2>
            <p>{store.address}</p>
            <p>
              Contact no:{" "}
              <span style={{ fontWeight: "bold" }}>{store.contact}</span>
            </p>
            <p>
              Email: <strong>{store.email}</strong>
            </p>
            <p>
              Timings: <strong>{store.timing}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
 </> );
};

export default StoreLocations;
