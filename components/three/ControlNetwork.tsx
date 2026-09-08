"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildNetworkNodes,
  getParticleCount,
  LABEL_HEIGHT,
} from "@/lib/three/sceneConfig";
import { makeHaloSprite, makeLabelSprite } from "@/lib/three/textSprite";
import { Particles } from "./Particles";

type Quality = "desktop" | "mobile";

function Node({
  label,
  position,
  kind,
}: {
  label: string;
  position: [number, number, number];
  kind: "center" | "satellite";
}) {
  const sprite = useMemo(
    () =>
      makeLabelSprite({
        text: label,
        height: kind === "center" ? LABEL_HEIGHT.center : LABEL_HEIGHT.satellite,
        fontSize: kind === "center" ? 50 : 42,
        color: kind === "center" ? "#ffffff" : "#e9e8f2",
        background: kind === "center" ? "#8b5cf6" : null,
      }),
    [label, kind]
  );

  const halo = useMemo(
    () => (kind === "center" ? makeHaloSprite(3.6, "139,92,246") : null),
    [kind]
  );

  return (
    <group position={position}>
      {halo ? <primitive object={halo} /> : null}
      <mesh>
        <icosahedronGeometry
          args={[kind === "center" ? 0.34 : 0.145, 1]}
        />
        <meshStandardMaterial
          color={kind === "center" ? "#8b5cf6" : "#45455a"}
          emissive="#8b5cf6"
          emissiveIntensity={kind === "center" ? 0.85 : 0.4}
          roughness={0.32}
          metalness={0.15}
        />
      </mesh>
      <primitive
        object={sprite}
        position={[0, kind === "center" ? 0.92 : 0.52, 0]}
      />
    </group>
  );
}

export function ControlNetwork({ quality }: { quality: Quality }) {
  const mobile = quality === "mobile";
  const group = useRef<THREE.Group>(null);
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null);

  const nodes = useMemo(() => buildNetworkNodes(mobile), [mobile]);
  const particleCount = useMemo(() => getParticleCount(mobile), [mobile]);

  const linePositions = useMemo(() => {
    const satellites = nodes.filter((n) => n.kind === "satellite");
    const arr = new Float32Array(satellites.length * 6);
    satellites.forEach((node, i) => {
      const [x, y, z] = node.position;
      arr.set([0, 0, 0, x, y, z], i * 6);
    });
    return arr;
  }, [nodes]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * (mobile ? 0.045 : 0.06);
    }
    if (lineMaterial.current) {
      lineMaterial.current.opacity =
        0.3 + Math.sin(state.clock.elapsedTime * 1.1) * 0.07;
    }
  });

  return (
    <group ref={group} position={[0.4, 0, 0]}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterial}
          color="#8b5cf6"
          transparent
          opacity={0.32}
        />
      </line>
      {nodes.map((node) => (
        <Node
          key={node.label}
          label={node.label}
          position={node.position}
          kind={node.kind}
        />
      ))}
      <Particles count={particleCount} />
    </group>
  );
}