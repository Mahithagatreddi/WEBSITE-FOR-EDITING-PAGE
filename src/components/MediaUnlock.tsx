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

/** Hero autoplay only. Portfolio reels manage their own sound on tap. */
const autoplayVideos = new Set<HTMLVideoElement>();

export function registerAutoplayVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  autoplayVideos.add(el);
}

function playAutoplayMuted() {
  autoplayVideos.forEach((video) => {
    video.muted = true;
    video.play().catch(() => {});
  });
}

export function MediaUnlockProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => {
    if (unlocked) return;
    setUnlocked(true);
    playAutoplayMuted();
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
    if (unlocked) playAutoplayMuted();
  }, [unlocked]);

  return (
    <MediaUnlockContext.Provider value={unlocked}>
      {children}
    </MediaUnlockContext.Provider>
  );
}
