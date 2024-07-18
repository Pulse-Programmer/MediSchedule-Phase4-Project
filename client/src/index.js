import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
// import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointment from "./components/appoinment";
import Patient from "./components/patients";
import Login from "./components/Login";
import AboutUs from "./components/About";
import Doctors from "./components/Doctor";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dms/appointment/:id", element: <Appointment /> },
      { path: "/dms/patients", element: <Patient /> },
      { path: "/dms/profile", element: <Profile /> },
      { path: "/dms/about-us", element: <AboutUs /> },
      { path: "/dms", element: <Login /> },
      {path: "/doctors", element: <Doctors/>},
    ],
  },



]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
