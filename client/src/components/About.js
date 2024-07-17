import React from 'react';
import Navbar from './navbar';

const AboutUs = () => {
  return (
    <div className="about-us">
        <Navbar />
      <h1>About Us</h1>
      
      <p>
        Welcome to <strong>MEDISCHEDULE</strong>, your convenient solution for managing doctor's appointments seamlessly.
        Our app is designed to simplify the process of scheduling appointments with healthcare professionals, ensuring you receive timely care without the hassle.
        Whether you need to book a routine check-up or a specialist consultation, <strong>MEDISCHEDULE</strong> makes it easy.
      </p>
      <p>
        We understand the importance of your time and health, which is why we've crafted an intuitive interface that allows you to browse doctors, check their availability, and book appointments effortlessly.<br></br> Stay organized with reminders and notifications, and manage your medical appointments with confidence.
      </p>
      <p>
       <strong>MEDISCHEDULE</strong> is committed to privacy and security, ensuring that your personal information is protected at all times. <br></br>For any questions, feedback, or support inquiries, please don't hesitate to reach out to us. Your experience matters, and we're here to help you make managing your health appointments as smooth as possible.
      </p>
      <div className="business-hours">
        <h2>Business Hours</h2>
        <p>Monday - Friday: 9:00 AM - 5:00 PM </p>
        <p>Saturday: 9:00 AM - 3:00 PM </p>
      </div>

      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Phone: +254 735456789</p>
        <p>Email: info@gothamhospital.com</p>
        <p>Address: Business Arcade, Nairobi</p>
      </div>

      <div className="copyright">
      <p>
        Thank you for choosing MEDISCHEDULE!
      </p>
        ---------------------------------------
        &copy; 2024 MEDISCHEDULE. All rights reserved.
        ---------------------------------------
      </div>
      

    </div>
  );
};

export default AboutUs;
