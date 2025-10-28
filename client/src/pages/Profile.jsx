import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AppContent } from '../contexts/AppContext.jsx';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { Code, User, Mail, Shield, ShieldCheck, Key, Award, Trophy, Target, Settings } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { isDarkMode } = useDarkMode();
  const { userData, backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Default values for now - can be enhanced later with real progress data
  const sheetsCount = userData?.completedSheets?.length || 0;
  const tutorialsCount = userData?.completedTutorials?.length || 0;
  const totalScore = (sheetsCount * 10) + (tutorialsCount * 5); // Example scoring
  const aiMentorSessions = 0; // Default for now

  const containerClass = isDarkMode ? 'bg-gray-800/60 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardClass = `rounded-2xl p-6 ${containerClass} border backdrop-blur-sm`;

  const getUserInitial = () => userData?.name?.charAt(0).toUpperCase() || 'U';

  const sendVerificationOtp = async () => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => navigate('/reset-password');

  if (!userData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Please log in to view your profile
          </h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const ProfileField = ({ icon: Icon, label, value, action }) => (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm ${mutedText}`}>{label}</p>
        <div className="flex items-center space-x-2">
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {action}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className={cardClass}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{getUserInitial()}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className={mutedText}>Manage your profile and track your progress</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className={cardClass}>
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
          <div className="space-y-4">
            <ProfileField icon={User} label="Full Name" value={userData.name} />
            <ProfileField icon={Mail} label="Email Address" value={userData.email} />
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${
                userData.isAccountVerified ? 'bg-green-100' : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } flex items-center justify-center`}>
                {userData.isAccountVerified ? (
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                ) : (
                  <Shield className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${mutedText}`}>Email Verification</p>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${
                    userData.isAccountVerified ? 'text-green-600' : isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {userData.isAccountVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  {!userData.isAccountVerified && (
                    <button
                      onClick={sendVerificationOtp}
                      disabled={loading}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {loading ? 'Sending...' : 'Verify Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className={cardClass}>
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Learning Progress</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Trophy, label: 'Total Score', value: totalScore, color: 'text-yellow-500' },
              { icon: Target, label: 'Sheets', value: sheetsCount, color: 'text-green-500' },
              { icon: Award, label: 'Tutorials', value: tutorialsCount, color: 'text-blue-500' },
              { icon: Code, label: 'AI Sessions', value: aiMentorSessions, color: 'text-purple-500' }
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className={`text-sm ${mutedText}`}>{label}</span>
                </div>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className={cardClass}>
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Account Settings</h2>
          <button
            onClick={handleResetPassword}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl border transition-colors ${
              isDarkMode
                ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Key className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className="text-left">
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reset Password</p>
              <p className={`text-sm ${mutedText}`}>Change your account password</p>
            </div>
          </button>
        </div>

        {/* Admin Panel - Only visible to admin email */}
        {userData?.email === 'ashutoshmaurya585@gmail.com' && (
          <div className={cardClass}>
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h2>
            <button
              onClick={() => navigate('/admin')}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'border-emerald-600 hover:border-emerald-500 hover:bg-emerald-900/20'
                  : 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</p>
                <p className={`text-sm ${mutedText}`}>Manage sheets, tutorials and view analytics</p>
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
