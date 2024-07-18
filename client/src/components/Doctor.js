import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; 

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/doctors'); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const doctorsData = await response.json();
            setDoctors(doctorsData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div >
        <Navbar />
        <h1>Doctors</h1>

        <div className="doctors-table-container">
            
            <table className="doctors-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>{doctor.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Doctors;
