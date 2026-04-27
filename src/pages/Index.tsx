"use client";

import React from 'react';
import VideoCanvas from '@/components/VideoCanvas';
import PreviewControls from '@/components/PreviewControls';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header/Title Bar */}
        <div className="px-4 py-2 bg-[#121212] border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preview</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
        </div>

        {/* Main Preview Area */}
        <VideoCanvas />

        {/* Controls */}
        <PreviewControls />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">Video Editor Preview Interface</p>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;