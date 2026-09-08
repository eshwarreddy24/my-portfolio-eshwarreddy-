"use client";

import { useFrame } from "@react-three/fiber";

/**
 * Small mouse-based parallax + a slow breathing drift on the z axis.
 * `enabled` is false on mobile and for reduced-motion users.
 */
export function CameraRig({ enabled }: { enabled: boolean }) {
  useFrame((state, delta) => {
    const k = Math.min(delta * 2.2, 1);
    const targetX = enabled ? state.pointer.x * 0.55 : 0;
    const targetY = enabled ? state.pointer.y * 0.35 : 0;

    // Mutating the three.js camera is the intended R3F API here.
    state.camera.position.x += (targetX - state.camera.position.x) * k;
    state.camera.position.y += (targetY - state.camera.position.y) * k;
    state.camera.position.z = 11 + Math.sin(state.clock.elapsedTime * 0.12) * 0.35;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}