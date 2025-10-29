import React, { useState, useContext } from 'react'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { AppContent } from '../contexts/AppContext.jsx'
import { Brain,Code2,BookOpen,Award,Clock,Target } from 'lucide-react'

const Dashboard = () => {
  const { isDarkMode } = useDarkMode()
  const { userData, isLoggedIn } = useContext(AppContent)
  const [loading, setLoading] = useState(false)

  // Get actual data from user context
  const completedSheets = userData?.completedSheets?.length || 0
  const completedTutorials = userData?.completedTutorials?.length || 0
  const totalCompleted = completedSheets + completedTutorials
  const chatHistoryCount = userData?.history?.length || 0

  // Simple test render first
  return (
    <div className="h-full p-6">
      <div className={`max-w-6xl mx-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Completed</p>
                <h2 className="text-2xl font-bold">{totalCompleted}</h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI Messages</p>
                <h2 className="text-2xl font-bold">{chatHistoryCount}</h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tutorials Done</p>
                <h2 className="text-2xl font-bold">{completedTutorials}</h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sheets Done</p>
                <h2 className="text-2xl font-bold">{completedSheets}</h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-2">Welcome to CodeCrux!</h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLoggedIn && userData ? `Hello ${userData.name}! ` : ''}
            Start your coding journey by exploring tutorials and practice sheets.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
