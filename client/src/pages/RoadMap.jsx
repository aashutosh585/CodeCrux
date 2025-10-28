import React from 'react'
import { BookOpen, Star, Rocket, Lightbulb, ExternalLink, Target } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'

// Roadmap data (6 stages)
const roadmapStages = [
  {
    title: "Stage 1: Basics of Programming",
    points: [
      "Learn a programming language (C++, Java, or Python)",
      "Understand syntax, loops, functions, arrays",
      "Practice basic problems on platforms like HackerRank",
    ],
  },
  {
    title: "Stage 2: Basic Data Structures",
    points: [
      "Learn stacks, queues, linked lists, strings",
      "Solve 50–100 problems on arrays and strings",
      "Start solving easy problems on LeetCode",
    ],
  },
  {
    title: "Stage 3: Intermediate DSA",
    points: [
      "Learn trees, heaps, hash maps, recursion",
      "Master binary search and sliding window",
      "Daily practice on Codeforces (Div 3) and GFG",
    ],
  },
  {
    title: "Stage 4: Advanced DSA",
    points: [
      "Learn graphs, DP, tries, segment trees",
      "Attempt hard LeetCode & CP problems",
      "Participate in Codeforces/AtCoder contests",
    ],
  },
  {
    title: "Stage 5: Competitive Programming",
    points: [
      "Join regular contests (Codeforces, AtCoder, LeetCode)",
      "Upsolve problems you couldn’t solve during contests",
      "Track ratings and aim for consistency",
    ],
  },
  {
    title: "Stage 6: Interview Prep",
    points: [
      "Revise all patterns (DP, Graphs, Trees)",
      "Mock Interviews on Pramp or Interviewing.io",
      "Study system design (for advanced roles)",
    ],
  },
]

// Tips & Resources
const tips = [
  "🧠 Be consistent, even 1 hour daily matters.",
  "📝 Maintain a notes or GitHub repo of solved problems.",
  "⏱️ Time yourself and track improvement weekly.",
]

const platforms = [
  { name: "LeetCode", url: "https://leetcode.com" },
  { name: "Codeforces", url: "https://codeforces.com" },
  { name: "GeeksforGeeks", url: "https://geeksforgeeks.org" },
  { name: "AtCoder", url: "https://atcoder.jp" },
  { name: "HackerRank", url: "https://hackerrank.com" },
]

const RoadMap = () => {
  const { isDarkMode } = useDarkMode()
  
  return (
    <div className="h-full p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-lg`}>
          <div className="flex items-center gap-6">
            {/* Rocket Element - Left */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Content - Right */}
            <div className="flex-1">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                DSA / CP Roadmap
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Complete learning path from zero to advanced competitive programming
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  6 Stages
                </span>
                <span className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'}`}>
                  Zero to Advanced
                </span>
                <span className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                  Interview Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {roadmapStages.map((stage, index) => (
          <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-md border`}>
            <h3 className={`text-xl font-semibold mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Rocket size={20} className="text-blue-500" /> {stage.title}
            </h3>
            <ul className={`list-disc list-inside ml-2 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {stage.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Tips */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <h3 className={`text-xl font-semibold mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Lightbulb size={20} className="text-yellow-500" /> Tips for Success
          </h3>
          <ul className={`list-disc list-inside ml-2 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Platforms */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <h3 className={`text-xl font-semibold mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <BookOpen size={20} className="text-green-500" /> Practice Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-2">
            {platforms.map((platform, index) => (
              <a 
                key={index} 
                href={platform.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-blue-400' 
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 text-blue-600'
                }`}
              >
                <ExternalLink size={16} />
                <span className="font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadMap
