import { useEffect } from "react";

const CHARS = ["$","$","$","$","§","¶","†","‡","∞","Ω","Δ","Σ","Ψ","Λ","≈","≠","∴","∇","⊕","⊗","◈","⬡","⟁","⌘","⎔","⚜","✦","⋆","※","⌖"];
const MAX = 32;

export default function CursorSparks() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const sparks = [];
    let mx = -999, my = -999, raf = 0;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      if (Math.random() < 0.6 && sparks.length < MAX) {
        const isDollar = Math.random() < 0.45;
        sparks.push({
          x: mx + (Math.random() - 0.5) * 18,
          y: my + (Math.random() - 0.5) * 18,
          ch: isDollar ? "$" : CHARS[Math.floor(Math.random() * CHARS.length)],
          born: now,
          life: 500 + Math.random() * 400,
          vy: -(0.35 + Math.random() * 0.65),
          vx: (Math.random() - 0.5) * 0.5,
          size: isDollar ? 11 + Math.random() * 4 : 9 + Math.random() * 5,
          isDollar,
        });
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const age = now - s.born;
        if (age > s.life) { sparks.splice(i, 1); continue; }
        const progress = age / s.life;
        const alpha = (1 - progress) * (s.isDollar ? 0.85 : 0.7);
        s.x += s.vx;
        s.y += s.vy;
        ctx.font = `${s.isDollar ? "bold " : ""}${s.size}px 'Courier New', monospace`;
        const g = s.isDollar ? Math.floor(100 + 40 * (1 - progress)) : Math.floor(80 + 50 * (1 - progress));
        ctx.fillStyle = `rgba(0,${g},0,${alpha})`;
        ctx.fillText(s.ch, s.x, s.y);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.remove();
    };
  }, []);
  return null;
}
