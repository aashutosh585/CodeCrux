import React, { useEffect, useState, useRef, useContext } from "react";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";
import { AppContent } from "../contexts/AppContext.jsx";
import { Menu } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ChatSidebar from "../components/ChatSidebar.jsx";
import ChatMessages from "../components/ChatMessages.jsx";
import ChatInput from "../components/ChatInput.jsx";
import { useAIMentor } from "../hooks/useAIMentor.js";

const MentorAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { isDarkMode } = useDarkMode();
  const { userData } = useContext(AppContent);
  const messagesEndRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");

  const {
    aiRef,
    history,
    currentChat,
    currentChatIndex,
    isLoading,
    sendMessage,
    startNewChat,
    openChat,
    saveHistory,
    clearHistory,
  } = useAIMentor(userData);

  useEffect(() => {
    if (apiKey) {
      try {
        aiRef.current = new GoogleGenAI({ apiKey });
      } catch (error) {
        console.error("Failed to initialize AI client:", error);
      }
    } else {
      console.error("VITE_GEMINI_API_KEY not found in environment variables");
    }
  }, [apiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  useEffect(() => {
    saveHistory();
  }, [history, saveHistory]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const messageText = input;
    setInput("");
    await sendMessage(messageText);
  };

  if (!userData?.isAccountVerified) {
    const textClass = isDarkMode ? "text-white" : "text-gray-900";
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${textClass}`}>
            Account Verification Required
          </h2>
          <p className="text-gray-500">Please verify your account to access AI Mentor.</p>
        </div>
      </div>
    );
  }

  const containerClass = isDarkMode ? "bg-gray-900" : "bg-white";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const buttonClass = isDarkMode
    ? "hover:bg-gray-700 text-gray-400 hover:text-white"
    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700";

  return (
    <div className={`h-screen flex ${containerClass}`}>
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        history={history}
        currentChatIndex={currentChatIndex}
        startNewChat={startNewChat}
        openChat={openChat}
        clearHistory={clearHistory}
      />
      <div className="flex-1 flex flex-col">
        {!sidebarOpen && (
          <div className={`p-4 border-b ${borderClass}`}>
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-md transition-colors ${buttonClass}`}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6 w-full">
          <ChatMessages
            currentChat={currentChat}
            isDarkMode={isDarkMode}
            messagesEndRef={messagesEndRef}
          />
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={handleSendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default MentorAI;
