"use client";

/** Soft, even lighting — ambient base + one key light + one accent fill. */
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 8, 6]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-6, -4, -5]} intensity={0.35} color="#c7c7f0" />
      <pointLight position={[0, 0, 3.5]} intensity={1.1} color="#8b5cf6" distance={14} />
    </>
  );
}