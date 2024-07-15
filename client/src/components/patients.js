import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    contact: "",
    medicalHistory: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    fetch("/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients([...patients, data]);
        alert("Patient added successfully!");
        setIsModalOpen(false);
        setFormValues({
          name: "",
          age: "",
          gender: "",
          dateOfBirth: "",
          address: "",
          contact: "",
          medicalHistory: "",
        });
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
      });
  };

  const handleDeletePatient = (id) => {
    fetch(`/patients/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPatients(patients.filter((patient) => patient.id !== id));
        alert("Patient deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="patients-container">
        <Navbar />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search patients by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={() => setIsModalOpen(true)}>Add Patient</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <h2>Add New Patient</h2>
              <form onSubmit={handleAddPatient}>
                <div className="input-container">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={formValues.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={formValues.gender}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    value={formValues.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Medical History:</label>
                  <input
                    type="text"
                    name="medicalHistory"
                    value={formValues.medicalHistory}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">Add Patient</button>
              </form>
            </div>
          </div>
        )}
        <div className="patients-list">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <h3> Name:{patient.name}</h3>
              <p>Age: {patient.age}</p>
              <p>Gender: {patient.gender}</p>
              <p>Address: {patient.address}</p>
              <p>Contact: {patient.contact}</p>
              <p>Medical History: {patient.medicalHistory}</p>
              <button onClick={() => handleDeletePatient(patient.id)}>
                Delete
              </button>
              <br></br>
              <Link to={`/dms/appointment/${patient.id}`}>
                <button className="patients-button"> View Appointments </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patient;
