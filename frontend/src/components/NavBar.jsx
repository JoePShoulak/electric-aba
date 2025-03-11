import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ currentUser, logout }) => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link> |
        {currentUser ? (
          <>
            <Link to="/leagues">Leagues</Link> |
            <Link to="/divisions">Divisions</Link> |
            <Link to="/teams">Teams</Link> |<Link to="/players">Players</Link> |
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link> |<Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
