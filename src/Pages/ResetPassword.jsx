import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing from the URL.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      toast.success("Password has been reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-sm text-white transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded-xl bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-white text-purple-700 hover:bg-purple-100"
          }`}
        >
          {loading ? "Resetting..." : "Reset"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}

export default ResetPassword;
