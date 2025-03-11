import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import useUser hook

const NavBar = () => {
  const { currentUser, logout } = useUser(); // Access currentUser and logout from context

  return (
    <nav>
      <div>
        <Link to="/">Home</Link> |
        {currentUser ? (
          <>
            <Link to="/leagues">Leagues</Link> |
            <Link to="/divisions">Divisions</Link> |
            <Link to="/teams">Teams</Link> |<Link to="/players">Players</Link> |
            <Link to="/profile">Profile</Link> |
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
