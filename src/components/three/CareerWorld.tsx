"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text } from "@react-three/drei";
import { Suspense } from "react";

const paths = [
  { name: "Java", x: -5, color: "#FFCB6B" },
  { name: "JavaScript", x: -2.5, color: "#41E6FF" },
  { name: "Python", x: 0, color: "#4DFFB5" },
  { name: "AI / ML", x: 2.5, color: "#FF5C8A" },
  { name: "DevOps", x: 5, color: "#A78BFA" }
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} />
      <Stars radius={80} depth={40} count={1800} factor={4} saturation={0} fade speed={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0b1220" roughness={0.7} />
      </mesh>
      {paths.map((path) => (
        <group key={path.name} position={[path.x, -0.92, -4]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.35, 18]} />
            <meshStandardMaterial color={path.color} emissive={path.color} emissiveIntensity={0.45} />
          </mesh>
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.4}>
            <mesh position={[0, 1.1, -4]}>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial color={path.color} emissive={path.color} emissiveIntensity={0.75} />
            </mesh>
            <Text position={[0, 2.1, -4]} fontSize={0.35} color="white" anchorX="center">
              {path.name}
            </Text>
          </Float>
        </group>
      ))}
      <mesh position={[0, 0.15, 2.4]}>
        <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
        <meshStandardMaterial color="#f8fbff" emissive="#41E6FF" emissiveIntensity={0.25} />
      </mesh>
      <OrbitControls enablePan={false} minDistance={7} maxDistance={16} maxPolarAngle={Math.PI / 2.15} />
    </>
  );
}

export function CareerWorld() {
  return (
    <Canvas camera={{ position: [0, 6, 10], fov: 55 }} className="h-full w-full">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
