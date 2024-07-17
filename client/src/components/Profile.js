import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useOutletContext } from "react-router-dom";

function Profile() {
  const { user } = useOutletContext();
  const [dict, setDict] = useState({
    name: "",
    email: "",
    speciality: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setDict((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleEdit() {
    // Add doctor to backend
    fetch(`/doctors/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dict),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Doctor added:", data);
        // Clear form after saving
        setDict({
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
              value={dict.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={dict.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Speciality:</label>
            <input
              type="text"
              name="speciality"
              value={dict.speciality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="view-appointments-button">
            <button type="button" onClick={handleEdit}>
              Save
            </button>
            <button onClick={handleViewAppointments}>ENTER</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
