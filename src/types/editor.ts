export type MediaType = 'video' | 'audio' | 'image';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  name: string;
  duration: number; // in seconds
  thumbnail?: string;
}

export interface Transform {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface TimelineClip {
  id: string;
  mediaId: string;
  type: MediaType | 'text';
  start: number; // start time on timeline
  duration: number; // duration of the clip
  trimStart: number; // offset from the beginning of the source media
  volume: number;
  transform: Transform;
  text?: string;
  style?: {
    color: string;
    fontSize: number;
  };
}

export interface EditorState {
  media: MediaItem[];
  timeline: TimelineClip[];
  playhead: number;
  isPlaying: boolean;
  selectedClipId: string | null;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}