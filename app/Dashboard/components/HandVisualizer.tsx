// HandVisualizer.tsx
"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const KEYS = [
  "wrist",
  "thumb_joint",
  "thumb_middle",
  "thumb_tip",
  "index_joint",
  "index_middle",
  "index_tip",
  "ring_joint",
  "ring_middle",
  "ring_tip",
  "pinky_joint",
  "pinky_middle",
  "pinky_tip",
] as const;
type JointKey = (typeof KEYS)[number];

const BONES: [JointKey, JointKey][] = [
  ["wrist", "thumb_joint"],
  ["thumb_joint", "thumb_middle"],
  ["thumb_middle", "thumb_tip"],
  ["wrist", "index_joint"],
  ["index_joint", "index_middle"],
  ["index_middle", "index_tip"],
  ["wrist", "ring_joint"],
  ["ring_joint", "ring_middle"],
  ["ring_middle", "ring_tip"],
  ["wrist", "pinky_joint"],
  ["pinky_joint", "pinky_middle"],
  ["pinky_middle", "pinky_tip"],
];

export default function HandVisualizer() {
  const [frame, setFrame] =
    useState<Record<JointKey, [string, string, string]>>();

  useEffect(() => {
    const framesQ = query(collection(db, "first"), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(framesQ, (snap: QuerySnapshot<DocumentData>) => {
      if (snap.empty) return;
      const data = snap.docs[snap.docs.length - 1].data();
      setFrame(data as any);
    });
    return () => unsub();
  }, []);

  const project = (v: [string, string, string]): [number, number] => {
    const X = parseFloat(v[0]),
      Z = parseFloat(v[2]);
    const SCALE = 400 / 400; // 400px / ±200mm
    const cx = (X + 200) * SCALE;
    const cy = 400 - (Z + 200) * SCALE;
    return [cx, cy];
  };

  if (!frame) return <div>Waiting for data…</div>;

  return (
    <svg
      width={400}
      height={400}
      style={{ background: "#f0f0f0", borderRadius: 8 }}
    >
      {BONES.map(([a, b], i) => {
        const pa = frame[a],
          pb = frame[b];
        if (!pa || !pb) return null;
        const [x1, y1] = project(pa),
          [x2, y2] = project(pb);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#333"
            strokeWidth={2}
          />
        );
      })}
      {KEYS.map((j) => {
        const p = frame[j];
        if (!p) return null;
        const [cx, cy] = project(p);
        return <circle key={j} cx={cx} cy={cy} r={5} fill="#0070f3" />;
      })}
    </svg>
  );
}
