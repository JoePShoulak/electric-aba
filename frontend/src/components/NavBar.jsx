import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserProvider

const NavBar = () => {
  const { currentUser, logout } = useUser(); // Access currentUser from context

  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/leagues">Leagues</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/players">Players</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
