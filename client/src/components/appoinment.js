import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

function Appointment() {
  let { id } = useParams();
  let [patient, setPatient] = useState(null);
  let [appointments, setAppointments] = useState([]);
  let [appointment, setAppointment] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [editMode, setEditMode] = useState(false);
  let [editAppointmentId, setEditAppointmentId] = useState(null);

  useEffect(() => {
    // Fetch patient data
    fetch(`http://localhost:3000/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
      });

    // Fetch existing appointments for the patient
    fetch(`http://localhost:3000/appointments?patientId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      patientId: id,
      date: date,
      time: time,
      reason: appointment,
    };

    const requestOptions = {
      method: editMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    };

    const url = editMode
      ? `http://localhost:3000/appointments/${editAppointmentId}`
      : "http://localhost:3000/appointments";

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (editMode) {
          setAppointments(
            appointments.map((appt) => (appt.id === editAppointmentId ? data : appt))
          );
        } else {
          setAppointments([...appointments, data]);
        }
        alert(editMode ? "Appointment updated successfully!" : "Appointment added successfully!");
        setDate("");
        setTime("");
        setAppointment("");
        setEditMode(false);
        setEditAppointmentId(null);
      })
      .catch((error) => {
        console.error("Error adding/updating appointment:", error);
      });
  };

  const handleDelete = (appointmentId) => {
    fetch(`http://localhost:3000/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then(() => {
        setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
        alert("Appointment deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  const handleEdit = (appointment) => {
    setDate(appointment.date);
    setTime(appointment.time);
    setAppointment(appointment.reason);
    setEditMode(true);
    setEditAppointmentId(appointment.id);
  };

  return (
      <div className="appointments-container">
        <Navbar/>
      <h1>Appointment Form</h1>
      {patient && (
        <div>
          <h3>Patient: {patient.name}</h3>
          <form className="form-table" onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Age:</label>
              <input type="text" value={patient.age} readOnly />
            </div>
            <div className="input-container">
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Reason for visit:</label>
              <input
                type="text"
                value={appointment}
                onChange={(e) => setAppointment(e.target.value)}
              />
            </div>
            <button type="submit">{editMode ? "Update Appointment" : "Add Appointment"}</button>
          </form>
        </div>
      )}
      
      
      <h2>Appointments</h2>
        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <p>
              <strong>Date:</strong> {appt.date}
            </p>
            <p>
              <strong>Time:</strong> {appt.time}
            </p>
            <p>
              <strong>Reason:</strong> {appt.reason}
            </p>
            <button onClick={() => handleEdit(appt)}>Edit</button>
            <button onClick={() => handleDelete(appt.id)}>Delete</button>
          </div>
        ))}
      
    
    </div>
  );
}

export default Appointment;
