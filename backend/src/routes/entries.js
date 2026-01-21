import express from 'express';
import {
  createEntry,
  getEntries,
  deleteEntry,
  getStats,
} from '../controllers/entriesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createEntry);
router.get('/', getEntries);
router.delete('/:id', deleteEntry);
router.get('/stats', getStats);

export default router;