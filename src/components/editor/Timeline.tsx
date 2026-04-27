import React, { useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Scissors, Trash2, Type, Plus } from 'lucide-react';
import { EditorState, TimelineClip } from '../../types/editor';
import { cn } from '@/lib/utils';

interface TimelineProps {
  state: EditorState;
  onPlayheadChange: (time: number) => void;
  onSelectClip: (id: string) => void;
  onUpdateClip: (id: string, updates: Partial<TimelineClip>) => void;
  onDeleteClip: (id: string) => void;
  onSplitClip: (id: string, time: number) => void;
  onAddText: () => void;
}

const PIXELS_PER_SECOND = 40;

const Timeline: React.FC<TimelineProps> = ({ 
  state, 
  onPlayheadChange, 
  onSelectClip, 
  onUpdateClip, 
  onDeleteClip, 
  onSplitClip,
  onAddText
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
    onPlayheadChange(Math.max(0, x / PIXELS_PER_SECOND));
  };

  const totalDuration = Math.max(30, ...state.timeline.map(c => c.start + c.duration) + 10);

  return (
    <div className="h-64 border-t bg-card flex flex-col">
      <div className="p-2 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2"
            onClick={() => state.selectedClipId && onSplitClip(state.selectedClipId, state.playhead)}
            disabled={!state.selectedClipId}
          >
            <Scissors className="w-4 h-4" />
            Split
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-destructive hover:text-destructive"
            onClick={() => state.selectedClipId && onDeleteClip(state.selectedClipId)}
            disabled={!state.selectedClipId}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          <div className="w-px h-4 bg-border mx-2" />
          <Button variant="ghost" size="sm" className="h-8 gap-2" onClick={onAddText}>
            <Type className="w-4 h-4" />
            Add Text
          </Button>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">
          Total: {totalDuration.toFixed(1)}s
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div 
          ref={timelineRef}
          className="relative h-full min-w-full p-4 cursor-crosshair"
          style={{ width: totalDuration * PIXELS_PER_SECOND }}
          onClick={handleTimelineClick}
        >
          {/* Time Rulers */}
          <div className="absolute top-0 left-0 w-full h-6 border-b flex pointer-events-none">
            {Array.from({ length: Math.ceil(totalDuration) }).map((_, i) => (
              <div 
                key={i} 
                className="absolute border-l h-2 bottom-0 text-[8px] pl-1 text-muted-foreground"
                style={{ left: i * PIXELS_PER_SECOND }}
              >
                {i}s
              </div>
            ))}
          </div>

          {/* Clips Track */}
          <div className="mt-8 relative h-24 bg-muted/20 rounded-lg border border-dashed border-border">
            {state.timeline.map(clip => (
              <div
                key={clip.id}
                className={cn(
                  "absolute h-full rounded-md border-2 flex flex-col justify-center px-2 overflow-hidden cursor-pointer transition-all",
                  state.selectedClipId === clip.id 
                    ? "border-primary bg-primary/20 z-10 shadow-lg" 
                    : "border-border bg-card hover:bg-accent"
                )}
                style={{
                  left: clip.start * PIXELS_PER_SECOND,
                  width: clip.duration * PIXELS_PER_SECOND,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectClip(clip.id);
                }}
              >
                <span className="text-[10px] font-bold truncate uppercase opacity-70">
                  {clip.type}
                </span>
                <span className="text-[9px] truncate">
                  {clip.text || state.media.find(m => m.id === clip.mediaId)?.name}
                </span>
                
                {/* Trim Handles */}
                {state.selectedClipId === clip.id && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary cursor-ew-resize" />
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary cursor-ew-resize" />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-red-500 z-20 pointer-events-none"
            style={{ left: state.playhead * PIXELS_PER_SECOND }}
          >
            <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rotate-45" />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Timeline;