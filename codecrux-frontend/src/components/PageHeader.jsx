import React from 'react';

const PageHeader = ({ 
  icon: Icon, 
  title, 
  description, 
  isDarkMode, 
  gradient = "from-green-600 to-blue-600" 
}) => {
  return (
    <div className="flex items-center mb-2">
      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mr-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
