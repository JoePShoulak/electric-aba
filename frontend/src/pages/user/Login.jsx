import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // Import the context
import AuthForm from "../../components/forms/AuthForm";

const Login = () => {
  const { setCurrentUser } = useUser(); // Get the setCurrentUser function from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Fetch the logged-in user's profile
      const userResponse = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Set user data in context
      setCurrentUser(userResponse.data);
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      setError("Invalid credentials or error logging in.");
      console.error(err);
    }
  };

  return (
    <main>
      <h2>Login</h2>
      <AuthForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Log In"
        showConfirmPasswordField={false} // No confirm password field in login
      />
    </main>
  );
};

export default Login;
