import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignInClick = () => {
        navigate('/dms/profile');
    };

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`}>
           <div className="header-background">
                <h1>GOTHAM HOSPITAL</h1>
            </div>
            <div className={`form-container sign-in ${isSignUp ? 'active' : ''}`}>
                <form className="form-a">
                    <img className="image" src='https://i.pinimg.com/236x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg' alt='' />
                    <div className="input-container">
                        <input type="email" placeholder="Email" name="email" />
                    </div>
                    <div className="input-container">
                        <input type="password" placeholder="Password" name="password" />
                    </div>
                    <button type="button" onClick={handleSignInClick}>Sign In</button>
                </form>
            </div>
            <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
                <form className="form-b">
                    <h1>Hello, Doctor!</h1>
                    <p>Register with your personal details</p>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Speciality" />
                    <input type="password" placeholder="Password" />
                    <button type="button" className="hidden" onClick={handleToggle}>Sign Up</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className={`toggle ${isSignUp ? 'active' : ''}`}>
                    <div className={`toggle-panel toggle-left ${isSignUp ? '' : 'active'}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                    </div>
                    <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
                        <h1>Hello, Doctor!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" onClick={handleToggle}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;