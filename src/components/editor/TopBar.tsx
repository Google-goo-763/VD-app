"use client";

import React from 'react';
import { X, Upload, ChevronDown, Monitor, Smartphone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  aspectRatio: '16:9' | '9:16';
  onRatioChange: (ratio: '16:9' | '9:16') => void;
}

const TopBar = ({ aspectRatio, onRatioChange }: TopBarProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#121212] text-white border-b border-white/5">
      <div className="flex items-center gap-4">
        <X className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded text-xs font-medium cursor-pointer hover:bg-[#3a3a3a] transition-colors">
              {aspectRatio === '16:9' ? <Monitor size={14} /> : <Smartphone size={14} />}
              {aspectRatio}
              <ChevronDown className="w-3 h-3" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 text-white">
            <DropdownMenuItem 
              onClick={() => onRatioChange('16:9')}
              className="flex items-center gap-2 cursor-pointer focus:bg-white/10 focus:text-white"
            >
              <Monitor size={14} /> 16:9 (Landscape)
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onRatioChange('9:16')}
              className="flex items-center gap-2 cursor-pointer focus:bg-white/10 focus:text-white"
            >
              <Smartphone size={14} /> 9:16 (Portrait)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1 bg-[#2a2a2a] px-3 py-1.5 rounded text-xs font-medium cursor-pointer hover:bg-[#3a3a3a] transition-colors">
          1080P
          <ChevronDown className="w-3 h-3" />
        </div>
        <Upload className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />
      </div>
    </div>
  );
};

export default TopBar;