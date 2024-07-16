import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    speciality: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSave() {
    // Add doctor to backend
    fetch("/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Doctor added:", data);
        // Clear form after saving
        setUser({
          name: "",
          email: "",
          speciality: "",
        });
      });
  }

  function handleViewAppointments() {
    navigate("/dms/patients");
  }

  return (
    <div>
      <Navbar />
    
    <div className="profile-container">
      <form className="form-container2">
      <h1>Welcome to Blossom Healthcare</h1>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Speciality:</label>
          <input
            type="text"
            name="speciality"
            value={user.speciality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="view-appointments-button">
        <button type="button" onClick={handleSave}>
          SAVE
        </button>
        <button
        onClick={handleViewAppointments}>
          ENTER
      </button>
        </div>

      </form>



    </div>
    </div>
  );
}

export default Profile;
