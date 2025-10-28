import React from 'react';
import { Play, Clock, Star, Users, CheckCircle } from 'lucide-react';

const TutorialCard = ({ tutorial, isDarkMode, completedTutorials, toggleTutorialCompletion }) => {
  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'text-green-500 bg-green-100'
      case 'Intermediate': return 'text-yellow-500 bg-yellow-100'
      case 'Advanced': return 'text-red-500 bg-red-100'
      default: return 'text-gray-500 bg-gray-100'
    }
  }

  return (
    <div
      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group`}
    >
      {/* Thumbnail wrapped in anchor */}
      <a href={tutorial.url} target="_blank" rel="noopener noreferrer" className="block relative h-36 bg-gray-300 overflow-hidden">
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </a>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(tutorial.level)}`}>{tutorial.level}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-500">{tutorial.rating}</span>
          </div>
        </div>

        <h3 className={`text-base font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}>{tutorial.title}</h3>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{tutorial.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{tutorial.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{tutorial.students}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {tutorial.tags.map((tag, idx) => (
            <span key={idx} className={`px-1.5 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{tag}</span>
          ))}
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">By {tutorial.instructor}</p>
            
            {/* Improved completion button */}
            <button
              onClick={() => toggleTutorialCompletion(tutorial.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                completedTutorials.has(tutorial.id)
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {completedTutorials.has(tutorial.id) ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 border border-current rounded-full"></div>
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
          <a
            href={tutorial.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
          >
            <Play className="w-3 h-3 mr-1" /> Watch Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
