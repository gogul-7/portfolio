"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Message = { id: number; topic: string; payload: string; ms: number };

const plates = ["KA 05 MX 4821", "KA 01 AB 7730", "KA 03 NP 1094", "KL 07 CE 2210", "KA 51 HD 6602"];
const zones = ["A", "B", "C", "D"];

function makeMessage(id: number): Message {
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const n = (min: number, max: number) => Math.floor(min + Math.random() * (max - min));
  const kinds = [
    () => ({ topic: `blr/t1/trolley/zone-${pick(zones)}`, payload: `{ "available": ${n(12, 80)} }` }),
    () => ({ topic: `parking/L${n(1, 4)}/slot-${n(1, 64)}`, payload: `{ "occupied": ${Math.random() > 0.5} }` }),
    () => ({ topic: `anpr/gate-${n(1, 5)}/entry`, payload: `{ "plate": "${pick(plates)}" }` }),
    () => ({ topic: `display/L${n(1, 4)}/board`, payload: `{ "free": ${n(0, 40)} }` }),
    () => ({ topic: `rfid/reader-${n(10, 40)}/scan`, payload: `{ "tag": "E2${n(1000, 9999)}" }` }),
  ];
  return { id, ...pick(kinds)(), ms: n(4, 38) };
}

const seed: Message[] = [
  { id: -3, topic: "blr/t1/trolley/zone-B", payload: '{ "available": 42 }', ms: 12 },
  { id: -2, topic: "parking/L2/slot-17", payload: '{ "occupied": true }', ms: 8 },
  { id: -1, topic: "anpr/gate-3/entry", payload: '{ "plate": "KA 05 MX 4821" }', ms: 21 },
];

/** A simulated stream of the kind of device messages Gogul's systems handle. */
export function LiveFeed() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [count, setCount] = useState(1284);
  const next = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setMessages((m) => [makeMessage(next.current++), ...m].slice(0, 4));
      setCount((c) => c + 1);
    }, 1600);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="w-full rounded-2xl bg-[#0a0c11]/90 p-4 font-mono text-[11px] leading-relaxed shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-xl sm:text-xs">
      <div className="mb-3 flex items-center justify-between text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 animate-ping-slow" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-foreground">mqtt</span> live stream
        </span>
        <span className="tabular-nums">{count.toLocaleString("en-IN")} msgs</span>
      </div>
      <ul className="relative h-[124px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline justify-between gap-3 py-1"
            >
              <span className="min-w-0 truncate">
                <span className="text-primary">{m.topic}</span>{" "}
                <span className="text-foreground/80">{m.payload}</span>
              </span>
              <span className="shrink-0 tabular-nums text-muted">{m.ms}ms</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
