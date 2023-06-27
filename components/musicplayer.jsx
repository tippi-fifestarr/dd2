import React, { useState } from "react";

export default function MusicPlayer({ songs, selectedSongIndex }) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
    // console.log(songs[selectedSongIndex].src);
  };

  return (
    <div className="flex items-center">
      <div onClick={toggleMute}>{isMuted ? "Music off 🎵" : "Music on 🎶"}</div>
      <audio loop={!isMuted}>
        <source src={songs[selectedSongIndex].src} type="audio/mpeg" />
      </audio>
    </div>
  );
}
