export const scrollState = {
  target: 0,
  progress: 0,
  focus: 0,
  pointerX: 0,
  pointerY: 0,
  sx: 0,
  sy: 0,
};

export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function trackScroll() {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.target = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  };
  const onPointer = (e: PointerEvent) => {
    scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("pointermove", onPointer, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onPointer);
  };
}
