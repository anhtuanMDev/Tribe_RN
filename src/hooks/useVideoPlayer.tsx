import {
  useState as useStateVP,
  useRef as useRefVP,
  useCallback as useCbVP,
} from 'react';

export function useVideoPlayer() {
  const [isPlaying, setIsPlaying] = useStateVP(false);
  const [isMuted, setIsMuted] = useStateVP(true);
  const [progress, setProgress] = useStateVP(0);
  const [duration, setDuration] = useStateVP(0);
  const videoRef = useRefVP<any>(null);

  const togglePlay = useCbVP(() => setIsPlaying(p => !p), []);
  const toggleMute = useCbVP(() => setIsMuted(m => !m), []);
  const seek = useCbVP((time: number) => {
    videoRef.current?.seek(time);
    setProgress(time);
  }, []);

  const onProgress = useCbVP(({ currentTime }: { currentTime: number }) => {
    setProgress(currentTime);
  }, []);

  const onLoad = useCbVP(({ duration: d }: { duration: number }) => {
    setDuration(d);
  }, []);

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    duration,
    progressPercent,
    togglePlay,
    toggleMute,
    seek,
    onProgress,
    onLoad,
    setIsPlaying,
  };
}
