"use client";

import React from 'react';

const Timeline = () => {
  const timeMarkers = ["00:00", "00:01", "00:02", "00:03", "00:04"];

  return (
    <div className="bg-[#121212] border-t border-[#2a2a2a] h-48 relative overflow-hidden">
      {/* Time Markers */}
      <div className="flex px-12 py-2 border-b border-[#2a2a2a]">
        {timeMarkers.map((time, i) => (
          <div key={i} className="flex-1 text-[10px] text-gray-500 text-center">
            {time}
          </div>
        ))}
      </div>

      {/* Timeline Tracks */}
      <div className="p-4 space-y-2">
        <div className="h-12 bg-[#1a1a1a] rounded-sm border border-[#333] relative">
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gray-800/50 rounded-sm"></div>
        </div>
        <div className="h-8 bg-[#1a1a1a] rounded-sm border border-[#333] w-3/4"></div>
      </div>

      {/* Playhead */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
    </div>
  );
};

export default Timeline;