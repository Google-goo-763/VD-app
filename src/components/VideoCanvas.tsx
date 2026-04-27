"use client";

import React from 'react';

const VideoCanvas = () => {
  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center group">
      {/* Main Background Video/Image */}
      <img 
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
        alt="Landscape background"
        className="w-full h-full object-cover"
      />

      {/* Picture-in-Picture Overlay */}
      <div className="absolute top-[15%] right-[10%] w-[35%] aspect-video border-2 border-cyan-400 shadow-2xl transform rotate-[-2deg] transition-transform hover:scale-105 cursor-move">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
            alt="Overlay person"
            className="w-full h-full object-cover"
          />
          {/* Small corner handles to simulate editing UI */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400" />
        </div>
      </div>

      {/* Canvas Overlay Info */}
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] text-white/70 font-mono">
        1920 x 1080 | 30fps
      </div>
    </div>
  );
};

export default VideoCanvas;