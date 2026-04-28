"use client";

import React, { useState, useEffect } from 'react';

const Timeline = () => {
  const timeMarkers = ["00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06"];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#121212] border-t border-[#2a2a2a] flex-1 relative overflow-hidden">
      {/* Time Markers */}
      <div className="flex px-12 py-2 border-b border-[#2a2a2a]">
        {timeMarkers.map((time, i) => (
          <div key={i} className="flex-1 text-[10px] text-gray-500 text-center">
            {time}
          </div>
        ))}
      </div>

      {/* Timeline Tracks */}
      <div className="p-4 space-y-3 h-full overflow-y-auto">
        {/* Main Video Track */}
        <div className="h-16 bg-[#1a1a1a] rounded-md border border-[#333] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-full flex gap-1 p-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-full aspect-video bg-gray-800/50 rounded-sm flex-shrink-0" />
            ))}
          </div>
        </div>
        
        {/* Audio/Overlay Track */}
        <div className="h-10 bg-[#1a1a1a] rounded-md border border-[#333] w-3/4 relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-md" />
        </div>

        {/* Extra Track for spacing */}
        <div className="h-10 bg-[#1a1a1a]/50 rounded-md border border-[#333]/50 w-1/2" />
      </div>

      {/* Playhead */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-75 ease-linear"
        style={{ left: `${progress}%` }}
      >
        <div className="absolute -top-1 -left-[5px] w-3 h-3 bg-white rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default Timeline;