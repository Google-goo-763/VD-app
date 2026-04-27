"use client";

import React from 'react';
import { Maximize2, Play, Layers, RotateCcw, RotateCw } from 'lucide-react';

const PreviewArea = () => {
  return (
    <div className="flex flex-col bg-black flex-1 relative">
      {/* Video Placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full aspect-video bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-gray-600 text-sm">Video Preview</span>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between px-4 py-4 bg-[#121212]">
        <Maximize2 className="w-5 h-5 text-white cursor-pointer" />
        <Play className="w-6 h-6 text-white fill-white cursor-pointer" />
        <div className="flex items-center gap-4">
          <Layers className="w-5 h-5 text-white cursor-pointer" />
          <RotateCcw className="w-5 h-5 text-white cursor-pointer" />
          <RotateCw className="w-5 h-5 text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;