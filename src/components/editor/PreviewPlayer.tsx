import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Maximize } from 'lucide-react';
import { EditorState, TimelineClip, MediaItem } from '../../types/editor';

interface PreviewPlayerProps {
  state: EditorState;
  onPlayheadChange: (time: number) => void;
  onTogglePlay: () => void;
}

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ state, onPlayheadChange, onTogglePlay }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaElements = useRef<Map<string, HTMLVideoElement | HTMLImageElement>>(new Map());
  const requestRef = useRef<number>();

  // Preload media elements
  useEffect(() => {
    state.media.forEach(item => {
      if (!mediaElements.current.has(item.id)) {
        if (item.type === 'video') {
          const video = document.createElement('video');
          video.src = item.url;
          video.muted = true; // Preview is muted by default, audio handled separately
          mediaElements.current.set(item.id, video);
        } else if (item.type === 'image') {
          const img = new Image();
          img.src = item.url;
          mediaElements.current.set(item.id, img);
        }
      }
    });
  }, [state.media]);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find clips at current playhead
    const activeClips = state.timeline.filter(clip => 
      state.playhead >= clip.start && state.playhead <= clip.start + clip.duration
    );

    activeClips.forEach(clip => {
      ctx.save();
      
      // Apply transforms
      ctx.translate(canvas.width / 2 + clip.transform.x, canvas.height / 2 + clip.transform.y);
      ctx.rotate((clip.transform.rotate * Math.PI) / 180);
      ctx.scale(clip.transform.scale, clip.transform.scale);

      if (clip.type === 'text' && clip.text) {
        ctx.fillStyle = clip.style?.color || '#fff';
        ctx.font = `${clip.style?.fontSize || 48}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(clip.text, 0, 0);
      } else {
        const media = mediaElements.current.get(clip.mediaId);
        if (media) {
          const relativeTime = state.playhead - clip.start + clip.trimStart;
          
          if (media instanceof HTMLVideoElement) {
            media.currentTime = relativeTime;
            // Draw video frame
            const aspect = media.videoWidth / media.videoHeight;
            let drawW = canvas.width;
            let drawH = canvas.width / aspect;
            if (drawH > canvas.height) {
              drawH = canvas.height;
              drawW = canvas.height * aspect;
            }
            ctx.drawImage(media, -drawW / 2, -drawH / 2, drawW, drawH);
          } else if (media instanceof HTMLImageElement) {
            const aspect = media.width / media.height;
            let drawW = canvas.width;
            let drawH = canvas.width / aspect;
            if (drawH > canvas.height) {
              drawH = canvas.height;
              drawW = canvas.height * aspect;
            }
            ctx.drawImage(media, -drawW / 2, -drawH / 2, drawW, drawH);
          }
        }
      }
      ctx.restore();
    });

    if (state.isPlaying) {
      requestRef.current = requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    render();
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.playhead, state.isPlaying, state.timeline]);

  // Playback logic
  useEffect(() => {
    let interval: any;
    if (state.isPlaying) {
      const startTime = Date.now();
      const startPlayhead = state.playhead;
      
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        onPlayheadChange(startPlayhead + elapsed);
      }, 1000 / 60);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying]);

  const canvasWidth = state.aspectRatio === '16:9' ? 1280 : 720;
  const canvasHeight = state.aspectRatio === '16:9' ? 720 : 1280;

  return (
    <div className="flex-1 flex flex-col bg-black/95 items-center justify-center p-8 relative overflow-hidden">
      <div 
        className="relative shadow-2xl bg-black overflow-hidden"
        style={{ 
          aspectRatio: state.aspectRatio === '16:9' ? '16/9' : '9/16',
          maxHeight: '70%',
          maxWidth: '100%'
        }}
      >
        <canvas 
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-8 flex items-center gap-4 bg-card/50 backdrop-blur-md p-4 rounded-full border border-white/10">
        <Button variant="ghost" size="icon" onClick={() => onPlayheadChange(0)}>
          <SkipBack className="w-5 h-5" />
        </Button>
        <Button 
          variant="default" 
          size="icon" 
          className="w-12 h-12 rounded-full bg-primary hover:scale-105 transition-transform"
          onClick={onTogglePlay}
        >
          {state.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward className="w-5 h-5" />
        </Button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <span className="text-xs font-mono text-white/70 min-w-[60px]">
          {state.playhead.toFixed(2)}s
        </span>
      </div>
    </div>
  );
};

export default PreviewPlayer;