"use client";

interface SceneLightingProps {
  dark: boolean;
}

/** Theme-aware lighting — ambient base + one key light + one accent fill. */
export function SceneLighting({ dark }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={dark ? 0.55 : 0.85} />
      <directionalLight position={[5, 8, 6]} intensity={dark ? 1.1 : 1.5} color="#ffffff" />
      <directionalLight
        position={[-6, -4, -5]}
        intensity={0.35}
        color={dark ? "#1a2a4a" : "#e6f2ec"}
      />
      <pointLight
        position={[0, 0, 3.5]}
        intensity={1.1}
        color={dark ? "#2fbd8f" : "#065f46"}
        distance={14}
      />
    </>
  );
}
