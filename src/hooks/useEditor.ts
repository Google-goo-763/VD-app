import { useState, useCallback, useEffect, useRef } from 'react';
import { EditorState, MediaItem, TimelineClip, MediaType } from '../types/editor';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE: EditorState = {
  media: [],
  timeline: [],
  playhead: 0,
  isPlaying: false,
  selectedClipId: null,
  aspectRatio: '16:9',
  resolution: '1080p',
};

export const useEditor = () => {
  const [state, setState] = useState<EditorState>(() => {
    const saved = localStorage.getItem('video-editor-project');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [history, setHistory] = useState<EditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-save
  useEffect(() => {
    localStorage.setItem('video-editor-project', JSON.stringify(state));
  }, [state]);

  const pushToHistory = useCallback((newState: EditorState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, newState].slice(-20); // Keep last 20 actions
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const updateState = useCallback((updater: (prev: EditorState) => EditorState) => {
    setState(prev => {
      const newState = updater(prev);
      // Only push to history if timeline or media changed significantly
      if (newState.timeline !== prev.timeline || newState.media !== prev.media) {
        // We handle history separately to avoid flooding it with playhead updates
      }
      return newState;
    });
  }, []);

  const addMedia = useCallback((item: Omit<MediaItem, 'id'>) => {
    const newItem = { ...item, id: uuidv4() };
    setState(prev => {
      const newState = { ...prev, media: [...prev.media, newItem] };
      pushToHistory(newState);
      return newState;
    });
  }, [pushToHistory]);

  const addToTimeline = useCallback((mediaId: string) => {
    setState(prev => {
      const mediaItem = prev.media.find(m => m.id === mediaId);
      if (!mediaItem) return prev;

      const lastClip = prev.timeline[prev.timeline.length - 1];
      const start = lastClip ? lastClip.start + lastClip.duration : 0;

      const newClip: TimelineClip = {
        id: uuidv4(),
        mediaId,
        type: mediaItem.type,
        start,
        duration: mediaItem.duration || 5,
        trimStart: 0,
        volume: 1,
        transform: { x: 0, y: 0, scale: 1, rotate: 0 },
      };

      const newState = { ...prev, timeline: [...prev.timeline, newClip], selectedClipId: newClip.id };
      pushToHistory(newState);
      return newState;
    });
  }, [pushToHistory]);

  const addTextClip = useCallback(() => {
    setState(prev => {
      const lastClip = prev.timeline[prev.timeline.length - 1];
      const start = lastClip ? lastClip.start + lastClip.duration : 0;

      const newClip: TimelineClip = {
        id: uuidv4(),
        mediaId: 'text-source',
        type: 'text',
        start,
        duration: 5,
        trimStart: 0,
        volume: 0,
        text: 'Double click to edit',
        style: { color: '#ffffff', fontSize: 48 },
        transform: { x: 0, y: 0, scale: 1, rotate: 0 },
      };

      const newState = { ...prev, timeline: [...prev.timeline, newClip], selectedClipId: newClip.id };
      pushToHistory(newState);
      return newState;
    });
  }, [pushToHistory]);

  const updateClip = useCallback((clipId: string, updates: Partial<TimelineClip>) => {
    setState(prev => {
      const newState = {
        ...prev,
        timeline: prev.timeline.map(c => c.id === clipId ? { ...c, ...updates } : c)
      };
      // Debounce history for transforms? For now just push
      return newState;
    });
  }, []);

  const deleteClip = useCallback((clipId: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        timeline: prev.timeline.filter(c => c.id !== clipId),
        selectedClipId: prev.selectedClipId === clipId ? null : prev.selectedClipId
      };
      pushToHistory(newState);
      return newState;
    });
  }, [pushToHistory]);

  const splitClip = useCallback((clipId: string, timeAtPlayhead: number) => {
    setState(prev => {
      const clip = prev.timeline.find(c => c.id === clipId);
      if (!clip) return prev;

      const relativeTime = prev.playhead - clip.start;
      if (relativeTime <= 0 || relativeTime >= clip.duration) return prev;

      const firstHalf = { ...clip, duration: relativeTime };
      const secondHalf = { 
        ...clip, 
        id: uuidv4(), 
        start: prev.playhead, 
        duration: clip.duration - relativeTime,
        trimStart: clip.trimStart + relativeTime
      };

      const newTimeline = prev.timeline.flatMap(c => c.id === clipId ? [firstHalf, secondHalf] : c);
      const newState = { ...prev, timeline: newTimeline };
      pushToHistory(newState);
      return newState;
    });
  }, [pushToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setState(history[prevIndex]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setState(history[nextIndex]);
    }
  }, [history, historyIndex]);

  return {
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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};