import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  searchPlaceholder = "Search...",
  isDarkMode 
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      <div className="flex items-center space-x-3">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-3 py-2 text-sm rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {categories.map(category => (
            <option key={category.id || category} value={category.id || category}>
              {category.name || category} {category.count && `(${category.count})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
