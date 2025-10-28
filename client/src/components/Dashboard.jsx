import React, { useState } from 'react'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { useProgress } from '../contexts/ProgressContext.jsx'
import { Brain,Code2,BookOpen,Award,Clock,Target } from 'lucide-react'

const Dashboard = () => {
  const { isDarkMode } = useDarkMode()
  const { sheetsCount, tutorialsCount, totalScore, aiMentorSessions, resetProgress } = useProgress()
  const [loading, setLoading] = useState(false)

  // Real data from ProgressContext
  const AIHistory = []

  const userWorkload = [
    {
      title: "Total Score",
      content: totalScore,
      icon: <Code2 className="w-5 h-5 text-white" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Mentor Sessions",
      content: aiMentorSessions,
      icon: <Brain className="w-5 h-5 text-white" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Tutorials Completed",
      content: tutorialsCount,
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Sheets Completed",
      content: sheetsCount,
      icon: <Award className="w-5 h-5 text-white" />,
      color: "from-yellow-500 to-red-500"
    },
  ]

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap mb-8">
       
        {userWorkload.map((workload, index) => (
          <div key={index} className={`flex justify-between items-center w-72 p-6 ${isDarkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200'} rounded-xl border backdrop-blur-sm`}>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              <p className="text-sm">{workload.title}</p>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{workload.content}</h2>
            </div>
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${workload.color} text-white flex justify-center items-center shadow-lg`}>
              {workload.icon}
            </div>
          </div>
        ))}

      </div>

      {/* Progress Overview */}
      <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Learning Progress Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Study Statistics</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Points per Sheet:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10 pts</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Points per Tutorial:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5 pts</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Points per AI Session:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2 pts</span>
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Achievement Level</h4>
            <div className="space-y-2">
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Based on total score: {totalScore} points
              </div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                totalScore >= 100 ? 'bg-purple-100 text-purple-800' :
                totalScore >= 50 ? 'bg-blue-100 text-blue-800' :
                totalScore >= 20 ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {totalScore >= 100 ? 'Expert Learner' :
                 totalScore >= 50 ? 'Advanced Student' :
                 totalScore >= 20 ? 'Active Learner' :
                 'Getting Started'}
              </div>
              <button
                onClick={resetProgress}
                className={`mt-2 px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'} transition-colors`}
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className={`mt-6 mb-4 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>History of AI Mentor Sessions</h3>
          {AIHistory.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} bg-${isDarkMode ? 'gray-800' : 'white'} shadow-sm`}
            >
              <h4 className={`text-md font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.topic}</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
