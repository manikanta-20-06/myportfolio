"use client";

import { useEffect, useState } from "react";
import { trackScroll } from "@/lib/scroll";

export default function Backdrop() {
  const [Scene, setScene] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const stop = trackScroll();
    let alive = true;
    import("@/components/three/Scene").then((mod) => {
      if (alive) setScene(() => mod.default);
    });
    return () => {
      alive = false;
      stop();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #101015 0%, #08080a 55%, #060607 100%)",
      }}
    >
      {Scene ? <Scene /> : null}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,10,0) 0%, rgba(8,8,10,0) 55%, rgba(8,8,10,0.72) 100%)",
        }}
      />
    </div>
  );
}
