"use client";

import React, { useState } from 'react';
import { Maximize2, Minimize2, Play, Pause, Layers, RotateCcw, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewAreaProps {
  aspectRatio: '16:9' | '9:16';
}

const PreviewArea = ({ aspectRatio }: PreviewAreaProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div 
      className={`flex flex-col bg-black relative transition-all duration-500 ease-in-out ${
        isMaximized 
          ? 'fixed inset-0 z-[100] w-screen h-screen' 
          : 'flex-1'
      }`}
    >
      {/* Video Placeholder */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          layout
          className={`bg-[#1a1a1a] flex items-center justify-center rounded-2xl border border-white/5 transition-all duration-500 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group ${
            aspectRatio === '16:9' ? 'w-full max-w-6xl aspect-video' : 'h-full max-h-[85vh] aspect-[9/16]'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
          <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] z-10">
            {aspectRatio} Preview
          </span>
          
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-px bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
      </div>

      {/* Preview Controls */}
      <div className={`grid grid-cols-3 items-center px-8 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/5 ${isMaximized ? 'pb-8' : ''}`}>
        {/* Left Controls */}
        <div className="flex items-center">
          <button 
            onClick={toggleMaximize}
            className="p-2 hover:bg-white/5 rounded-full transition-all active:scale-90 group"
          >
            {isMaximized ? (
              <Minimize2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            ) : (
              <Maximize2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black fill-black" />
            ) : (
              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            )}
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-6">
          <Layers className="w-4 h-4 text-white/50 hover:text-white cursor-pointer transition-colors" />
          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-white/50 hover:text-white cursor-pointer transition-colors" />
            <RotateCw className="w-4 h-4 text-white/50 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;