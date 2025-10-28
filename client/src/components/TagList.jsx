import React from 'react';

const TagList = ({ tags, isDarkMode }) => (
  <div className="flex flex-wrap gap-2">
    {tags.slice(0, 3).map((tag, i) => (
      <span
        key={i}
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDarkMode
            ? 'bg-gray-700 text-gray-300 border border-gray-600'
            : 'bg-white text-gray-700 border border-gray-200'
        }`}
      >
        {tag}
      </span>
    ))}
    {tags.length > 3 && (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
        }`}
      >
        +{tags.length - 3} more
      </span>
    )}
  </div>
);

export default TagList;
