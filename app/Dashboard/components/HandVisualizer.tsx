// HandVisualizer.tsx
"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
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
    const framesRef = collection(db, "first");
    const q = query(framesRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          console.log("no frames yet");
          return;
        }
        const docs = snap.docs;
        const latestDoc = docs[docs.length - 1]; // Get the newest frame (last one)
        console.log("new frame:", latestDoc.id);
        setFrame(latestDoc.data() as any);
      },
      (err) => {
        console.error("snapshot error:", err);
      }
    );
    return () => unsub();
  }, []);

  // project X (horizontal) and Z (vertical) into SVG coords
  const project = (v: [string, string, string]): [number, number] => {
    const X = parseFloat(v[0]);
    const Z = parseFloat(v[2]);
    // assuming leap coordinate X ∈ [-200,200], Z ∈ [-200,200]
    const SCALE = 400 / 400; // 1px per mm
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
        const [x1, y1] = project(pa);
        const [x2, y2] = project(pb);
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
