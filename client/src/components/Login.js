import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";

function Login({ onLogin }) {
  let navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [dict, setDict] = useState({
    name: "",
    email: "",
    speciality: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to hold error messages

  

  // const formSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(8, "Password must be at least 8 characters")
  //     .required("Password is required"),
  // });

  function handleChange(e) {
    const { name, value } = e.target;
    setDict((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

 

  function handleSave(e) {
    // console.log(user);
    e.preventDefault();

    if (isSignUp) {
      // Sign up new user
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dict),
      }).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              //   console.log(data);
              onLogin(data);
              //clear form after saving
              setDict({
                name: "",
                email: "",
                speciality: "",
                password: "",
              });

              // setIsSignUp(false); // Switch back to login after successful signup
            })
            .then(() => navigate("/dms/patients"));
        } else {
          setError("Failed to sign up");
        }
      });
    } else {
      // Log in existing user
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dict),
      }).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              onLogin(data);
              // setIsSignUp(false); // Switch back to login after successful signup
            })
            .then(() => navigate("/dms/patients"));
        } else {
          res.json().then((err) => setError(err.message));
        }
      });
    }
  }

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Reset error when toggling between login and signup forms
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <div className="header-background">
        <h1>BLOSSOM HEALTHCARE</h1>
        
      </div>
      <div className={`form-container sign-in ${isSignUp ? "active" : ""}`}>
        <form className="form-a" onSubmit={handleSave}>
          <img
            className="image"
            src="https://i.pinimg.com/236x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg"
            alt=""
          />
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={dict.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={dict.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{isSignUp ? "LOG IN" : "LOG IN"}</button>
          {error && (
            <p style={{ color: "red", fontSize: 16, marginTop: "12px" }}>
              {error}
            </p>
          )}
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
            value={dict.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={dict.email}
            onChange={handleChange}
          />
          <input
            name="speciality"
            type="text"
            placeholder="Speciality"
            value={dict.speciality}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={dict.password}
            onChange={handleChange}
          />
          <button type="submit" className="hidden">
            {isSignUp ? "SIGN UP" : "LOG IN"}
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
            <button type="button" onClick={handleToggle}>
              BACK TO LOGIN
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "active" : ""}`}
          >
            <h1>Hello, Doctor!</h1>
            <p>Register with your personal details to use all site features</p>
            <button type="button" onClick={handleToggle}>
              CREATE ACCOUNT
            </button>
          </div>
        </div>
        {error && (
          <p
            className="error-message"
            style={{ color: "red", fontSize: 16, marginTop: "12px" }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
