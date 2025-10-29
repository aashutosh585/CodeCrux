import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../contexts/AppContext";
import { Code } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const inputs = useRef([]);

  const focusNext = (index) => {
    if (index < inputs.current.length - 1) inputs.current[index + 1]?.focus();
  };

  const focusPrev = (index) => {
    if (index > 0) inputs.current[index - 1]?.focus();
  };

  const handleInput = (e, index) => e.target.value && focusNext(index);
  const handleKeyDown = (e, index) => e.key === "Backspace" && !e.target.value && focusPrev(index);

  const handlePaste = (e) => {
    e.clipboardData.getData("text").split("").forEach((char, i) => {
      if (inputs.current[i]) inputs.current[i].value = char;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otp = inputs.current.map((input) => input.value).join("");
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, { otp });
      data.success ? (toast.success(data.message), getUserData(), navigate("/")) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      <img src={assets.logo} alt="logo" onClick={() => navigate("/")} className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-sm border border-emerald-100">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-3">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Crux</span>
          </span>
        </div>
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-4">Verify Your Email</h1>
        <p className="text-center mb-6 text-gray-600">Enter the 6-digit code sent to your email address.</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array.from({ length: 6 }, (_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              required
              className="w-12 h-12 bg-gray-50 border border-gray-200 focus:border-emerald-400 text-gray-900 text-center text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
              ref={(el) => (inputs.current[i] = el)}
              onInput={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25">Verify Email</button>
      </form>
    </div>
  );
};

export default EmailVerify;
