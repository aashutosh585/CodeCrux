import React, { useContext } from 'react'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { Brain, Code, BookOpen, Users, Award, Zap, Book } from 'lucide-react'
import { useNavigate } from 'react-router'
import { AppContent } from '../contexts/AppContext.jsx'

const Feature = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AppContent);

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Get personalized coding guidance from our advanced AI mentor that adapts to your learning style.",
    color: "from-purple-500 to-pink-500",
    path: '/mentor-ai'
  },
  {
    icon: BookOpen,
    title: "Popular coding Sheets",
    description: "Access curated collections of coding problems from top companies and competitive programming contests.",
    color: "from-indigo-500 to-purple-500",
    path: '/sheet'
  },
  {
    icon: Code,
    title: "Comprehensive Tutorials",
    description: "Access step-by-step tutorials covering everything from basics to advanced concepts.",
    color: "from-yellow-500 to-orange-500",
    path: '/tutorials'
  },
  {
    icon: Zap,
    title: "DSA - RoadMap",
    description: "Master Data Structures and Algorithms with our structured learning path for interviews and problem-solving.",
    color: "from-green-500 to-lime-500",
    path: '/roadmap'
  },
  {
    icon: Award,
    title: "Achievement Tracking",
    description: "Track your progress and earn points as you complete tutorials and coding challenges.",
    color: "from-blue-500 to-cyan-500",
    path: '/dashboard'
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow learners and get help from our active coding community.",
    color: "from-red-500 to-pink-500",
    path: '/profile'
  },
];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Features Section */}
      <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Why Choose CodeCrux?
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              We provide everything you need to become a successful programmer, from beginner to expert level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => {
                  if (feature.path) {
                    if (isLoggedIn) {
                      navigate(feature.path);
                    } else {
                      navigate('/login');
                    }
                  }
                }}
                className={`${isDarkMode ? 'bg-gray-900/60 border-gray-700/50' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg border group cursor-pointer`}
                style={{ pointerEvents: feature.path ? 'auto' : 'none', opacity: feature.path ? 1 : 0.6 }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(feature.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Feature
