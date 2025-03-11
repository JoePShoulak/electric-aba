import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useUser } from "../context/UserContext"; // Import the context
import { loginUser } from "../scripts/user";

const Login = () => {
  // Define formData to hold email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useUser(); // Access setCurrentUser from context
  const navigate = useNavigate(); // Initialize the navigate function

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
      navigate("/");
    };

    loginUser(formData, onSuccess, setError);
  };

  return (
    <main>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email" // Ensure the name attribute matches the key in formData
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password" // Ensure the name attribute matches the key in formData
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Log In</button>
      </form>
    </main>
  );
};

export default Login;
