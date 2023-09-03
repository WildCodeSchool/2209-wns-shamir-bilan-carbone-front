import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Recap from "./pages/Profile/Recap";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/Login";
import Admin from "./pages/Admin/Admin";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Legal from "./pages/Legal/Legal";

function App() {
  console.log(localStorage.getItem("token"));
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginreal" element={<LogIn />} />
        <Route path="/profile/recipes" element={<Profile />} />
        <Route path="/profile/recap/:userId" element={<Recap />} />
        <Route path="/mentions-legales" element={<Legal />} />

        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
