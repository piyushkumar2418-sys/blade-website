"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow, elegant rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        {/* A sharp, geometric octahedron (The Blade) */}
        <octahedronGeometry args={[2, 0]} />
        <MeshWobbleMaterial 
          color="#F3D7A7" 
          speed={1} 
          factor={0.2} 
          wireframe 
          opacity={0.2}
          transparent
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F3D7A7" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <FloatingShape />
      </Canvas>
    </div>
  );
}