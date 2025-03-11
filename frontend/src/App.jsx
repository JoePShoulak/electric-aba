import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavBar, Header, Footer } from "./components";
import {
  Divisions,
  Home,
  Leagues,
  Login,
  Players,
  Profile,
  Signup,
  Teams,
} from "./pages";
import { UserProvider, useUser } from "./context/UserContext"; // Import UserProvider

const AppRoutes = () => {
  const { currentUser } = useUser(); // Access currentUser from context

  const protectedRoute = element => {
    return currentUser ? element : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={protectedRoute(<Profile />)} />
      <Route path="/leagues" element={protectedRoute(<Leagues />)} />
      <Route path="/divisions" element={protectedRoute(<Divisions />)} />
      <Route path="/teams" element={protectedRoute(<Teams />)} />
      <Route path="/players" element={protectedRoute(<Players />)} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <NavBar />
        <AppRoutes />
        <Footer />
      </Router>
    </UserProvider>
  );
};

// const App = () => <p>Hi</p>;

export default App;
