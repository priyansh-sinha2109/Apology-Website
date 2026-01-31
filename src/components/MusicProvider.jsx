"use client";

import { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  return (
    <MusicContext.Provider value={{ startMusic, isPlaying }}>
      {children}

      <audio ref={audioRef} src="/music/song.mp3" preload="auto"/>
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
