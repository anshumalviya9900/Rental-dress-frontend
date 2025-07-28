import React from "react";

const InKindDonations = () => {
  const donations = [
    {
      name: "Sneha Karanam",
      image: "/donateimage5.jpg",
    },
    {
      name: "Rukhsheen Vajifdar",
      image: "/donateimage2.jpeg",
    },
    {
      name: "Prajakta Amberkar",
      image: "/donateimage3.jpeg",
    },
    {
      name: "Andrea",
      image: "/donateimage4.jpeg",
    },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {donations.map((donor, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <img
              src={donor.image}
              alt={donor.name}
              className="rounded-md w-full h-64 object-cover mb-4"
            />
            <p className="text-gray-700 text-base">
              Thank you <span className="font-semibold">{donor.name}</span> for
              your great generosity! <br />
              We, at Vastraa, greatly appreciate your donation.
            </p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default InKindDonations;
