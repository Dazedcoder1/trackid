// RevealScene2D.jsx
import { useEffect, useRef } from 'react';

const PIECES = [
  { key: 'back',    src: '/assets/images/piece-back.png',    finalX: -300, label: 'Shell' },
  { key: 'inner',   src: '/assets/images/piece-inner.png',   finalX: -150, label: 'Inner Casing' },
  { key: 'pcb',     src: '/assets/images/piece-pcb.png',     finalX: 0,    label: 'PCB' },
  { key: 'battery', src: '/assets/images/piece-battery.png', finalX: 150,  label: 'Battery' },
  { key: 'front',   src: '/assets/images/piece-front.png',   finalX: 300,  label: 'Front Shell' },
];

function easeInOut(p) {
  return p < 0.5
    ? 2 * p * p
    : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

export default function RevealScene2D({ progressRef }) {
  const pieceRefs = useRef([]);
  const labelRefs = useRef([]);
  const currentX = useRef(PIECES.map(() => 0));
  const rafRef = useRef(null);

  useEffect(() => {
    function animate() {
      const p = progressRef.current;
      const eased = easeInOut(p);

      PIECES.forEach((piece, i) => {
        const targetX = piece.finalX * eased;

        // each piece has slightly different lerp speed — outer pieces lag behind
        const lerpSpeed = 0.06 + i * 0.01;
        currentX.current[i] += (targetX - currentX.current[i]) * lerpSpeed;

        const el = pieceRefs.current[i];
        if (!el) return;

        el.style.transform = `translateX(${currentX.current[i]}px)`;

        if (piece.key === 'front') {
          el.style.opacity = 1;
        } else {
          el.style.opacity = Math.min(1, p * 2);
        }
      });

      labelRefs.current.forEach((el) => {
        if (!el) return;
        const labelOpacity = Math.min(1, Math.max(0, (p - 0.7) / 0.3));
        el.style.opacity = labelOpacity;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center" style={{ height: '380px' }}>

      {/* Radial glow behind pieces */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(157,180,199,0.12) 0%, transparent 70%)',
        }}
      />

      {PIECES.map((piece, i) => (
        <div
          key={piece.key}
          className="absolute flex flex-col items-center"
          ref={el => pieceRefs.current[i] = el}
          style={{ opacity: piece.key === 'front' ? 1 : 0, willChange: 'transform, opacity' }}
        >
          <img
            src={piece.src}
            alt={piece.label}
            className="h-64 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          />
          <span
            ref={el => labelRefs.current[i] = el}
            className="font-mono text-xs uppercase tracking-widest text-accentDeep whitespace-nowrap mt-4"
            style={{ opacity: 0 }}
          >
            {piece.label}
          </span>
        </div>
      ))}

    </div>
  );
}