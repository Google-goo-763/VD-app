"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Layers,
  RotateCcw,
  RotateCw,
  Crown,
  Video,
  AudioLines,
  Image,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface PreviewAreaProps {
  aspectRatio: '16:9' | '9:16';
}

const PreviewArea = ({ aspectRatio }: PreviewAreaProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState(aspectRatio);

  const toggleMaximize = () => setIsMaximized(!isMaximized);
  const changeRatio = (ratio: '16:9' | '9:16') => setSelectedRatio(ratio);

  return (
    <div
      className={`flex flex-col bg-black relative transition-all duration-500 ease-in-out ${
        isMaximized ? 'fixed inset-0 z-[100] w-screen h-screen' : 'flex-1'
      }`}
    >
      {/* Top‑left circular button with dropdown */}
      <div className="absolute top-3 left-3 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-blue-500/30 transition-colors glow-2xl">
              <div className="flex items-center gap-1">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            sideOffset={8}
            className="flex flex-row px-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-md space-x-2 glow-2xl bg-gradient-to-r from-purple-500/30 to-blue-500/30"
          >
            <DropdownMenuItem>
              <Video className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Video</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AudioLines className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Audio</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Photo</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.03)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:20px_20px]"></div>
        
        {/* Center content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
              <Video className="w-10 h-10 text-white/70" />
            </div>
            <h3 className="text-white text-lg font-medium">Preview Area</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Your video content will appear here. Click play to preview your project.
            </p>
            
            {/* Play/Pause Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Aspect ratio indicator */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-white/10 rounded-md backdrop-blur-sm">
            {selectedRatio}
          </span>
        </div>
      </div>

      {/* Bottom controls placeholder */}
      <div className="h-16 bg-[#1a1a1a] border-t border-white/5 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Timeline controls will appear here</span>
      </div>
    </div>
  );
};

export default PreviewArea;