"use client";

import React from 'react';
import { Scissors, Zap, Copy, PlaySquare, Trash2, Volume2, ChevronLeft } from 'lucide-react';

const ToolItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer hover:bg-white/5 py-2 rounded">
    <Icon className="w-5 h-5 text-white" />
    <span className="text-[10px] text-gray-400">{label}</span>
  </div>
);

const BottomToolbar = () => {
  return (
    <div className="bg-[#1a1a1a] border-t border-[#2a2a2a] pb-8 pt-2 px-2 flex items-center overflow-x-auto no-scrollbar">
      <div className="bg-[#333] p-2 rounded mr-2 cursor-pointer">
        <ChevronLeft className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex items-center">
        <ToolItem icon={Scissors} label="Split" />
        <ToolItem icon={Zap} label="Speed" />
        <ToolItem icon={Copy} label="Splice" />
        <ToolItem icon={PlaySquare} label="Animations" />
        <ToolItem icon={Trash2} label="Delete" />
        <ToolItem icon={Volume2} label="Volume" />
      </div>
    </div>
  );
};

export default BottomToolbar;