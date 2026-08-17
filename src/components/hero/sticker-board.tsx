"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { spring } from "@/lib/motion";

interface Token {
  id: string;
  label: string;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
  accent: string;
}

const TOKENS: Token[] = [
  {
    id: "racket",
    label: "Swing",
    emoji: "🎾",
    x: 10,
    y: 14,
    rotate: -8,
    accent: "bg-lawn",
  },
  {
    id: "glove",
    label: "Impact",
    emoji: "🥊",
    x: 58,
    y: 10,
    rotate: 6,
    accent: "bg-coral",
  },
  {
    id: "hand",
    label: "Sign",
    emoji: "🤟",
    x: 34,
    y: 42,
    rotate: -3,
    accent: "bg-cobalt text-white",
  },
  {
    id: "ball",
    label: "Track",
    emoji: "📡",
    x: 64,
    y: 48,
    rotate: 10,
    accent: "bg-ochre",
  },
  {
    id: "cam",
    label: "Webcam",
    emoji: "📷",
    x: 14,
    y: 58,
    rotate: 4,
    accent: "bg-paper",
  },
];

function DraggableToken({ token }: { token: Token }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (reduce) return;
    x.set(x.get() + info.velocity.x * 0.1);
    y.set(y.get() + info.velocity.y * 0.1);
  };

  return (
    <motion.div
      drag={!reduce}
      dragMomentum
      dragElastic={0.45}
      dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
      onDragEnd={onDragEnd}
      style={{ x, y, left: `${token.x}%`, top: `${token.y}%` }}
      className={`absolute z-10 cursor-grab touch-none select-none active:cursor-grabbing ${token.accent} sticker-sm border-2 border-charcoal px-3 py-2 shadow-[2px_2px_0_#18181B]`}
      initial={false}
      animate={{ rotate: token.rotate }}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileDrag={reduce ? undefined : { scale: 1.12, rotate: token.rotate + 6, zIndex: 30 }}
      transition={spring}
      aria-label={`Drag ${token.label} token`}
    >
      <span className="mr-1.5 text-base" aria-hidden>
        {token.emoji}
      </span>
      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wide">
        {token.label}
      </span>
    </motion.div>
  );
}

export function StickerBoard() {
  return (
    <div
      className="relative h-56 w-full overflow-hidden border-2 border-charcoal bg-paper-deep sm:h-72"
      aria-label="Sticker board: drag the tokens"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        aria-hidden
      >
        <line
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="#18181B"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle
          cx="50%"
          cy="50%"
          r="18%"
          fill="none"
          stroke="#18181B"
          strokeWidth="1.5"
        />
        <circle
          cx="50%"
          cy="50%"
          r="4%"
          fill="#E15A46"
          stroke="#18181B"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>

      <p className="pointer-events-none absolute bottom-3 left-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
        Drag · throw · stack
      </p>

      {TOKENS.map((t) => (
        <DraggableToken key={t.id} token={t} />
      ))}
    </div>
  );
}
