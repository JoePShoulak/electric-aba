import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Leagues from "./pages/Leagues";
import Divisions from "./pages/Divisions";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Login from "./components/Login";
import Signup from "./components/Signup";
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
        .then(response => {
          setCurrentUser(response.data);
        })
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
      <NavBar currentUser={currentUser} logout={logout} />
      <div>
        <Routes>
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/signup"
            element={<Signup setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/leagues"
            element={
              currentUser ? <Leagues /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/divisions"
            element={
              currentUser ? <Divisions /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/teams"
            element={currentUser ? <Teams /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/players"
            element={
              currentUser ? <Players /> : <Navigate to="/login" replace />
            }
          />

          <Route path="/" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
