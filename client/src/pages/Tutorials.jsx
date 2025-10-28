import React, { useState, useEffect, useContext } from 'react'
import { BookOpen } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { AppContent } from '../contexts/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import TutorialCard from '../components/TutorialCard.jsx'

const Tutorials = () => {
  const { isDarkMode } = useDarkMode()
  const { getTutorials } = useContext(AppContent)
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Fetch tutorials from backend
  useEffect(() => {
    const fetchTutorials = async () => {
      setLoading(true)
      const tutorialsData = await getTutorials()
      setTutorials(tutorialsData)
      setLoading(false)
    }
    fetchTutorials()
  }, [getTutorials])

  // Generate categories dynamically based on loaded tutorials
  const categories = [
    { id: 'all', name: 'All Tutorials', count: tutorials.length },
    ...Array.from(new Set(tutorials.map(t => t.category))).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
      count: tutorials.filter(t => t.category === category).length
    }))
  ]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading tutorials...</p>
        </div>
      </div>
    )
  }

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
              key={tutorial._id}
              tutorial={tutorial}
              isDarkMode={isDarkMode}
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
