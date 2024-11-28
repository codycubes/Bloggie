import express from 'express';
import { createTweet, deleteTweet, getTweet, updateTweet } from '../controllers/tweetController.js';

const router = express.Router();

router.get('/', getTweet);
router.post('/create', createTweet); 
router.put('/:id', updateTweet);
router.delete('/:id', deleteTweet);

export default router;
