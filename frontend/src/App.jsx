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
  League,
  LeagueEdit,
  Leagues,
  Login,
  Players,
  Profile,
  Signup,
  Team,
  TeamEdit,
  Teams,
} from "./pages";
import { UserProvider, useUser } from "./context/UserContext"; // Import UserProvider
import Player from "./pages/player/Player";
import PlayerEdit from "./pages/player/PlayerEdit";

const AppRoutes = () => {
  const { currentUser } = useUser(); // Access currentUser from context

  const userAuth = element => {
    return currentUser ? element : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={userAuth(<Profile />)} />
      <Route path="/divisions" element={userAuth(<Divisions />)} />

      <Route path="/players" element={userAuth(<Players />)} />
      <Route path="/players/:id" element={userAuth(<Player />)} />
      <Route path="/players/:id/edit" element={userAuth(<PlayerEdit />)} />

      <Route path="/teams" element={userAuth(<Teams />)} />
      <Route path="/teams/:id" element={userAuth(<Team />)} />
      <Route path="/teams/:id/edit" element={userAuth(<TeamEdit />)} />

      <Route path="/leagues" element={userAuth(<Leagues />)} />
      <Route path="/leagues/:id" element={userAuth(<League />)} />
      <Route path="/leagues/:id/edit" element={userAuth(<LeagueEdit />)} />
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
