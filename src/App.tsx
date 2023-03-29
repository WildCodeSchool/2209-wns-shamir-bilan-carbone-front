import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";
import Nav from "./components/Navigation/Nav";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/Login";

function App() {
  return (
    <div>
      <Navigation />
      {/* <Nav /> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/loginreal" element={<LogIn />} />

        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
