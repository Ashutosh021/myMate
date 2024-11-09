import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/Feed";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <NavbarRender />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <FooterRender />
    </Router>
  );
}

function NavbarRender() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Navbar />
      )}
    </>
  );
}

function FooterRender() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Footer />
      )}
    </>
  );
}

export default App;
