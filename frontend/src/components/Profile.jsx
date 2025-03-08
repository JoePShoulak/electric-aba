import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }) => {
  const [user, setUser] = useState(null); // For holding the user profile data
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams(); // Get user ID from the URL

  useEffect(() => {
    // Fetch the user's profile based on ID in URL
    axios
      .get(`http://localhost:5000/api/users/profile/${id}`)
      .then(response => {
        setUser(response.data); // Set the fetched profile data
        setUsername(response.data.username); // Populate the input fields
        setEmail(response.data.email);
      })
      .catch(err => {
        setError("Error fetching user profile.");
        console.error(err);
      });
  }, [id]); // Re-fetch if the user ID changes

  const handleEdit = () => {
    if (currentUser && currentUser._id === user._id) {
      setEditMode(true); // Allow the logged-in user to edit their profile
    } else {
      setError("You cannot edit this profile.");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedData = { username, email };

    // Send PUT request to update profile (only if logged in as this user)
    axios
      .put("http://localhost:5000/api/users/profile", updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setUser(response.data); // Update the profile data after successful edit
        setEditMode(false); // Disable editing mode
        setCurrentUser(response.data); // Update the current user data in app state
      })
      .catch(err => {
        setError("Error updating user profile.");
        console.error(err);
      });
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading until profile data is fetched
  }

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      {error && <p>{error}</p>}

      {editMode ? (
        // Edit mode - form to update profile
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        // View mode - display user details
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {currentUser && currentUser._id === user._id && (
            <button onClick={handleEdit}>Edit Profile</button> // Only allow editing for the logged-in user
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
