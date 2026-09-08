"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useIsMobile } from "@/lib/hooks";
import { ControlNetwork } from "./ControlNetwork";
import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";

export default function SceneCanvas() {
  const isMobile = useIsMobile(768);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(false);

  // Pause rendering when the hero is scrolled out of view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Gentle fade-in after first paint (never blocks content).
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 11], fov: 42 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <color attach="background" args={["#0e0e12"]} />
        <fog attach="fog" args={["#0e0e12", 13, 24]} />
        <Suspense fallback={null}>
          <SceneLighting />
          <ControlNetwork quality={isMobile ? "mobile" : "desktop"} />
          <CameraRig enabled={!isMobile} />
          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={0.32}
                luminanceThreshold={0.82}
                luminanceSmoothing={0.25}
                mipmapBlur
                radius={0.55}
              />
              <Vignette eskil={false} offset={0.28} darkness={0.42} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}