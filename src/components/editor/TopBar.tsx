"use client";

import React from 'react';
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
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-gradient-to-tr hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/30 transition-all">
              {aspectRatio === '16:9' ? <Monitor size={14} /> : <Smartphone size={14} />}
              {aspectRatio}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center" 
            className="bg-[#1a1a1a] backdrop-blur-lg border-white/10 text-white min-w-[160px] shadow-2xl shadow-purple-500/20 rounded-2xl overflow-hidden p-1 z-[120] hover:shadow-[0_0_30px_rgba(168,85,247,0.3),0_0_60px_rgba(59,130,246,0.2)] hover:border-purple-500/30 transition-all duration-300 glow-2xl bg-gradient-to-r from-purple-500/30 to-blue-500/30"
          >
            <DropdownMenuItem 
              onClick={() => onRatioChange('16:9')}
              className="flex items-center justify-between gap-2 cursor-pointer py-2.5 px-3 rounded-xl transition-all border border-transparent outline-none focus:bg-transparent focus:text-white hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-blue-500/40 hover:text-white hover:border-transparent"
            >
              <div className="flex items-center gap-2">
                <Monitor size={14} /> 16:9 Landscape
              </div>
              {aspectRatio === '16:9' && <Check size={12} />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onRatioChange('9:16')}
              className="flex items-center justify-between gap-2 cursor-pointer py-2.5 px-3 rounded-xl transition-all border border-transparent outline-none focus:bg-transparent focus:text-white hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-blue-500/40 hover:text-white hover:border-transparent"
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
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-gradient-to-tr hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/30 transition-all">
              {resolution.toUpperCase()}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            align="center" 
            className="w-72 bg-[#1a1a1a] backdrop-blur-lg border-white/10 p-5 text-white shadow-2xl shadow-purple-500/20 rounded-2xl overflow-hidden z-[120] hover:shadow-[0_0_30px_rgba(168,85,247,0.3),0_0_60px_rgba(59,130,246,0.2)] hover:border-purple-500/30 transition-all duration-300 glow-2xl bg-gradient-to-r from-purple-500/30 to-blue-500/30"
          >
            {/* ... existing content ... */}
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