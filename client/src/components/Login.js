import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    speciality: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    // Add doctor to backend
    fetch("/signup", {
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
          password: "",
        });
      });
  }

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignInClick = () => {
    navigate("/dms/profile");
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <div className="header-background">
        <h1>GOTHAM HOSPITAL</h1>
      </div>
      <div className={`form-container sign-in ${isSignUp ? "active" : ""}`}>
        <form className="form-a">
          <img
            className="image"
            src="https://i.pinimg.com/236x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg"
            alt=""
          />
          <div className="input-container">
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <button type="button" onClick={handleSignInClick}>
            Sign In
          </button>
        </form>
      </div>
      <div className={`form-container sign-up ${isSignUp ? "active" : ""}`}>
        <form className="form-b" onSubmit={handleSave}>
          <h1>Hello, Doctor!</h1>
          <p>Register with your personal details</p>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            name="speciality"
            type="text"
            placeholder="Speciality"
            value={user.speciality}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit" className="hidden" onClick={handleToggle}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className={`toggle ${isSignUp ? "active" : ""}`}>
          <div
            className={`toggle-panel toggle-left ${isSignUp ? "" : "active"}`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "active" : ""}`}
          >
            <h1>Hello, Doctor!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={handleToggle}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
