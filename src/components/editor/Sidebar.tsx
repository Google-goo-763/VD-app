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
  <div className={`flex flex-col items-center gap-1 py-4 cursor-pointer transition-colors ${active ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}>
    <Icon size={20} />
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="w-20 bg-[#121212] border-r border-white/5 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <SidebarItem icon={LayoutGrid} label="Media" active />
        <SidebarItem icon={Music} label="Audio" />
        <SidebarItem icon={Type} label="Text" />
        <SidebarItem icon={Sticker} label="Stickers" />
        <SidebarItem icon={Sparkles} label="Effects" />
        <SidebarItem icon={Layers} label="Transitions" />
        <SidebarItem icon={Scissors} label="Filters" />
      </div>
      
      <div className="p-4 border-t border-white/5">
        <button className="w-full aspect-square bg-[#2a2a2a] rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
          <Plus size={20} className="text-white" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;