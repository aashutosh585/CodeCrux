import React from 'react';
import { Bot, Plus, MessageCircle, Trash2 } from 'lucide-react';

const ChatSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  isDarkMode, 
  history, 
  currentChatIndex, 
  startNewChat, 
  openChat,
  clearHistory 
}) => {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden ${sidebarOpen ? 'border-r' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} ${sidebarOpen ? 'p-4' : 'p-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bot className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Mentor</h2>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)} 
          aria-label="Close sidebar" 
          className={`p-1 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button 
          onClick={startNewChat} 
          className={`w-full p-3 rounded-lg border-2 border-dashed transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </div>
        </button>
        
        {history.length > 0 && (
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
                clearHistory();
              }
            }}
            className={`w-full p-2 rounded-lg transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Clear History</span>
            </div>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {history.map((item, idx) => (
          <button
            key={idx}
            onClick={() => openChat(idx)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${currentChatIndex === idx ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-200 text-gray-700 hover:text-gray-900')}`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="truncate">{item.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
