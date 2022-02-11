import express from 'express'
import { createTweet, getAllTwits } from '../controllers/twit';
import protectRoute from '../middleware/verify';
const router = express.Router();

router.post('/create', protectRoute, createTweet)
router.get('/all', protectRoute, getAllTwits)
export default router