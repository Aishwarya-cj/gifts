import Gift from '../models/Gift.js';

// In-memory store fallback when MongoDB is not active
let inMemoryGifts = Array.from({ length: 23 }, (_, i) => ({
  giftNumber: i + 1,
  title: `Gift #${i + 1}`,
  message: `A special surprise crafted with love for gift #${i + 1}`,
  description: '',
  hint: '',
  photoUrl: '',
  videoUrl: '',
  location: '',
  isOpened: false,
  openedAt: null,
}));

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// @desc Get randomized 1-23 gift sequence
// @route GET /api/gifts/sequence
export const getShuffledSequence = (req, res) => {
  const numbers = Array.from({ length: 23 }, (_, i) => i + 1);
  const sequence = shuffleArray(numbers);
  res.json({
    success: true,
    total: sequence.length,
    sequence,
  });
};

// @desc Get all 23 gifts
// @route GET /api/gifts
export const getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find().sort({ giftNumber: 1 });
    if (gifts && gifts.length > 0) {
      return res.json({ success: true, count: gifts.length, data: gifts });
    }
    return res.json({ success: true, count: inMemoryGifts.length, data: inMemoryGifts });
  } catch (error) {
    return res.json({ success: true, count: inMemoryGifts.length, data: inMemoryGifts });
  }
};

// @desc Get a specific gift by gift number (1-23)
// @route GET /api/gifts/:number
export const getGiftByNumber = async (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number) || number < 1 || number > 23) {
    return res.status(400).json({ success: false, message: 'Invalid gift number (1-23 expected)' });
  }

  try {
    let gift = await Gift.findOne({ giftNumber: number });
    if (!gift) {
      gift = inMemoryGifts.find((g) => g.giftNumber === number);
    }
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }
    return res.json({ success: true, data: gift });
  } catch (error) {
    const gift = inMemoryGifts.find((g) => g.giftNumber === number);
    return res.json({ success: true, data: gift });
  }
};

// @desc Seed 23 default gifts in MongoDB
// @route POST /api/gifts/seed
export const seedGifts = async (req, res) => {
  try {
    const defaultGifts = Array.from({ length: 23 }, (_, i) => ({
      giftNumber: i + 1,
      title: `Gift #${i + 1}`,
      message: `A special surprise crafted with love for gift #${i + 1}`,
      isOpened: false,
    }));

    await Gift.deleteMany({});
    const createdGifts = await Gift.insertMany(defaultGifts);

    return res.status(201).json({
      success: true,
      message: 'Successfully seeded 23 gifts',
      count: createdGifts.length,
      data: createdGifts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update gift details (message, photo, etc.)
// @route PUT /api/gifts/:number
export const updateGift = async (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number) || number < 1 || number > 23) {
    return res.status(400).json({ success: false, message: 'Invalid gift number' });
  }

  try {
    let gift = await Gift.findOneAndUpdate(
      { giftNumber: number },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.json({ success: true, data: gift });
  } catch (error) {
    const idx = inMemoryGifts.findIndex((g) => g.giftNumber === number);
    if (idx !== -1) {
      inMemoryGifts[idx] = { ...inMemoryGifts[idx], ...req.body };
      return res.json({ success: true, data: inMemoryGifts[idx] });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
