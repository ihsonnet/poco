'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#@$%&01';

interface ScrambleTextProps {
  children: string;
  className?: string;
}

export function ScrambleText({ children, className = '' }: ScrambleTextProps) {
  const [text, setText] = useState(children);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    let frame = 0;
    const endFrames = children.split('').map((_, i) => Math.round(i * 3) + 18 + Math.floor(Math.random() * 18));
    let raf = 0;
    const tick = () => {
      const next = children
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (frame >= endFrames[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setText(next);
      frame += 1;
      if (frame < Math.max(...endFrames) + 1) raf = requestAnimationFrame(tick);
      else setText(children);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [children]);

  return <span className={`sonet-scramble ${className}`}>{text}</span>;
}
