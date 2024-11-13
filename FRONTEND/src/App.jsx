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
import Future from "./Components/Future/Future";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Aboutpage from "./Components/UserProfile/About";
import Userpost from "./Components/UserProfile/UserPosts";


function App() {
  return (
    <Router>
      <NavbarRender />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/infuture" element={<Future/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/user_profile/about/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/education/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/projects/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/posts/:id"
          element={
            <ProtectedRoute>
              <Userpost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/followers/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/following/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile/weblinks/:id"
          element={
            <ProtectedRoute>
              <Aboutpage />
            </ProtectedRoute>
          }
        />
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
