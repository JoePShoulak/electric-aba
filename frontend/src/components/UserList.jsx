import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate to profile pages
import { useUser } from "../context/UserContext"; // Import the custom UserContext hook
import { getAllUsers, deleteUser } from "../scripts/user";

const UserList = () => {
  const { currentUser, setCurrentUser } = useUser(); // Access currentUser and setCurrentUser from context
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const cleanupDelete = userId => {
    setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the UI
    setCurrentUser(null); // Clear the currentUser state after deletion
    localStorage.removeItem("token"); // Remove the token from localStorage
  };

  useEffect(() => getAllUsers(setUsers, setError), []);

  const User = ({ user }) => (
    <li key={user._id}>
      <Link to={`/profile/${user._id}`}>{user.username}</Link>
      <p>Email: {user.email}</p>
      {currentUser && currentUser._id === user._id && (
        <button onClick={() => deleteUser(user._id, cleanupDelete, setError)}>
          Delete
        </button>
      )}
    </li>
  );

  if (users.length == 0) return <p>No users found.</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {users.map(user => (
          <User key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
