import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
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

  return (
    <div>
      <h2>All Users</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
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
