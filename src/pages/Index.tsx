import React, { useState } from 'react';
import { useEditor } from '../hooks/useEditor';
import MediaLibrary from '../components/editor/MediaLibrary';
import PreviewPlayer from '../components/editor/PreviewPlayer';
import Timeline from '../components/editor/Timeline';
import PropertiesPanel from '../components/editor/PropertiesPanel';
import Toolbar from '../components/editor/Toolbar';
import { showSuccess, showError, showLoading, dismissToast } from '../utils/toast';
import confetti from 'canvas-confetti';

const Index = () => {
  const { 
    state, 
    setState, 
    addMedia, 
    addToTimeline, 
    addTextClip,
    updateClip, 
    deleteClip, 
    splitClip,
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useEditor();

  const handleExport = async () => {
    const toastId = showLoading('Preparing export...');
    
    try {
      // In a real app, we'd use ffmpeg.wasm or a server-side renderer.
      // For this MVP, we'll simulate the export process.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dismissToast(toastId);
      showSuccess('Video exported successfully! (Simulation)');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      dismissToast(toastId);
      showError('Export failed. Please try again.');
    }
  };

  const selectedClip = state.timeline.find(c => c.id === state.selectedClipId) || null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden text-foreground">
      <Toolbar 
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        aspectRatio={state.aspectRatio}
        onAspectRatioChange={(ratio) => setState(prev => ({ ...prev, aspectRatio: ratio }))}
        onExport={handleExport}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <MediaLibrary 
          media={state.media} 
          onAddMedia={addMedia} 
          onAddToTimeline={addToTimeline} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <PreviewPlayer 
            state={state} 
            onPlayheadChange={(time) => setState(prev => ({ ...prev, playhead: time }))}
            onTogglePlay={() => setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
          />
          
          <Timeline 
            state={state}
            onPlayheadChange={(time) => setState(prev => ({ ...prev, playhead: time }))}
            onSelectClip={(id) => setState(prev => ({ ...prev, selectedClipId: id }))}
            onUpdateClip={updateClip}
            onDeleteClip={deleteClip}
            onSplitClip={splitClip}
            onAddText={addTextClip}
          />
        </div>

        <PropertiesPanel 
          clip={selectedClip}
          onUpdateClip={updateClip}
        />
      </div>
    </div>
  );
};

export default Index;