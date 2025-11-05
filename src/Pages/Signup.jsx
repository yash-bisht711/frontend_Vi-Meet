import { useState } from "react";
import { signup } from "../Utils/api";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await signup(form);
      setLoading(false);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(res.message || res.error || "Signup failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 🔳 Blurred Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/download.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />

      {/* 🔳 Overlay Gradient for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black opacity-80 z-10"></div>

      {/* 🔳 Form Content */}
      <div className="relative z-20 flex w-full h-full items-center justify-center">
        <motion.form
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl shadow-2xl w-96 bg-white/10 backdrop-blur-lg border border-white/20"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border-none outline-none p-3 w-full mb-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border-none outline-none p-3 w-full mb-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border-none outline-none p-3 w-full mb-6 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <motion.button
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold rounded-xl shadow-lg transition`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>

          <div className="text-sm text-white mt-4 text-center">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-indigo-300 font-medium"
            >
              Login here
            </Link>
          </div>
        </motion.form>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer position="bottom-right" autoClose={1500} theme="dark" />
    </div>
  );
}
