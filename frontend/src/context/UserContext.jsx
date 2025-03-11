import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the UserContext
const UserContext = createContext();

// Create the custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to provide the context value to the rest of the app
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setCurrentUser(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
