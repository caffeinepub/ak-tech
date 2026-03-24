import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityVel: number;
  isGold: boolean;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const COUNT = 60;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    const spawn = (yOverride?: number): Particle => ({
      x: Math.random() * canvas.width,
      y: yOverride ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.38 + 0.12),
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.7,
      opacityVel:
        (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      isGold: Math.random() > 0.62,
    });

    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityVel;

        if (p.opacity <= 0.02) {
          p.opacity = 0.02;
          p.opacityVel = Math.abs(p.opacityVel);
        } else if (p.opacity >= 0.78) {
          p.opacity = 0.78;
          p.opacityVel = -Math.abs(p.opacityVel);
        }

        if (p.y < -12) Object.assign(p, spawn(canvas.height + 12));
        if (p.x < -12) p.x = canvas.width + 12;
        if (p.x > canvas.width + 12) p.x = -12;

        // Glow halo
        const r = p.isGold ? 200 : 72;
        const g = p.isGold ? 176 : 210;
        const b = p.isGold ? 55 : 118;
        const glowR = p.size * 5.5;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(${r},${g},${b},${p.opacity * 0.55})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r + 40},${g + 30},${b + 40},${Math.min(p.opacity * 1.6, 1)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
