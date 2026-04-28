"use client";

import React, { useState } from 'react';
import { Maximize2, Play, Pause, Layers, RotateCcw, RotateCw } from 'lucide-react';

interface PreviewAreaProps {
  aspectRatio: '16:9' | '9:16';
}

const PreviewArea = ({ aspectRatio }: PreviewAreaProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col bg-black relative flex-1">
      {/* Video Placeholder */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div 
          className={`bg-[#1a1a1a] flex items-center justify-center rounded-lg border border-white/5 transition-all duration-300 ease-in-out shadow-2xl ${
            aspectRatio === '16:9' ? 'w-full aspect-video' : 'h-full aspect-[9/16]'
          }`}
        >
          <span className="text-gray-600 text-[10px] font-medium uppercase tracking-widest">
            {aspectRatio} Preview
          </span>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="grid grid-cols-3 items-center px-6 py-2.5 bg-[#121212] border-t border-white/5">
        {/* Left Controls */}
        <div className="flex items-center">
          <Maximize2 className="w-4 h-4 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:scale-110 transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white fill-white" />
            ) : (
              <Play className="w-6 h-6 text-white fill-white" />
            )}
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-4">
          <Layers className="w-4 h-4 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <RotateCcw className="w-4 h-4 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <RotateCw className="w-4 h-4 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;