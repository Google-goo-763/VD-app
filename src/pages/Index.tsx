"use client";

import React, { useState } from 'react';
import TopBar from '../components/editor/TopBar';
import PreviewArea from '../components/editor/PreviewArea';
import Timeline from '../components/editor/Timeline';
import Sidebar from '../components/editor/Sidebar';

const Index = () => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <TopBar aspectRatio={aspectRatio} onRatioChange={setAspectRatio} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <PreviewArea aspectRatio={aspectRatio} />
        <Timeline />
      </main>

      <Sidebar />
    </div>
  );
};

export default Index;