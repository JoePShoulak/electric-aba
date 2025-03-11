import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import useUser hook
import { createUser } from "../scripts/user";

const Signup = () => {
  // Define formData object to hold all credentials
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useUser(); // Access setCurrentUser from context
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleInputChange = e => {
    const { name, value } = e.target; // Get the field name and value
    setFormData(prevData => ({
      ...prevData,
      [name]: value, // Update the corresponding field dynamically
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const onSuccess = userData => {
      setCurrentUser(userData);
      navigate("/"); // Redirect to home after successful signup
    };

    createUser(formData, onSuccess, setError);
  };

  return (
    <main>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username" // Match the name attribute to the formData key
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email" // Match the name attribute to the formData key
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password" // Match the name attribute to the formData key
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword" // Match the name attribute to the formData key
          value={formData.confirmPassword}
          onChange={handleInputChange} // Handle confirm password
        />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default Signup;
