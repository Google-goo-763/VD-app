"use client";

import React from 'react';
import TopBar from '@/components/editor/TopBar';
import PreviewArea from '@/components/editor/PreviewArea';
import Timeline from '@/components/editor/Timeline';
import BottomToolbar from '@/components/editor/BottomToolbar';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden max-w-md mx-auto border-x border-gray-800">
      <TopBar />
      <PreviewArea />
      <Timeline />
      <BottomToolbar />
    </div>
  );
};

export default Index;