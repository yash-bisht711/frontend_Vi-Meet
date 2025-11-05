// // import { Link } from "react-router-dom";

// // export default function Navbar({ isAuthed, setIsAuthed }) {
// //   return (
// //     <nav className="p-4 bg-gray-800 text-white flex items-center justify-between shadow-md">
// //       {/* Left - Logo / Dashboard */}
// //       <div>
// //         <Link to="/dashboard" className="text-lg font-bold hover:text-yellow-400 transition">
// //           Dashboard
// //         </Link>
// //       </div>

// //       {/* right - Auth Links */}
// //       <div className="flex gap-4 mx-30">
// //         {!isAuthed && (
// //           <>
// //             <Link to="/signup" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition">
// //               Signup
// //             </Link>
// //             <Link to="/login" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition">
// //               Login
// //             </Link>
// //           </>
// //         )}
// //       </div>

// //       {/* Right - Logout */}
// //       <div>
// //         {isAuthed && (
// //           <button
// //             onClick={() => {
// //               localStorage.removeItem("token");
// //               setIsAuthed(false);
// //               window.location.href = "/login";
// //             }}
// //             className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
// //           >
// //             Logout
// //           </button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// import { Link } from "react-router-dom";
 
// export default function Navbar({ isAuthed, setIsAuthed }) {
//   return (
//     <nav className="sticky top-0 p-4 bg-transparent text-white flex items-center justify-between shadow-md">
//       {/* Left - Logo / Dashboard */}
//       {
//         !isAuthed ?<div><img src="/logo.svg" alt="app_img"/></div> : <div>
//         <Link
//           to="/dashboard"
//           className="text-lg font-bold text-black hover:text-yellow-400 transition"
//         >
//           Dashboard
//         </Link>
//       </div>
//       }

//       {/* Right - Auth / Logout */}
//       <div className="flex gap-4">
//         {!isAuthed ? (
//           <>
//             <Link
//               to="/signup"
//               className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
//             >
//               Signup
//             </Link>
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
//             >
//               Login
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               setIsAuthed(false);
//               window.location.href = "/login";
//             }}
//             className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"
import Logo from "../assets/logo.svg"

export default function Navbar({ isAuthed, setIsAuthed }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthed(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Logo or Dashboard */}
          <div className="flex-shrink-0">
            {!isAuthed ? (
              <div className="flex gap-2"><img src={Logo} alt="Vi-Meet Logo" className="h-8 w-8" /><span className="
              mt-1.5">Vi-Meet</span></div> 
            ) : (
              <Link
                to="/dashboard"
                className="text-xl font-bold hover:text-yellow-400 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Hamburger icon (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Right - Nav links (hidden on mobile) */}
          <div className="hidden md:flex gap-4">
            {!isAuthed ? (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu (shown only when isOpen) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-3 bg-gray-800">
          {!isAuthed ? (
            <>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
