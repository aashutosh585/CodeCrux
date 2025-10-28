import { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [completedSheets, setCompletedSheets] = useState(new Set());
  const [completedTutorials, setCompletedTutorials] = useState(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [aiMentorSessions, setAiMentorSessions] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedSheets(new Set(progress.completedSheets || []));
      setCompletedTutorials(new Set(progress.completedTutorials || []));
      setTotalScore(progress.totalScore || 0);
      setAiMentorSessions(progress.aiMentorSessions || 0);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progress = {
      completedSheets: Array.from(completedSheets),
      completedTutorials: Array.from(completedTutorials),
      totalScore,
      aiMentorSessions
    };
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [completedSheets, completedTutorials, totalScore, aiMentorSessions]);

  const toggleSheetCompletion = (sheetId) => {
    setCompletedSheets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sheetId)) {
        newSet.delete(sheetId);
        // Decrease score when unchecking
        setTotalScore(prev => Math.max(0, prev - 10));
      } else {
        newSet.add(sheetId);
        // Increase score when checking
        setTotalScore(prev => prev + 10);
      }
      return newSet;
    });
  };

  const toggleTutorialCompletion = (tutorialId) => {
    setCompletedTutorials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tutorialId)) {
        newSet.delete(tutorialId);
        setTotalScore(prev => Math.max(0, prev - 5));
      } else {
        newSet.add(tutorialId);
        setTotalScore(prev => prev + 5);
      }
      return newSet;
    });
  };

  const incrementAiSessions = () => {
    setAiMentorSessions(prev => prev + 1);
    setTotalScore(prev => prev + 2);
  };

  const value = {
    // Sheets
    completedSheets,
    toggleSheetCompletion,
    sheetsCount: completedSheets.size,
    
    // Tutorials
    completedTutorials,
    toggleTutorialCompletion,
    tutorialsCount: completedTutorials.size,
    
    // Scores and sessions
    totalScore,
    aiMentorSessions,
    incrementAiSessions,
    
    // Reset function (optional)
    resetProgress: () => {
      setCompletedSheets(new Set());
      setCompletedTutorials(new Set());
      setTotalScore(0);
      setAiMentorSessions(0);
    }
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
