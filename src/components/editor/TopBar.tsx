"use client";

import React, { useState } from 'react';
import { X, Upload, ChevronDown, Monitor, Smartphone, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  aspectRatio: '16:9' | '9:16';
  onRatioChange: (ratio: '16:9' | '9:16') => void;
}

const TopBar = ({ aspectRatio, onRatioChange }: TopBarProps) => {
  const [resolution, setResolution] = useState('1080p');
  const [framerate, setFramerate] = useState('60fps');
  const [projectName, setProjectName] = useState('Untitled Project');

  const resolutions = ['1080p', '720p', '360p'];
  const framerates = ['60fps', '30fps'];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#121212] text-white border-b border-white/5 z-50">
      <div className="flex items-center gap-4">
        <X className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />
      </div>
      
      <div className="flex items-center gap-3">
        {/* Aspect Ratio Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-[#252525] transition-all">
              {aspectRatio === '16:9' ? <Monitor size={14} /> : <Smartphone size={14} />}
              {aspectRatio}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-[#1a1a1a] border-white/10 text-white min-w-[140px]">
            <DropdownMenuItem 
              onClick={() => onRatioChange('16:9')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-white/10 focus:text-white py-2"
            >
              <div className="flex items-center gap-2">
                <Monitor size={14} /> 16:9 Landscape
              </div>
              {aspectRatio === '16:9' && <Check size={12} />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onRatioChange('9:16')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-white/10 focus:text-white py-2"
            >
              <div className="flex items-center gap-2">
                <Smartphone size={14} /> 9:16 Portrait
              </div>
              {aspectRatio === '9:16' && <Check size={12} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export Settings Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1 bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-[#252525] transition-all">
              {resolution.toUpperCase()}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-[#1a1a1a] border-white/10 p-6 text-white shadow-2xl rounded-xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Name</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 focus:outline-none focus:border-white transition-colors text-sm"
                />
              </div>

              {/* Resolution Selection */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Resolution</label>
                <div className="flex flex-wrap gap-2">
                  {resolutions.map((res) => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={`px-4 py-1.5 rounded-full text-xs border transition-all ${
                        resolution === res 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framerate Selection */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Framerates</label>
                <div className="flex gap-2">
                  {framerates.map((fps) => (
                    <button
                      key={fps}
                      onClick={() => setFramerate(fps)}
                      className={`px-4 py-1.5 rounded-full text-xs border transition-all ${
                        framerate === fps 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      {fps}
                    </button>
                  ))}
                </div>
              </div>

              {/* Close Indicator */}
              <div className="pt-2 flex justify-center">
                <div className="w-8 h-1 bg-white/10 rounded-full" />
              </div>
            </motion.div>
          </PopoverContent>
        </Popover>

        <div className="ml-2 p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
          <Upload className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;