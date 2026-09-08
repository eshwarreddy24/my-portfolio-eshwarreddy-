"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { detectWebGL, usePrefersReducedMotion } from "@/lib/hooks";
import StaticFallback from "./StaticFallback";

// Three.js is heavy — keep it out of the main bundle entirely.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function HeroScene() {
  // Synchronous matchMedia read: reduced-motion users never mount the heavy
  // Three.js scene (and never pay for its bundle) on the first client pass.
  const reducedMotion = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Deferred past the synchronous effect body so the first paint is never
    // blocked and to keep the render pipeline cascade-free.
    const id = requestAnimationFrame(() => {
      setWebgl(detectWebGL());
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const show3d = mounted && webgl && !reducedMotion;

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {show3d ? <SceneCanvas /> : <StaticFallback />}
    </div>
  );
}