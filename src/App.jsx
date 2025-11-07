// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/DashBoard";
// import Room from "./Pages/Room";
// import PrivateRoute from "./components/PrivateRoute";
// import ForgotPassword from "./Pages/ForgotPassword";
// import ResetPassword from "./Pages/ResetPassword";
// import Home from "./Pages/Home";
// import Navbar from "./components/Navbar";
// import { useState, useEffect } from "react";

// export default function App() {
//   const [isAuthed, setIsAuthed] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthed(!!token);
//   }, []);

//   // Hide navbar on auth-related pages
//   const hideNavbar = ["/login", "/signup", "/forgot", "/reset-password"].includes(
//     location.pathname
//   );

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!hideNavbar && <Navbar isAuthed={isAuthed} setIsAuthed={setIsAuthed} />}

//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* if already logged in -> redirect to dashboard */}
//         <Route
//           path="/signup"
//           element={isAuthed ? <Navigate to="/dashboard" /> : <Signup />}
//         />
//         <Route
//           path="/login"
//           element={isAuthed ? <Navigate to="/dashboard" /> : <Login />}
//         />

//         <Route path="/forgot" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/room/:roomId"
//           element={
//             <PrivateRoute>
//               <Room />
//             </PrivateRoute>
//           }
//         />

//         {/* fallback */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </div>
//   );
// }

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Room from "./Pages/Room";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthed(!!token);

    // listen for login/logout changes across tabs
    const handleStorage = () => {
      const newToken = localStorage.getItem("token");
      setIsAuthed(!!newToken);
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [location.pathname]);

  // Hide navbar on auth-related pages
  const hideNavbar =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/forgot") ||
    location.pathname.startsWith("/reset-password");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar isAuthed={isAuthed} setIsAuthed={setIsAuthed} />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Redirect if already logged in */}
        <Route
          path="/signup"
          element={isAuthed ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthed ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/room/:roomId"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Toaster/> */}
    </div>
  );
}

