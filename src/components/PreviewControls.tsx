"use client";

import React from 'react';
import { Maximize2, Play, Square, RotateCcw, RotateCw, Crop } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PreviewControls = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-[#121212] border-t border-white/5">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <Maximize2 size={20} />
        </Button>
      </div>

      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-12 h-12 rounded-full">
          <Play size={28} fill="currentColor" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <Crop size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <RotateCcw size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <RotateCw size={20} />
        </Button>
      </div>
    </div>
  );
};

export default PreviewControls;