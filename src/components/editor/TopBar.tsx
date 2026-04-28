"use client";

import React, { useState } from 'react';
import { X, Upload, ChevronDown, Monitor, Smartphone, Check, Save, Sparkles } from 'lucide-react';
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
import toast, { Toaster } from 'react-hot-toast';

interface TopBarProps {
  aspectRatio: '16:9' | '9:16';
  onRatioChange: (ratio: '16:9' | '9:16') => void;
}

const TopBar = ({ aspectRatio, onRatioChange }: TopBarProps) => {
  const [resolution, setResolution] = useState('1080p');
  const [framerate, setFramerate] = useState('60fps');
  const [projectName, setProjectName] = useState('Untitled Project');
  const [isEditing, setIsEditing] = useState(false);

  const resolutions = ['1080p', '720p', '360p'];
  const framerates = ['60fps', '30fps'];

  const handleSaveName = () => {
    toast.success(`Project renamed to "${projectName}"`, {
      style: {
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-3 bg-[#121212] text-white border-b border-white/5 z-[110]">
      <Toaster position="bottom-center" />
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
          <DropdownMenuContent 
            align="center" 
            className="bg-[#1a1a1a] backdrop-blur-lg border-white/10 text-white min-w-[160px] shadow-2xl rounded-2xl overflow-hidden p-1 z-[120]"
          >
            <DropdownMenuItem 
              onClick={() => onRatioChange('16:9')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-white/10 focus:text-white py-2.5 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2">
                <Monitor size={14} /> 16:9 Landscape
              </div>
              {aspectRatio === '16:9' && <Check size={12} />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onRatioChange('9:16')}
              className="flex items-center justify-between gap-2 cursor-pointer focus:bg-white/10 focus:text-white py-2.5 px-3 rounded-xl transition-colors"
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
            className="w-72 bg-[#1a1a1a] backdrop-blur-lg border-white/10 p-5 text-white shadow-2xl rounded-2xl overflow-hidden z-[120]"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Project Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                      setIsEditing(true);
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/30 transition-colors text-sm text-white"
                    placeholder="Enter name..."
                  />
                  {isEditing && (
                    <button 
                      onClick={handleSaveName}
                      className="bg-white text-black p-2 rounded-lg hover:bg-white/90 transition-colors"
                    >
                      <Sparkles size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Resolution Selection */}
              <div className="space-y-2.5">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Resolution</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {resolutions.map((res) => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={`py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        resolution === res 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framerate Selection */}
              <div className="space-y-2.5">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Frame Rate</label>
                <div className="flex gap-1.5">
                  {framerates.map((fps) => (
                    <button
                      key={fps}
                      onClick={() => setFramerate(fps)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        framerate === fps 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {fps}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="pt-1 flex justify-center">
                <div className="w-10 h-1 bg-white/10 rounded-full" />
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