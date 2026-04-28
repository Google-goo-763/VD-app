"use client";

import React from 'react';
import { Maximize2, Play, Layers, RotateCcw, RotateCw } from 'lucide-react';

interface PreviewAreaProps {
  aspectRatio: '16:9' | '9:16';
}

const PreviewArea = ({ aspectRatio }: PreviewAreaProps) => {
  return (
    <div className="flex flex-col bg-black relative h-[40vh]">
      {/* Video Placeholder */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div 
          className={`bg-[#1a1a1a] flex items-center justify-center rounded-lg border border-white/5 transition-all duration-300 ease-in-out shadow-2xl ${
            aspectRatio === '16:9' ? 'w-full aspect-video' : 'h-full aspect-[9/16]'
          }`}
        >
          <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">
            {aspectRatio} Preview
          </span>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#121212] border-t border-white/5">
        <Maximize2 className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
        <div className="flex items-center justify-center">
          <Play className="w-8 h-8 text-white fill-white cursor-pointer hover:scale-110 transition-transform" />
        </div>
        <div className="flex items-center gap-5">
          <Layers className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <RotateCcw className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <RotateCw className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;