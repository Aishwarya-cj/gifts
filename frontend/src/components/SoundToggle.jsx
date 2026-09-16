import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled } from '../utils/sound';

export default function SoundToggle({ className = '' }) {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  const handleToggle = () => {
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      className={`
        fixed top-4 right-4 z-40 p-2.5 rounded-full
        bg-white/40 hover:bg-white/70 text-rose-950 backdrop-blur-md
        border border-white/70 shadow-md transition-all duration-200
        hover:scale-105 active:scale-95 focus:outline-none
        ${className}
      `}
      title={enabled ? 'Mute romantic sounds' : 'Unmute romantic sounds'}
    >
      {enabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-700" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
    </button>
  );
}
