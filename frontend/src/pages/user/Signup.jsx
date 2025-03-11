import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Import useUser hook
import { createUser } from "../../scripts/user";
import {
  EmailInput,
  PasswordConfirmInput,
  PasswordInput,
  UsernameInput,
} from "../../components/";

const Signup = () => {
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
        <UsernameInput value={formData.username} onChange={handleInputChange} />
        <EmailInput value={formData.email} onChange={handleInputChange} />
        <PasswordInput value={formData.password} onChange={handleInputChange} />
        <PasswordConfirmInput
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default Signup;
