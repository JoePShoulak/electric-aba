import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavBar, UserList, Header, Footer } from "./components";
import {
  Divisions,
  Leagues,
  Login,
  Players,
  Profile,
  Signup,
  Teams,
} from "./pages";
import { UserProvider, useUser } from "./context/UserContext"; // Import UserProvider

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

const AppRoutes = () => {
  const { currentUser } = useUser(); // Access currentUser from context

  const protectedRoute = element => {
    return currentUser ? element : <Navigate to="/login" replace />;
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={protectedRoute(<Profile />)} />
        <Route path="/leagues" element={protectedRoute(<Leagues />)} />
        <Route path="/divisions" element={protectedRoute(<Divisions />)} />
        <Route path="/teams" element={protectedRoute(<Teams />)} />
        <Route path="/players" element={protectedRoute(<Players />)} />
      </Routes>
    </div>
  );
};

export default App;
