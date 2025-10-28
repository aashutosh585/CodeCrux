import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { assets } from "../assets/assets.js";
import { AppContent } from "../contexts/AppContext.jsx";
import { Code } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
  const [mode, setMode] = useState("Sign Up");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const inputClass = "flex items-center gap-3 w-full px-5 py-3 mb-4 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-emerald-400 transition-colors";
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const endpoint = mode === "Sign Up" ? "/api/auth/register" : "/api/auth/login";
      const payload = mode === "Sign Up" ? formData : { email: formData.email, password: formData.password };
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        toast.success(mode === "Sign Up" ? "Account created successfully!" : "Login successful!");
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-700 text-sm border border-emerald-100">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-3">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Crux</span>
          </span>
        </div>

        <button onClick={loginWithGoogle} className="w-full py-2 mb-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">Google Login</button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">{mode === "Sign Up" ? "Create Account" : "Welcome Back"}</h2>
        <p className="text-center text-sm mb-6 text-gray-600">{mode === "Sign Up" ? "Join our learning community today" : "Please sign in to your account"}</p>

        {/* Form */}
        <form onSubmit={onSubmitHandler}>
          {mode === "Sign Up" && (
            <div className={inputClass}>
              <img src={assets.person_icon} alt="Person Icon" className="w-5 h-5 opacity-60" />
              <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="bg-transparent outline-none text-gray-900 flex-1 placeholder-gray-500" />
            </div>
          )}
          <div className={inputClass}>
            <img src={assets.mail_icon} alt="Mail Icon" className="w-5 h-5 opacity-60" />
            <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required className="bg-transparent outline-none text-gray-900 flex-1 placeholder-gray-500" />
          </div>
          <div className={inputClass}>
            <img src={assets.lock_icon} alt="Lock Icon" className="w-5 h-5 opacity-60" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="bg-transparent outline-none text-gray-900 flex-1 placeholder-gray-500" />
          </div>

          {mode === "Login" && (
            <p onClick={() => navigate("/reset-password")} className="mb-4 text-emerald-600 cursor-pointer hover:text-emerald-700 text-center text-sm">Forgot Password?</p>
          )}

          <button type="submit" className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25">
            {mode === "Sign Up" ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Toggle between modes */}
        <p className="text-gray-500 text-center text-sm mt-4">
          {mode === "Sign Up" ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setMode(mode === "Sign Up" ? "Login" : "Sign Up")} className="text-emerald-600 cursor-pointer hover:text-emerald-700 font-medium">
            {mode === "Sign Up" ? "Login Here" : "Create new Account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
