import React, { useState, useEffect, useContext } from 'react';
import { BookOpen } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { AppContent } from '../contexts/AppContext.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import SheetCard from '../components/SheetCard.jsx';

const Sheet = () => {
  const { isDarkMode } = useDarkMode();
  const { getSheets } = useContext(AppContent);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch sheets from backend
  useEffect(() => {
    const fetchSheets = async () => {
      setLoading(true);
      const sheetsData = await getSheets();
      setSheets(sheetsData);
      setLoading(false);
    };
    fetchSheets();
  }, [getSheets]);

  // Generate categories dynamically based on loaded sheets
  const categories = [
    { id: 'All', name: 'All', count: sheets.length },
    ...Array.from(new Set(sheets.map(s => s.category))).map(category => ({
      id: category,
      name: category,
      count: sheets.filter(s => s.category === category).length
    }))
  ];

  const filteredSheets = sheets.filter(sheet => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = sheet.title.toLowerCase().includes(term)
      || sheet.author.toLowerCase().includes(term)
      || (sheet.tags && sheet.tags.some(tag => tag.toLowerCase().includes(term)));
    const matchesCategory = selectedCategory === "All" || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading sheets...</p>
        </div>
      </div>
    );
  }

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
              key={sheet._id}
              sheet={sheet}
              isDarkMode={isDarkMode}
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
