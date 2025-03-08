import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserList from "./components/UserList";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if a token exists in localStorage and validate it
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, fetch user data from the backend to verify the token
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          console.log("User data:", response.data); // Check the response
          setCurrentUser(response.data); // Set the current user if token is valid
        })
        .catch(() => {
          localStorage.removeItem("token"); // Remove invalid token
          setCurrentUser(null);
        });
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null); // Clear the current user when logging out
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          {currentUser ? (
            <>
              <Link to="/profile">Profile</Link> |{" "}
              <button onClick={logout}>Logout</button>{" "}
              {/* Logout button only if logged in */}
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link> |{" "}
              {/* Sign Up link only if logged out */}
              <Link to="/login">Login</Link>{" "}
              {/* Login link only if logged out */}
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<UserList currentUser={currentUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile user={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
