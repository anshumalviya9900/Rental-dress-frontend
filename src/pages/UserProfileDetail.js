import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const UserProfileDetail = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${baseUrl}/userprofile/fetch/me`, {
          withCredentials: true,
        });
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Profile not found or error:", err.response?.data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>No profile found.</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      {profile.profilepicture && (
        <img src={`${baseUrl}/${(profile.profilepicture)}`} alt="Profile" width="100" />
      )}
    </div>
  );
};

export default UserProfileDetail;
