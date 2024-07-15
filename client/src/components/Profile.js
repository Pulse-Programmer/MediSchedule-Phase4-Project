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
    <div className="profile-container">
      <Navbar />
      <h1>Welcome to Gotham Hospital</h1>
      <form className="form-container">
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

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
      <button
        className="view-appointments-button"
        onClick={handleViewAppointments}
      >
        Enter
      </button>

      <div className="business-hours">
        <h2>Business Hours</h2>
        <p>Monday - Friday: 9:00 AM - 5:00 PM </p>
        <p>Saturday: 9:00 AM - 3:00 PM </p>
      </div>

      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Phone: +123 456 7890</p>
        <p>Email: info@gothamhospital.com</p>
        <p>Address: Business Arcade, Nairobi</p>
      </div>
    </div>
  );
}

export default Profile;
