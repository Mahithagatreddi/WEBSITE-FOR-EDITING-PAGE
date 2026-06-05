/** Pause other portfolio reels so only one plays audio at a time. */
export function pauseOtherReels(current: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-portfolio-reel]").forEach((el) => {
    if (el === current) return;
    el.pause();
    el.muted = true;
    el.currentTime = 0;
  });
}
