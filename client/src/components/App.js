import "./App.css";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      })
      .then(() => navigate("/dms/patients"));
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  else {
    console.log(user);
    // navigate("/dms/patients");
    return (
      <div className="App">
        <Outlet context={{ user, setUser }} />
      </div>
    );
  }
}

export default App;

