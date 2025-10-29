import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { AppContent } from "../contexts/AppContext";
import { Code } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((input) => input.value).join("");
    setOtp(otpValue);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const FormContainer = ({ children, title, subtitle, onSubmit }) => (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-sm border border-emerald-100">
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-3">
          <Code className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">
          Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Crux</span>
        </span>
      </div>
      <h1 className="text-gray-900 text-2xl font-bold text-center mb-4">{title}</h1>
      <p className="text-center mb-6 text-gray-600">{subtitle}</p>
      {children}
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {!isEmailSent && (
        <FormContainer
          title="Reset Password"
          subtitle="Enter your registered email address"
          onSubmit={onSubmitEmail}
        >
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-emerald-400 transition-colors">
            <img src={assets.mail_icon} alt="mail_icon" className="w-5 h-5 opacity-60" />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none text-gray-900 flex-1 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25">
            Send Reset Code
          </button>
        </FormContainer>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <FormContainer
          title="Enter Verification Code"
          subtitle="Enter the 6-digit code sent to your email."
          onSubmit={onSubmitOTP}
        >
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 bg-gray-50 border border-gray-200 focus:border-emerald-400 text-gray-900 text-center text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25">
            Verify Code
          </button>
        </FormContainer>
      )}

      {isEmailSent && isOtpSubmitted && (
        <FormContainer
          title="Create New Password"
          subtitle="Enter your new password below"
          onSubmit={onSubmitNewPassword}
        >
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-emerald-400 transition-colors">
            <img src={assets.lock_icon} alt="lock_icon" className="w-5 h-5 opacity-60" />
            <input
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-gray-900 flex-1 placeholder-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25">
            Update Password
          </button>
        </FormContainer>
      )}
    </div>
  );
};

export default ResetPassword;
