"use client";

import React from 'react';
import { 
  LayoutGrid, 
  Music, 
  Type, 
  Sticker, 
  Sparkles, 
  Layers, 
  Scissors,
  Plus
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex flex-col items-center justify-center gap-1 px-4 h-full cursor-pointer transition-colors ${active ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}>
    <Icon size={18} />
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="h-16 bg-[#121212] border-t border-white/5 flex items-center">
      <div className="flex-1 flex items-center overflow-x-auto no-scrollbar h-full">
        <SidebarItem icon={LayoutGrid} label="Media" active />
        <SidebarItem icon={Music} label="Audio" />
        <SidebarItem icon={Type} label="Text" />
        <SidebarItem icon={Sticker} label="Stickers" />
        <SidebarItem icon={Sparkles} label="Effects" />
        <SidebarItem icon={Layers} label="Transitions" />
        <SidebarItem icon={Scissors} label="Filters" />
      </div>
      
      <div className="px-4 border-l border-white/5 h-full flex items-center">
        <button className="h-9 w-9 bg-[#2a2a2a] rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
          <Plus size={18} className="text-white" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;