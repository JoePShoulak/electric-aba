import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // Import the context
import AuthForm from "../../components/forms/AuthForm"; // Reuse the AuthForm component

const Signup = () => {
  const { setCurrentUser } = useUser(); // Get the setCurrentUser function from context
  const [formData, setFormData] = useState({
    username: "", // Update to use 'username'
    email: "",
    password: "",
    confirmPassword: "", // Confirm password field for signup
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Ensure the passwords match before sending the request
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send the signup request to backend with updated field
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData // 'username' is included here
      );

      const token = response.data.token;
      localStorage.setItem("token", token); // Store the token

      // Fetch the logged-in user's profile
      const userResponse = await axios.get(
        "http://localhost:5000/api/users/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentUser(userResponse.data); // Set user data in context
      navigate("/"); // Redirect to home page after successful signup
    } catch (err) {
      setError("Error creating account.");
      console.error(err);
    }
  };

  return (
    <main>
      <h2>Sign Up</h2>
      <AuthForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Sign Up"
        showConfirmPasswordField={true} // Show confirm password field for signup
        showNameField={true} // Show the name field for signup
      />
    </main>
  );
};

export default Signup;
