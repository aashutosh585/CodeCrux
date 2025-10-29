import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { AppContent } from '../contexts/AppContext.jsx'
import { Code, Sparkles } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate();
  const { userData, isLoggedIn, setUserData, setIsLoggedIn, backendUrl } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {   
        navigate('/email-verify');
        toast.success(data.message);
      } 
      else{
        toast.error(data.message);
      }
      
    } catch (error) { 
      toast.error(error.message);
    }
  };

  const Logout = async () => {
    try{
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'} shadow-lg shadow-black/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Crux</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800/60 text-white hover:bg-gray-700/60' : 'bg-gray-100/60 text-gray-900 hover:bg-gray-200/60'} backdrop-blur-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-black/5`}
            >
              <Sparkles className="w-5 h-5" />
            </button>

            {isLoggedIn ? (
              <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
                {userData ? userData.name[0].toUpperCase() : 'U'}
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                  <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                    { !userData?.isAccountVerified &&
                      <li onClick={sendVerificationOtp} className='px-1 py-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
                    }
                    <li onClick={Logout} className='px-1 py-2 hover:bg-gray-200 cursor-pointer pr-10'>LogOut</li>
                  
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
