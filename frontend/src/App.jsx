import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";
import Leagues from "./pages/Leagues";
import Divisions from "./pages/Divisions";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { UserProvider, useUser } from "./context/UserContext"; // Import UserProvider

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

const AppRoutes = () => {
  const { currentUser } = useUser(); // Access the currentUser from context

  const protectedRoute = element => {
    return currentUser ? element : <Navigate to="/login" replace />;
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leagues" element={protectedRoute(<Leagues />)} />
        <Route path="/divisions" element={protectedRoute(<Divisions />)} />
        <Route path="/teams" element={protectedRoute(<Teams />)} />
        <Route path="/players" element={protectedRoute(<Players />)} />
        <Route path="/profile" element={protectedRoute(<Profile />)} />
      </Routes>
    </div>
  );
};

export default App;
