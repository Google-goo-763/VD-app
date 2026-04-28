"use client";

import React from 'react';
import { 
  Music, 
  Type, 
  Sticker, 
  Sparkles, 
  Layers
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex flex-col items-center justify-center gap-1 flex-1 h-full cursor-pointer transition-colors ${active ? 'text-white bg-white/5' : 'text-gray-500'}`}>
    <Icon size={18} />
    <span className="text-[10px] font-medium whitespace-nowrap">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="h-16 bg-[#121212] border-t border-white/5 flex items-center">
      <div className="flex-1 flex items-center h-full px-2">
        <SidebarItem icon={Music} label="Audio" />
        <SidebarItem icon={Type} label="Text" />
        <SidebarItem icon={Sticker} label="Stickers" />
        <SidebarItem icon={Sparkles} label="Effects" />
        <SidebarItem icon={Layers} label="Transitions" />
      </div>
    </aside>
  );
};

export default Sidebar;