import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimelineClip } from '../../types/editor';
import { Settings2, Type, Volume2, Move } from 'lucide-react';

interface PropertiesPanelProps {
  clip: TimelineClip | null;
  onUpdateClip: (id: string, updates: Partial<TimelineClip>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ clip, onUpdateClip }) => {
  if (!clip) {
    return (
      <div className="w-72 border-l bg-card flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <Settings2 className="w-12 h-12 mb-4 opacity-10" />
        <p className="text-sm">Select a clip on the timeline to edit its properties</p>
      </div>
    );
  }

  const updateTransform = (key: string, value: number) => {
    onUpdateClip(clip.id, {
      transform: { ...clip.transform, [key]: value }
    });
  };

  return (
    <div className="w-72 border-l bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Properties</h2>
      </div>

      <Tabs defaultValue="transform" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="transform"><Move className="w-4 h-4" /></TabsTrigger>
          <TabsTrigger value="text" disabled={clip.type !== 'text'}><Type className="w-4 h-4" /></TabsTrigger>
          <TabsTrigger value="audio"><Volume2 className="w-4 h-4" /></TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="transform" className="space-y-6 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Scale</Label>
                  <span className="text-[10px] text-muted-foreground">{clip.transform.scale.toFixed(2)}x</span>
                </div>
                <Slider 
                  value={[clip.transform.scale]} 
                  min={0.1} max={3} step={0.01}
                  onValueChange={([v]) => updateTransform('scale', v)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Rotation</Label>
                  <span className="text-[10px] text-muted-foreground">{clip.transform.rotate}°</span>
                </div>
                <Slider 
                  value={[clip.transform.rotate]} 
                  min={0} max={360} step={1}
                  onValueChange={([v]) => updateTransform('rotate', v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">X Position</Label>
                  <Input 
                    type="number" 
                    value={clip.transform.x} 
                    onChange={(e) => updateTransform('x', Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Y Position</Label>
                  <Input 
                    type="number" 
                    value={clip.transform.y} 
                    onChange={(e) => updateTransform('y', Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-6 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Content</Label>
                <Input 
                  value={clip.text || ''} 
                  onChange={(e) => onUpdateClip(clip.id, { text: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Font Size</Label>
                <Slider 
                  value={[clip.style?.fontSize || 48]} 
                  min={12} max={200} step={1}
                  onValueChange={([v]) => onUpdateClip(clip.id, { style: { ...clip.style!, fontSize: v } })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Color</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={clip.style?.color || '#ffffff'} 
                    onChange={(e) => onUpdateClip(clip.id, { style: { ...clip.style!, color: e.target.value } })}
                    className="w-12 h-8 p-1"
                  />
                  <Input 
                    value={clip.style?.color || '#ffffff'} 
                    onChange={(e) => onUpdateClip(clip.id, { style: { ...clip.style!, color: e.target.value } })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Volume</Label>
                  <span className="text-[10px] text-muted-foreground">{Math.round(clip.volume * 100)}%</span>
                </div>
                <Slider 
                  value={[clip.volume]} 
                  min={0} max={1} step={0.01}
                  onValueChange={([v]) => onUpdateClip(clip.id, { volume: v })}
                />
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;