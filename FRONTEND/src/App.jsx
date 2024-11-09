import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home"
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Router>
      <NavbarRender />
      <Routes>
      <Route path="/" element={<Home />}/>
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
        <Footer/>
      )}
    </>
  );
}

export default App;
