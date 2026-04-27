"use client";

import React from 'react';
import { X, Upload, ChevronDown } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#121212] text-white">
      <div className="flex items-center gap-4">
        <X className="w-6 h-6 cursor-pointer" />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-[#2a2a2a] px-3 py-1 rounded text-xs font-medium cursor-pointer">
          1080P
          <ChevronDown className="w-3 h-3" />
        </div>
        <Upload className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;