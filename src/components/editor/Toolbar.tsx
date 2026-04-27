import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Undo2, 
  Redo2, 
  Download, 
  Monitor, 
  Smartphone, 
  Save,
  Settings
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  aspectRatio: '16:9' | '9:16';
  onAspectRatioChange: (ratio: '16:9' | '9:16') => void;
  onExport: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  aspectRatio,
  onAspectRatioChange,
  onExport
}) => {
  return (
    <div className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-bold text-sm tracking-tight">DYAD EDIT</span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo}>
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo}>
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              {aspectRatio === '16:9' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              {aspectRatio}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onAspectRatioChange('16:9')}>
              <Monitor className="w-4 h-4 mr-2" /> 16:9 (Widescreen)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAspectRatioChange('9:16')}>
              <Smartphone className="w-4 h-4 mr-2" /> 9:16 (Portrait)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90" onClick={onExport}>
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;