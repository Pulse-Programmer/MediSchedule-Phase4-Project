import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Appointment from './components/appointment';
import Patient from './components/patient';
import Login from './components/login';
import Profile from './components/profile';



const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  { 
    path: "/",
     element: <App /> 
  },
  { 
    path:"/dms/patients",
    element: <Patient /> 
  },
  {
    path:"/dms",
    element:<Login/>
  },
  {
    path:"/dms/appointment/:id",
    element:<Appointment/>
  },
  {
    path: "/dms/profile",
    element: <Profile/>
  }
    
  
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

