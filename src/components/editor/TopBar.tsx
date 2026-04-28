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
import { motion } from "framer-motion";

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
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-white/20 transition-all">
              {aspectRatio === '16:9' ? <Monitor size={14} /> : <Smartphone size={14} />}
              {aspectRatio}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-white/20 text-black min-w-[140px] shadow-2xl">
            <DropdownMenuItem 
              onClick={() => onRatioChange('16:9')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-black/5 focus:text-black py-2"
            >
              <div className="flex items-center gap-2">
                <Monitor size={14} /> 16:9 Landscape
              </div>
              {aspectRatio === '16:9' && <Check size={12} />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onRatioChange('9:16')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-black/5 focus:text-black py-2"
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
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-white/20 transition-all">
              {resolution.toUpperCase()}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            align="center" 
            className="w-72 bg-white/80 backdrop-blur-3xl backdrop-saturate-200 border-white/30 p-5 text-black shadow-2xl rounded-2xl overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Project Name</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:border-black/20 transition-colors text-sm text-black"
                  placeholder="Enter name..."
                />
              </div>

              {/* Resolution Selection */}
              <div className="space-y-2.5">
                <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Resolution</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {resolutions.map((res) => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={`py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        resolution === res 
                        ? 'bg-black text-white border-black shadow-lg' 
                        : 'bg-black/5 border-black/5 text-black/50 hover:bg-black/10 hover:text-black'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framerate Selection */}
              <div className="space-y-2.5">
                <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Frame Rate</label>
                <div className="flex gap-1.5">
                  {framerates.map((fps) => (
                    <button
                      key={fps}
                      onClick={() => setFramerate(fps)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        framerate === fps 
                        ? 'bg-black text-white border-black shadow-lg' 
                        : 'bg-black/5 border-black/5 text-black/50 hover:bg-black/10 hover:text-black'
                      }`}
                    >
                      {fps}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="pt-1 flex justify-center">
                <div className="w-10 h-1 bg-black/10 rounded-full" />
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