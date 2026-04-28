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

      {/* ... existing PreviewArea content ... */}
    </div>
  );
};

export default PreviewArea;