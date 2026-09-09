/* eslint-disable react-hooks/immutability --
   Imperative per-frame buffer updates are the intended three.js/R3F API;
   the React Compiler lint rules cannot model a WebGL animation loop. */
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count: number;
  dark: boolean;
}

function randomInShell(min: number, max: number): [number, number, number] {
  const r = min + Math.random() * (max - min);
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

function randomInCore(): [number, number, number] {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.pow(Math.random(), 1 / 3) * 3.7;
  return [
    r * Math.sin(phi) * Math.cos(theta) * 1.15,
    r * Math.sin(phi) * Math.sin(theta) * 0.8,
    r * Math.cos(phi) * 0.85,
  ];
}

/**
 * Particles begin loosely distributed in a wide shell, then gradually
 * organise into a compact cluster around the control network — a quiet
 * visual metaphor for data → validation → control → structured output.
 */
export function Particles({ count, dark }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const settled = useRef(false);
  const initialized = useRef(false);

  // Empty buffers allocated in render; randomised on the first frame so the
  // impure randomness never runs during a React render pass.
  const { positions, targets, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    return { positions, targets, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    if (!initialized.current) {
      for (let i = 0; i < count; i++) {
        const [sx, sy, sz] = randomInShell(6.5, 12.5);
        const [tx, ty, tz] = randomInCore();
        positions.set([sx, sy, sz], i * 3);
        targets.set([tx, ty, tz], i * 3);
        speeds[i] = 0.14 + Math.random() * 0.5;
      }
      initialized.current = true;
    }

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    let allSettled = true;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const dx = targets[i3] - pos[i3];
      const dy = targets[i3 + 1] - pos[i3 + 1];
      const dz = targets[i3 + 2] - pos[i3 + 2];
      const dist = dx * dx + dy * dy + dz * dz;

      if (dist > 0.0004) {
        allSettled = false;
        const f = Math.min(delta * speeds[i], 1);
        pos[i3] += dx * f;
        pos[i3 + 1] += dy * f;
        pos[i3 + 2] += dz * f;
      } else if (settled.current) {
        // Gentle residual drift once organised.
        pos[i3] += Math.sin(t * 0.35 + i * 1.7) * 0.004;
        pos[i3 + 1] += Math.cos(t * 0.3 + i * 2.3) * 0.004;
        pos[i3 + 2] += Math.sin(t * 0.4 + i * 0.9) * 0.004;
      }
    }
    settled.current = allSettled;
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={dark ? "#3fcaa0" : "#065f46"}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}