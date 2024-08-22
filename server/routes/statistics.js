import express from 'express';
import { getStatistics } from '../controller/statistics.js';

const router = express.Router();

router.get('/statistics', getStatistics);

export default router;
