import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link to navigate to profile pages

const UserList = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all users when the component mounts
    axios
      .get("http://localhost:5000/api/users/all")
      .then(response => {
        setUsers(response.data); // Set the users state with the fetched data
      })
      .catch(err => {
        setError("Error fetching users.");
        console.error(err);
      });
  }, []); // Empty dependency array means this runs once after the component mounts

  // Function to handle user deletion
  const handleDelete = userId => {
    // Send a DELETE request to the backend to delete the user
    axios
      .delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the UI
        setCurrentUser(null); // Clear the currentUser state after deletion
        localStorage.removeItem("token"); // Remove the token from localStorage
      })
      .catch(err => {
        setError("Error deleting the user.");
        console.error(err);
      });
  };

  return (
    <div>
      <h2>All Users</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              {/* Make username a clickable link */}
              <Link to={`/profile/${user._id}`}>{user.username}</Link>
              <p>Email: {user.email}</p>
              {currentUser && currentUser._id === user._id && (
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              )}
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
