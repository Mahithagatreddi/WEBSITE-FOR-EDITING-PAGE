"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const MediaUnlockContext = createContext(false);

export function useMediaUnlocked() {
  return useContext(MediaUnlockContext);
}

export function registerVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  pendingVideos.add(el);
}

const pendingVideos = new Set<HTMLVideoElement>();

function playAllPending() {
  pendingVideos.forEach((video) => {
    video.muted = true;
    video.play().catch(() => {});
  });
}

export function MediaUnlockProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => {
    if (unlocked) return;
    setUnlocked(true);
    playAllPending();
  }, [unlocked]);

  useEffect(() => {
    const onInteract = () => unlock();
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [unlock]);

  useEffect(() => {
    if (unlocked) playAllPending();
  }, [unlocked]);

  return (
    <MediaUnlockContext.Provider value={unlocked}>
      {children}
    </MediaUnlockContext.Provider>
  );
}
