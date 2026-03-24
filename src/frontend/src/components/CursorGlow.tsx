import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = -400;
    let my = -400;
    let cx = -400;
    let cy = -400;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onLeave = () => {
      mx = -400;
      my = -400;
    };

    const tick = () => {
      cx += (mx - cx) * 0.09;
      cy += (my - cy) * 0.09;
      el.style.transform = `translate(${cx - 180}px, ${cy - 180}px)`;
      animId = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />;
}
