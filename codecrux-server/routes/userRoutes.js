import express from 'express';
import { 
    getUserData, 
    saveChatMessage, 
    clearChatHistory, 
    saveChatHistory,
    toggleSheetCompletion,
    toggleTutorialCompletion
} from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

// User data routes
userRouter.get('/data', userAuth, getUserData);

// Chat history routes
userRouter.post('/chat/message', userAuth, saveChatMessage);
userRouter.post('/chat/history', userAuth, saveChatHistory);
userRouter.delete('/chat/history', userAuth, clearChatHistory);

// Progress tracking routes
userRouter.post('/toggle-sheet', userAuth, toggleSheetCompletion);
userRouter.post('/toggle-tutorial', userAuth, toggleTutorialCompletion);

export default userRouter;