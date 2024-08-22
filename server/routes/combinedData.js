import express from 'express';
import { getCombinedData } from '../controller/combinedData.js';

const router = express.Router();

router.get('/combined-data', getCombinedData);

export default router;
