"use client";

import React, { useState, useRef, useEffect } from 'react';

const Timeline = () => {
  const timeMarkers = ["00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06"];
  const [progress, setProgress] = useState(50); // Start in the middle for visibility
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(newProgress);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) handleMove(e.touches[0].clientX);
    };

    const onEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  return (
    <div 
      ref={timelineRef}
      className="bg-[#121212] border-t border-[#2a2a2a] h-[55vh] relative overflow-hidden cursor-pointer select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Time Markers */}
      <div className="flex px-12 py-2 border-b border-[#2a2a2a] pointer-events-none">
        {timeMarkers.map((time, i) => (
          <div key={i} className="flex-1 text-[10px] text-gray-500 text-center">
            {time}
          </div>
        ))}
      </div>

      {/* Timeline Tracks */}
      <div className="p-4 space-y-3 h-full overflow-y-auto pointer-events-none">
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
        className="absolute top-0 bottom-0 w-[2px] bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
        style={{ left: `${progress}%` }}
      >
        <div className="absolute -top-1 -left-[5px] w-3 h-3 bg-white rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default Timeline;