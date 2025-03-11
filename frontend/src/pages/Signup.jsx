import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import useUser hook

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [error, setError] = useState("");
  const { setCurrentUser } = useUser(); // Access setCurrentUser from context
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send signup request
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
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is sent
        }
      );

      setCurrentUser(userResponse.data); // Set user data in context
      navigate("/"); // Redirect to home after successful signup
    } catch (err) {
      setError("Invalid credentials or error logging in.");
      console.error(err);
    }
  };

  return (
    <main>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
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
    </main>
  );
};

export default Signup;
