import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile"; // Import Profile component
import UserList from "./components/UserList";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => setCurrentUser(response.data))
        .catch(() => {
          localStorage.removeItem("token");
          setCurrentUser(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          {currentUser ? (
            <>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <UserList
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/signup"
            element={<Signup setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/profile/:id"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
