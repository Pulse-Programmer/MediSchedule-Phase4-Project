import React from "react";
import { Link } from "react-router-dom";


function Navbar(){
    return(
        <nav className="navbar">
           <img src="https://i.pinimg.com/236x/3d/58/7b/3d587b89267367e0e3d012150bb90ff8.jpg" alt=""/>
            <ul className="nav-menu"> 
                <li className="nav-item">
                    <Link to="/dms" className="nav-links">
                    <h4>login</h4>
                    </Link>  
 
                </li>
                <li className="nav-item">
                    <Link to="/dms/profile" className="nav-links">
                    <h4>Profile</h4>
                    </Link>  
                 </li>

                 <li className="nav-item">
                    <Link to="/dms/patients" className="nav-links">
                    <h4>Patients</h4>
                    </Link>
                 </li>
                 
               
                
                
                </ul> 
        </nav>
    )
}

export default Navbar;