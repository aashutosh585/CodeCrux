import React from 'react';

const ProgressSummary = ({ 
  completed, 
  total, 
  isDarkMode, 
  bgColorClass = "bg-blue-50" // Allow custom background color
}) => {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={`mt-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : `border-gray-200 ${bgColorClass}`}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {['Completed', 'Total Available', 'Progress'].map((label, i) => (
            <div key={label} className="text-center">
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {i === 0 ? completed : i === 1 ? total : `${progress}%`}
              </div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-20 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
