import React, { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { useProgress } from '../contexts/ProgressContext.jsx'
import tutorials from '../data/TutorialData.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProgressSummary from '../components/ProgressSummary.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import TutorialCard from '../components/TutorialCard.jsx'

const Tutorials = () => {
  const { isDarkMode } = useDarkMode()
  const { completedTutorials, toggleTutorialCompletion } = useProgress()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tutorials', count: tutorials.length },
    { id: 'dsa', name: 'Data Structures', count: tutorials.filter(t => t.category === 'dsa').length },
    { id: 'algorithms', name: 'Algorithms', count: tutorials.filter(t => t.category === 'algorithms').length },
    { id: 'cp', name: 'Competitive Programming', count: tutorials.filter(t => t.category === 'cp').length },
    { id: 'javascript', name: 'JavaScript', count: tutorials.filter(t => t.category === 'javascript').length },
    { id: 'interview-prep', name: 'Interview Prep', count: tutorials.filter(t => t.category === 'interview-prep').length }
  ]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-full p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <PageHeader
            icon={BookOpen}
            title="Video Tutorials"
            description="Learn from expert instructors with hands-on projects"
            isDarkMode={isDarkMode}
          />
          <ProgressSummary 
            completed={completedTutorials.size} 
            total={filteredTutorials.length} 
            isDarkMode={isDarkMode}
            bgColorClass="bg-green-50"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          isDarkMode={isDarkMode}
        />

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              isDarkMode={isDarkMode}
              completedTutorials={completedTutorials}
              toggleTutorialCompletion={toggleTutorialCompletion}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No tutorials found
            </h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tutorials
