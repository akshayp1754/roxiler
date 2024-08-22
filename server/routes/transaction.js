import express from 'express';
import { getTransactions } from '../controller/transaction.js';

const router = express.Router();

router.get('/transactions', getTransactions);

export default router;
