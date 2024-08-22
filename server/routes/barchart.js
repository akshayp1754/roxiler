import express from 'express';
import { getBarChart } from '../controller/barchart.js';

const router = express.Router();

router.get('/bar-chart', getBarChart);

export default router;
