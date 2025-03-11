// AuthForm.js
import React from "react";

const AuthForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  error,
  buttonText,
  showConfirmPasswordField,
  showNameField, // New prop to control whether name field is shown
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {showNameField && (
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Userame"
          onChange={handleInputChange}
        />
      )}
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
      />
      {showConfirmPasswordField && (
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
      )}
      {error && <p>{error}</p>}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
