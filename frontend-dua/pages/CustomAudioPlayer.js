import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function CustomAudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      const method = audio.paused ? 'play' : 'pause';
      audio[method]();
      setIsPlaying(!audio.paused);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      if (!duration) {
        setDuration(audio.duration);
      }
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [duration]);

  const progressBarWidth = (currentTime / duration) * 100 || 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <span style={{ color: 'green' }}>
            <button onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </span>
      {isPlaying && (
        <>
        <div class="mb-1 text-base font-medium dark:text-white">

          <input
            type="range"
            value={progressBarWidth}
            max="100"
            style={{ cursor: "pointer", flex: '1' }}
            onChange={handleProgressChange}
          />
          </div>
          <span style={{ fontSize: '0.8em' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </>
      )}
      <audio ref={audioRef} preload="metadata">
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
