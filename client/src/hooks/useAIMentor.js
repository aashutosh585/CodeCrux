import { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
import { AppContent } from '../contexts/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useAIMentor = (userData) => {
  const { backendUrl } = useContext(AppContent);
  const aiRef = useRef(null);
  const abortControllerRef = useRef(null);

  // API helper functions
  const saveChatMessageToAPI = async (role, content) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/chat/message`, {
        role,
        content
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save chat message:', error);
      toast.error('Failed to save message');
      return { success: false };
    }
  };

  const saveChatHistoryToAPI = async (messages) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/chat/history`, {
        messages
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save chat history:', error);
      toast.error('Failed to save chat history');
      return { success: false };
    }
  };

  const clearChatHistoryFromAPI = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/user/chat/history`);
      return response.data;
    } catch (error) {
      console.error('Failed to clear chat history:', error);
      toast.error('Failed to clear chat history');
      return { success: false };
    }
  };

  // Transform userData.history (flat array) to grouped chat format
  const transformHistoryToChats = (flatHistory) => {
    if (!flatHistory || !Array.isArray(flatHistory) || flatHistory.length === 0) {
      return [];
    }

    // Group consecutive messages into chat sessions
    const chats = [];
    let currentChat = null;
    let currentTitle = 'Chat';

    flatHistory.forEach((message, index) => {
      if (message.role === 'user') {
        // Start new chat session on user message
        if (currentChat && currentChat.chats.length > 0) {
          chats.push(currentChat);
        }
        currentTitle = generateTitleFromMessage(message.content);
        currentChat = {
          title: currentTitle,
          chats: [{ 
            role: message.role, 
            parts: [{ text: message.content }], 
            _ts: new Date(message.timestamp).getTime() 
          }]
        };
      } else if (message.role === 'model' && currentChat) {
        // Add model response to current chat
        currentChat.chats.push({
          role: message.role,
          parts: [{ text: message.content }],
          _ts: new Date(message.timestamp).getTime()
        });
      }
    });

    if (currentChat && currentChat.chats.length > 0) {
      chats.push(currentChat);
    }

    return chats;
  };

  const generateTitleFromMessage = (text) => {
    const keywords = {
      'dsa': 'DSA Help',
      'algorithm': 'Algorithm Help',
      'data structure': 'Data Structures',
      'web development': 'Web Development',
      'react': 'React Help',
      'javascript': 'JavaScript Help',
      'python': 'Python Help',
      'coding': 'Coding Help'
    };

    const lower = text.toLowerCase();
    for (const [k, v] of Object.entries(keywords)) {
      if (lower.includes(k)) {
        return v;
      }
    }
    return 'Chat';
  };

  // Get history from userData, transform flat history to grouped chats
  const [history, setHistory] = useState(() => {
    return transformHistoryToChats(userData?.history || []);
  });

  // Update history when userData changes
  useEffect(() => {
    if (userData?.history && Array.isArray(userData.history)) {
      setHistory(transformHistoryToChats(userData.history));
    }
  }, [userData]);

  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const keywords = useMemo(() => ({
    'dsa': 'DSA Help',
    'algorithm': 'Algorithm Help',
    'data structure': 'Data Structures',
    'web development': 'Web Development',
    'react': 'React Help',
    'javascript': 'JavaScript Help',
    'python': 'Python Help',
    'coding': 'Coding Help'
  }), []);

  const generateTitle = useCallback((text) => {
    const lower = text.toLowerCase();
    let title = 'Chat';
    for (const [k, v] of Object.entries(keywords)) {
      if (lower.includes(k)) {
        title = v;
        break;
      }
    }
    return title;
  }, [keywords]);

  const sendMessage = useCallback(async (input) => {
    if (!input.trim() || isLoading) return;
    if (!aiRef.current) {
      console.error('AI client not initialized.');
      return;
    }

    const userMessage = { role: 'user', parts: [{ text: input }], _ts: Date.now() };

    setIsLoading(true);
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Show user message immediately
      setCurrentChat(prev => {
        const base = prev ? [...prev] : [];
        return [...base, userMessage];
      });

      const historyForAPI = (currentChat && currentChat.length > 0) ? [...currentChat, userMessage] : [userMessage];

      const chatCreateArgs = {
        model: "gemini-2.5-flash",
        history: historyForAPI
      };

      const chat = await aiRef.current.chats.create(chatCreateArgs);
      const stream = await chat.sendMessageStream({
        message: input,
        signal
      });

      // Placeholder model message
      setCurrentChat(prev => {
        const base = prev ? [...prev] : [];
        return [...base, { role: 'model', parts: [{ text: '' }], _ts: Date.now() }];
      });

      let responseText = '';

      for await (const chunk of stream) {
        if (signal.aborted) break;
        responseText += (chunk?.text ?? '');

        setCurrentChat(prev => {
          const base = prev ? [...prev] : [];
          if (base.length === 0) return base;
          const last = base[base.length - 1];
          if (last.role === 'model') {
            base[base.length - 1] = { ...last, parts: [{ text: responseText }], _ts: Date.now() };
            return base;
          } else {
            return [...base, { role: 'model', parts: [{ text: responseText }], _ts: Date.now() }];
          }
        });
      }

      const finalModelMessage = { role: 'model', parts: [{ text: responseText }], _ts: Date.now() };

      // Save messages to backend
      if (userData && backendUrl) {
        // Save user message
        await saveChatMessageToAPI('user', input);
        // Save model response
        await saveChatMessageToAPI('model', responseText);
      }

      setHistory(prevHistory => {
        if (currentChatIndex !== null && prevHistory[currentChatIndex]) {
          const updated = [...prevHistory];
          updated[currentChatIndex] = {
            ...updated[currentChatIndex],
            chats: [...historyForAPI, finalModelMessage]
          };
          return updated;
        } else {
          const title = generateTitle(input);
          const newItem = {
            title,
            chats: [...historyForAPI, finalModelMessage]
          };
          return [...prevHistory, newItem];
        }
      });

      setCurrentChat(prev => {
        const base = prev ? [...prev] : [];
        if (base.length > 0 && base[base.length - 1].role === 'model') {
          base[base.length - 1] = finalModelMessage;
          return base;
        }
        return [...base, finalModelMessage];
      });

      // Select created chat if new
      setCurrentChatIndex(prev => (prev === null ? (history.length) : prev));
    } catch (err) {
      if (err?.name === 'AbortError') {
        console.log('Streaming aborted');
      } else {
        console.error('Error sending message:', err);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [isLoading, currentChat, currentChatIndex, generateTitle, history.length]);

  const startNewChat = useCallback(() => {
    setCurrentChat([]);
    setCurrentChatIndex(null);
  }, []);

  const openChat = useCallback((index) => {
    if (history[index]) {
      setCurrentChat(history[index].chats);
      setCurrentChatIndex(index);
    }
  }, [history]);

  // Convert grouped chats back to flat history for API
  const convertChatsToFlatHistory = useCallback((chats) => {
    const flatHistory = [];
    chats.forEach(chat => {
      chat.chats.forEach(message => {
        flatHistory.push({
          role: message.role,
          content: message.parts[0]?.text || '',
          timestamp: new Date(message._ts)
        });
      });
    });
    return flatHistory;
  }, []);

  const saveHistory = useCallback(async () => {
    if (!userData || !backendUrl) return;
    
    const flatHistory = convertChatsToFlatHistory(history);
    const result = await saveChatHistoryToAPI(flatHistory);
    
    if (result.success) {
      toast.success('Chat history saved successfully!');
    }
  }, [history, userData, backendUrl, convertChatsToFlatHistory]);

  const clearHistory = useCallback(async () => {
    if (!userData || !backendUrl) return;
    
    const result = await clearChatHistoryFromAPI();
    
    if (result.success) {
      setHistory([]);
      setCurrentChat([]);
      setCurrentChatIndex(null);
      toast.success('Chat history cleared successfully!');
    }
  }, [userData, backendUrl]);

  return {
    aiRef,
    history,
    currentChat,
    currentChatIndex,
    isLoading,
    sendMessage,
    startNewChat,
    openChat,
    saveHistory,
    clearHistory
  };
};
