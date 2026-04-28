"use client";

import React, { useState } from 'react';
import { Scissors, Zap, Copy, PlaySquare, Trash2, Volume2, ChevronLeft } from 'lucide-react';

const ToolItem = ({ icon: Icon, label, onClick, isSelected }) => (
  <div 
    className={`flex flex-col items-center gap-1 min-w-[64px] cursor-pointer hover:bg-white/5 py-2 rounded ${
      isSelected ? 'bg-blue-500 text-white' : ''
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 text-white" />
    <span className="text-[10px] text-gray-400">{label}</span>
  </div>
);

const BottomToolbar = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const tools = [
    { icon: Scissors, label: "Split" },
    { icon: Zap, label: "Speed" },
    { icon: Copy, label: "Splice" },
    { icon: PlaySquare, label: "Animations" },
    { icon: Trash2, label: "Delete" },
    { icon: Volume2, label: "Volume" }
  ];

  const handleToolClick = (toolLabel) => {
    setSelectedTool(toolLabel);
  };

  return (
    <div 
      className="bg-[#1a1a1a] border-t border-[#2a2a2a] pb-8 pt-2 px-2 flex items-center overflow-x-auto no-scrollbar"
    >
      <div className="bg-[#333] p-2 rounded mr-2 cursor-pointer">
        <ChevronLeft className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex items-center overflow-x-auto">
        {tools.map((tool) => (
          <ToolItem
            key={tool.label}
            icon={tool.icon}
            label={tool.label}
            onClick={() => handleToolClick(tool.label)}
            isSelected={selectedTool === tool.label}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomToolbar;