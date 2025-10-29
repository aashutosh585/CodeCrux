import express from 'express';
import {
  getAllSheets,
  addSheet,
  updateSheet,
  deleteSheet,
  getAllTutorials,
  addTutorial,
  updateTutorial,
  deleteTutorial,
  checkAdmin
} from '../controllers/adminController.js';
import userAuth from '../middleware/userAuth.js';

const adminRouter = express.Router();

// Admin check route
adminRouter.post('/check', userAuth, checkAdmin);

// Sheet management routes
adminRouter.get('/sheets', userAuth, getAllSheets);
adminRouter.post('/sheets', userAuth, addSheet);
adminRouter.put('/sheets/:sheetId', userAuth, updateSheet);
adminRouter.delete('/sheets/:sheetId', userAuth, deleteSheet);

// Tutorial management routes
adminRouter.get('/tutorials', userAuth, getAllTutorials);
adminRouter.post('/tutorials', userAuth, addTutorial);
adminRouter.put('/tutorials/:tutorialId', userAuth, updateTutorial);
adminRouter.delete('/tutorials/:tutorialId', userAuth, deleteTutorial);

export default adminRouter;