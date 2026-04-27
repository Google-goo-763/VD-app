import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Video, Music, Image as ImageIcon, Upload } from 'lucide-react';
import { MediaItem } from '../../types/editor';

interface MediaLibraryProps {
  media: MediaItem[];
  onAddMedia: (item: Omit<MediaItem, 'id'>) => void;
  onAddToTimeline: (id: string) => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ media, onAddMedia, onAddToTimeline }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video') ? 'video' : 
                   file.type.startsWith('audio') ? 'audio' : 'image';
      
      // For MVP, we'll assume some durations or get them from elements
      if (type === 'video' || type === 'audio') {
        const el = document.createElement(type);
        el.src = url;
        el.onloadedmetadata = () => {
          onAddMedia({
            type,
            url,
            name: file.name,
            duration: el.duration
          });
        };
      } else {
        onAddMedia({
          type,
          url,
          name: file.name,
          duration: 5 // Default 5s for images
        });
      }
    });
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Media Library</h2>
        <Button size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()}>
          <Plus className="w-4 h-4" />
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept="video/*,audio/*,image/*"
          onChange={handleFileUpload}
        />
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {media.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground border-2 border-dashed rounded-lg p-4 text-center">
            <Upload className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs">Upload media to start editing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {media.map(item => (
              <Card 
                key={item.id} 
                className="group relative overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all"
                onClick={() => onAddToTimeline(item.id)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  {item.type === 'video' && <Video className="w-6 h-6 text-muted-foreground" />}
                  {item.type === 'audio' && <Music className="w-6 h-6 text-muted-foreground" />}
                  {item.type === 'image' && <img src={item.url} className="w-full h-full object-cover" alt="" />}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Plus className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-medium truncate">{item.name}</p>
                  <p className="text-[8px] text-muted-foreground">{item.duration.toFixed(1)}s</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MediaLibrary;