"use client";

import { useEffect, useRef, useState } from "react";

type State = {
  scale: number;
  x: number;
  y: number;
};

export function Canvas() {
  const [state, setState] = useState<State>({
    scale: 0.8,
    x: 0,
    y: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        background: "#202020",
      }}
    >
      <div
        ref={ref}
        style={{
          touchAction: "auto",
          transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
        }}
      >
        {/* <Screen width={1920} height={1080} /> */}
      </div>
    </div>
  );
}
