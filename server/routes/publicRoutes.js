import express from 'express';
import { getPublicSheets, getPublicTutorials } from '../controllers/publicController.js';

const publicRouter = express.Router();

// Public routes - no authentication required
publicRouter.get('/sheets', getPublicSheets);
publicRouter.get('/tutorials', getPublicTutorials);

export default publicRouter;