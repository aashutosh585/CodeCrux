import React from 'react';
import { Bot } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatMessages = ({ currentChat, isDarkMode, messagesEndRef }) => {
  if (!currentChat || currentChat.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Bot className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to AI Mentor
          </h3>
          <p className="text-gray-500">Start a conversation by typing a message below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentChat.map((message, idx) => (
        <MessageBubble key={idx} message={message} isDarkMode={isDarkMode} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
