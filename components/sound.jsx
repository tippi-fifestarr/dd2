// sound.jsx
import React, { useState } from "react";
import useSound from "use-sound";

const Sound = ({ isMuted, setIsMuted, volume, setVolume }) => {
  const [sliderValue, setSliderValue] = useState(69); // Initial volume: 0.69 * 100

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setSliderValue(event.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    if (isMuted) {
      setSliderValue(69); // Set slider back to the initial volume
      setVolume(0.69);
    } else {
      setSliderValue(0);
      setVolume(0);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="z-10 text-slate-200 bg-slate-600 rounded-lg hover:bg-slate-300 transition-colors duration-200 p-1"
        onClick={toggleMute}
      >
        {isMuted ? "🔈" : "🔊"}
      </button>
      <input
        type="range"
        min="0"
        max="69"
        value={sliderValue}
        className="w-24 ml-2 bg-slate-600 rounded-lg"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default Sound;
