import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { useProgress } from '../contexts/ProgressContext.jsx';
import popularSheets from '../data/SheetData.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProgressSummary from '../components/ProgressSummary.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import SheetCard from '../components/SheetCard.jsx';

const Sheet = () => {
  const { isDarkMode } = useDarkMode();
  const { completedSheets, toggleSheetCompletion } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All' },
    { id: 'DSA', name: 'DSA' },
    { id: 'Interview', name: 'Interview' },
    { id: 'Company Specific', name: 'Company Specific' }
  ];

  const filteredSheets = popularSheets.filter(sheet => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = sheet.title.toLowerCase().includes(term)
      || sheet.author.toLowerCase().includes(term)
      || sheet.tags.some(tag => tag.toLowerCase().includes(term));
    const matchesCategory = selectedCategory === "All" || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <PageHeader
            icon={BookOpen}
            title="Premium Coding Sheets"
            description="Handpicked collection of the most effective coding practice sheets trusted by millions of developers worldwide"
            isDarkMode={isDarkMode}
          />
          <ProgressSummary 
            completed={completedSheets.size} 
            total={filteredSheets.length} 
            isDarkMode={isDarkMode}
            bgColorClass="bg-blue-50"
          />
        </div>

        {/* Search & Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          isDarkMode={isDarkMode}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSheets.map(sheet => (
            <SheetCard
              key={sheet.id}
              sheet={sheet}
              isDarkMode={isDarkMode}
              completedSheets={completedSheets}
              toggleSheetCompletion={toggleSheetCompletion}
            />
          ))}
        </div>

        {/* No Results */}
        {!filteredSheets.length && (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No sheets found
            </h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sheet;
