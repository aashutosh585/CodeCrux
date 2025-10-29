import React, { useContext } from 'react';
import { ExternalLink, Star, Users, Code, Brain, CheckCircle } from 'lucide-react';
import TagList from './TagList.jsx';
import { AppContent } from '../contexts/AppContext';

// Helper function for difficulty colors
const getDifficultyColor = (difficulty) => {
  const colors = {
    Beginner: "text-green-500 bg-green-50 border-green-200",
    Intermediate: "text-orange-500 bg-orange-50 border-orange-200",
    Advanced: "text-red-500 bg-red-50 border-red-200",
  };
  return colors[difficulty.split(' ')[0]] || "text-gray-500 bg-gray-50 border-gray-200";
};

const SheetCard = ({ sheet, isDarkMode }) => {
  const { userData, toggleSheetCompletion } = useContext(AppContent);
  
  // Check if sheet is completed
  const isCompleted = userData?.completedSheets?.some(s => s._id === sheet._id) || false;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${sheet.color} rounded-2xl flex items-center justify-center shadow-md`}>
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`text-lg font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {sheet.title}
              </h3>
              {sheet.popular && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ml-2">
                  <Star className="w-3 h-3" />
                  <span>Popular</span>
                </span>
              )}
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>By {sheet.author}</p>
          </div>
        </div>

        {/* Stats */}
        <div className={`${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-3 mb-4`}>
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Difficulty */}
            <div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className={`text-sm font-semibold ${getDifficultyColor(sheet.difficulty)}`}>{sheet.difficulty.split(' ')[0]}</span>
              </div>
              <p className="text-xs text-gray-500">Difficulty</p>
            </div>
            
            {/* Problems */}
            <div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Code className="w-3 h-3 text-blue-500" />
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sheet.problems}</span>
              </div>
              <p className="text-xs text-gray-500">Problems</p>
            </div>
            
            {/* Rating */}
            <div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sheet.rating}</span>
              </div>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <TagList tags={sheet.tags} isDarkMode={isDarkMode} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              <span>{sheet.users} users</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleSheetCompletion(sheet._id)}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 border border-current rounded-full" />
                    <span>Mark Complete</span>
                  </>
                )}
              </button>
              <a
                href={sheet.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                  isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                } text-white transition-colors duration-200 flex items-center space-x-1`}
              >
                <span>Start</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetCard;
