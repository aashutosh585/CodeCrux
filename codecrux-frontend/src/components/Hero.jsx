import React from 'react'
import { useNavigate } from 'react-router'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { Play, ArrowRight } from 'lucide-react'
import MentorAIImage from '../assets/MentorAI.jpg'

const Hero = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "Coding Projects" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
  ]

  return (
    <section className={`pt-24 pb-20 px-4 relative overflow-hidden min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="text-left">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Master Coding with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                AI-Powered Learning
              </span>
            </h1>
            
            <p className={`text-base md:text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-lg`}>
              Transform your coding journey with personalized AI mentorship, interactive projects, and a supportive community. 
              Learn faster, code better, and achieve your programming goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium text-base flex items-center space-x-2 group shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.02]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className={`${isDarkMode ? 'bg-gray-800/60 text-white border-gray-700/50' : 'bg-white/60 text-gray-900 border-gray-200/50'} backdrop-blur-sm border px-6 py-3 rounded-lg hover:scale-[1.02] transition-all duration-200 font-medium text-base flex items-center space-x-2 shadow-md hover:shadow-lg`}>
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - MentorAI Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.03] group-hover:shadow-green-500/20">
                <img 
                  src={MentorAIImage} 
                  alt="MentorAI - Your AI Coding Assistant" 
                  className="w-full h-auto max-w-sm object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Animation Elements with Text */}
              <div className="absolute -top-8 -left-8 group/bubble">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg animate-float flex items-center justify-center cursor-pointer">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Smart Code Analysis
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 group/bubble" style={{animationDelay: '1s'}}>
                <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full shadow-lg animate-float flex items-center justify-center cursor-pointer">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Real-time Help
                </div>
              </div>

              <div className="absolute top-1/4 -right-10 group/bubble" style={{animationDelay: '0.5s'}}>
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg animate-float flex items-center justify-center cursor-pointer">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  24/7 Support
                </div>
              </div>

              <div className="absolute top-3/4 -left-10 group/bubble" style={{animationDelay: '1.5s'}}>
                <div className="w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg animate-float flex items-center justify-center cursor-pointer">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Learn Fast
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-2xl opacity-10 group-hover:opacity-15 transition-opacity duration-300 scale-105"></div>
            </div>

            {/* Floating Text */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="text-center">
                <div className={`text-base md:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                    Meet Your AI Mentor
                  </span>
                </div>
                <div className="flex space-x-1 justify-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
