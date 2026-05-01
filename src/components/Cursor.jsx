import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    };

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ring.current) {
        gsap.set(ring.current, { x: ringPos.current.x, y: ringPos.current.y });
      }
      requestAnimationFrame(lerp);
    };
    lerp();

    const onEnter = () => {
      gsap.to(ring.current, { scale: 2.5, borderColor: 'var(--accent)', duration: 0.3 });
      gsap.to(dot.current, { scale: 0.3, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring.current, { scale: 1, borderColor: 'rgba(124,111,255,0.6)', duration: 0.3 });
      gsap.to(dot.current, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: 'var(--accent)', borderRadius: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        zIndex: 9999, mixBlendMode: 'screen'
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, width: 36, height: 36,
        border: '1.5px solid rgba(124,111,255,0.6)', borderRadius: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        zIndex: 9998, mixBlendMode: 'screen', transition: 'border-color 0.3s'
      }} />
    </>
  );
}
