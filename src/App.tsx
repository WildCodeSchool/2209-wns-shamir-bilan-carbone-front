import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
