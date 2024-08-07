import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/dms"));
  }
  return (
    <nav className="navbar">
      <img
        src="https://i.pinimg.com/236x/3d/58/7b/3d587b89267367e0e3d012150bb90ff8.jpg"
        alt=""
      />
      <h3 style={{ color: "white", marginRight: "42rem" }}>Dr. {user.name}</h3>
      <ul className="nav-menu">
  
        <li className="nav-item">
          <Link to="/dms/patients" className="nav-links">
            <h4>Patients</h4>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/doctors" className="nav-links">
            <h4>Doctors</h4>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/dms/about-us" className="nav-links">
            <h4>About Us</h4>
          </Link>
        </li>

        <li className="nav-item">
          <button className="nav-links" onClick={handleLogoutClick}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
