import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import CountdownPage from './pages/CountdownPage';
import GiftActivityPage from './pages/GiftActivityPage';
import ThankYouPage from './pages/ThankYouPage';
import SoundToggle from './components/SoundToggle';
import { generateGiftSequence } from './utils/shuffle';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'countdown' | 'activity' | 'thankyou'
  const [giftSequence, setGiftSequence] = useState([]);

  // Preload background images to prevent any visual flicker
  useEffect(() => {
    const img1 = new Image();
    img1.src = '/homepage.jpg';
    const img2 = new Image();
    img2.src = '/download.jpg';
  }, []);

  // Fetch or generate fresh randomized gift sequence
  const startNewExperience = async () => {
    try {
      // Attempt to get randomized sequence from backend
      const res = await fetch('/api/gifts/sequence');
      if (res.ok) {
        const data = await res.json();
        if (data.sequence && data.sequence.length === 23) {
          setGiftSequence(data.sequence);
          setPage('countdown');
          return;
        }
      }
    } catch (e) {
      // Backend not running or offline, proceed seamlessly with local Fisher-Yates shuffle
    }

    // High entropy local Fisher-Yates shuffle
    const localSeq = generateGiftSequence(23);
    setGiftSequence(localSeq);
    setPage('countdown');
  };

  const handleCountdownComplete = () => {
    setPage('activity');
  };

  const handleActivityComplete = () => {
    setPage('thankyou');
  };

  const handleBackToHome = () => {
    setPage('home');
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-black select-none overflow-hidden">
      {/* Sound Toggle Floating Control */}
      <SoundToggle />

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-[100dvh]"
          >
            <HomePage onStartCountdown={startNewExperience} />
          </motion.div>
        )}

        {page === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-[100dvh]"
          >
            <CountdownPage onComplete={handleCountdownComplete} />
          </motion.div>
        )}

        {page === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-[100dvh]"
          >
            <GiftActivityPage
              giftSequence={giftSequence}
              onComplete={handleActivityComplete}
              onBackToHome={handleBackToHome}
            />
          </motion.div>
        )}

        {page === 'thankyou' && (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-[100dvh]"
          >
            <ThankYouPage onBackToHome={handleBackToHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
