import { useState } from "react";
import { login } from "../Utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await login(form);
      setLoading(false);

      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(res.message || res.error || "Login failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          className={`${
            loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-4 py-3 rounded-lg w-full font-semibold transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Forgot Password link */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-2 text-center text-sm text-gray-700">
          Not registered yet?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Click here
          </Link>
        </div>
      </motion.form>

      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </div>
  );
}
