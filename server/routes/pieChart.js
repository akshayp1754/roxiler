import express from 'express';
import { getPieChart } from '../controller/pieChart.js';

const router = express.Router();

router.get('/pie-chart', getPieChart);

export default router;
