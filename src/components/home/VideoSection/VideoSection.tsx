import React, { useState, useRef } from 'react';
import { VideoControls } from './VideoControls';
import { VideoOverlay } from './VideoOverlay';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-screen bg-black">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      >
        <source 
          src="https://player.vimeo.com/external/459389137.hd.mp4?s=865d2c0ec77b5d11d5a18b0b3dc81f2c22e61f45&profile_id=175" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      <VideoOverlay />
      
      <VideoControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onMute={handleMute}
      />
    </section>
  );
}