import express from 'express';
import {
  getGifts,
  getGiftByNumber,
  getShuffledSequence,
  seedGifts,
  updateGift,
} from '../controllers/giftController.js';

const router = express.Router();

router.get('/sequence', getShuffledSequence);
router.get('/', getGifts);
router.get('/:number', getGiftByNumber);
router.put('/:number', updateGift);
router.post('/seed', seedGifts);

export default router;
