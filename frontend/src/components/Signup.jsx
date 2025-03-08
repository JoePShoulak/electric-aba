import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          username,
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage

      // Fetch the logged-in user's profile
      const userResponse = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCurrentUser(userResponse.data); // Set user in app state
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError("Invalid credentials or error logging in.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} // Handle confirm password
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
