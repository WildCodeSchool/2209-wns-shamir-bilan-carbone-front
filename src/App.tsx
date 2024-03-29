import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/Login";
import Admin from "./pages/Admin/Admin";
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginreal" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
      </Routes>
    </div>
  );
}

export default App;
