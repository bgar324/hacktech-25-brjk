// HandVisualizer.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";

const KEYS = [
  "wrist",
  "thumb_joint",
  "thumb_middle",
  "thumb_tip",
  "index_joint",
  "index_middle",
  "index_tip",
  "middle_joint",
  "middle_middle",
  "middle_tip",
  "ring_joint",
  "ring_middle",
  "ring_tip",
  "pinky_joint",
  "pinky_middle",
  "pinky_tip",
] as const;
type JointKey = (typeof KEYS)[number];

type NumFrame = Record<JointKey, [number, number]>;

const BONES: [JointKey, JointKey][] = [
  ["wrist", "thumb_joint"],
  ["thumb_joint", "thumb_middle"],
  ["thumb_middle", "thumb_tip"],
  ["wrist", "index_joint"],
  ["index_joint", "index_middle"],
  ["index_middle", "index_tip"],
  ["wrist", "middle_joint"],
  ["middle_joint", "middle_middle"],
  ["middle_middle", "middle_tip"],
  ["wrist", "ring_joint"],
  ["ring_joint", "ring_middle"],
  ["ring_middle", "ring_tip"],
  ["wrist", "pinky_joint"],
  ["pinky_joint", "pinky_middle"],
  ["pinky_middle", "pinky_tip"],
];

export default function HandVisualizer() {
  const [ready, setReady] = useState(false);

  // refs for left and right hand target & current poses
  const targetLeft = useRef<NumFrame>({} as NumFrame);
  const targetRight = useRef<NumFrame>({} as NumFrame);
  const currentLeft = useRef<NumFrame>({} as NumFrame);
  const currentRight = useRef<NumFrame>({} as NumFrame);

  // subscribe to Firestore and update target frames
  useEffect(() => {
    const framesRef = collection(db, "first");
    const q = query(framesRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) return;
      const doc = snap.docs[snap.docs.length - 1];
      const data = doc.data();
      const handType = data.hand_type as string;
      const target = handType === "left" ? targetLeft.current : targetRight.current;
      KEYS.forEach((k) => {
        const raw = (data as any)[k] as [string, string, string];
        // parse X and Z
        target[k] = [parseFloat(raw[0]), parseFloat(raw[2])];
      });
      if (!ready) setReady(true);
    });
    return () => unsub();
  }, [ready]);

  // animate current frame towards target
  useEffect(() => {
    if (!ready) return;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      [
        { cur: currentLeft.current, tgt: targetLeft.current },
        { cur: currentRight.current, tgt: targetRight.current },
      ].forEach(({ cur, tgt }) => {
        KEYS.forEach((k) => {
          const c = cur[k] || [0, 0];
          const t = tgt[k] || [0, 0];
          cur[k] = [lerp(c[0], t[0], 0.2), lerp(c[1], t[1], 0.2)];
        });
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [ready]);

  if (!ready) return <div>Waiting for data…</div>;

  // simple projection: X axis → horizontal, Z axis → vertical
  const project = (coords: [number, number]): [number, number] => {
    const [X, Z] = coords;
    const cx = X + 200;
    const cy = 400 - (Z + 200);
    return [cx, cy];
  };

  return (
    <svg width={400} height={400} style={{ background: "#f0f0f0" }}>
      {["left", "right"].map((hand, idx) => {
        const frame = hand === "left" ? currentLeft.current : currentRight.current;
        const color = hand === "left" ? "#0070f3" : "#fa5500";
        return (
          <g key={hand} stroke={color} fill={color}>
            {BONES.map(([a, b], i) => {
              const pa = frame[a];
              const pb = frame[b];
              if (!pa || !pb) return null;
              const [x1, y1] = project(pa);
              const [x2, y2] = project(pb);
              return (
                <line
                  key={`${hand}-bone-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth={2}
                />
              );
            })}
            {KEYS.map((j) => {
              const p = frame[j];
              if (!p) return null;
              const [cx, cy] = project(p);
              return <circle key={`${hand}-joint-${j}`} cx={cx} cy={cy} r={5} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}
