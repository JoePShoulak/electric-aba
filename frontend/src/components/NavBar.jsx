import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserProvider

const NavBar = () => {
  const { currentUser, logout } = useUser(); // Access currentUser from context

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/leagues">Leagues</NavLink>
          <NavLink to="/divisions">Divisions</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
