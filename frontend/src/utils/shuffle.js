/**
 * Performs a Fisher-Yates (Knuth) shuffle on an array to produce a uniformly random permutation.
 * @param {Array} array
 * @returns {Array} Shuffled copy of the array
 */
export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates a freshly shuffled array of gift numbers from 1 to 23.
 * Guarantees every number from 1 to 23 appears exactly once, never repeats, never skipped.
 * @param {number} total
 * @returns {number[]}
 */
export function generateGiftSequence(total = 23) {
  const numbers = Array.from({ length: total }, (_, i) => i + 1);
  return shuffleArray(numbers);
}
