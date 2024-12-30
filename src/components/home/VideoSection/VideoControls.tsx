import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMute: () => void;
}

export function VideoControls({ isPlaying, isMuted, onPlayPause, onMute }: VideoControlsProps) {
  return (
    <div className="absolute bottom-8 right-8 flex items-center space-x-4">
      <button 
        onClick={onPlayPause}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
      </button>
      <button 
        onClick={onMute}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
      </button>
    </div>
  );
}