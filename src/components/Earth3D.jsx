import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Earth3D({ era, transitioning }) {
  const earthRef = useRef();
  
  // Era colors and visual properties
  const eraVisuals = {
    hadean: {
      color: '#ff3300',
      emissive: '#ff6600',
      distort: 0.4,
      speed: 2,
      metalness: 0.8
    },
    archean: {
      color: '#ff6600',
      emissive: '#ff8800',
      distort: 0.3,
      speed: 1.5,
      metalness: 0.6
    },
    proterozoic: {
      color: '#0088ff',
      emissive: '#0044aa',
      distort: 0.2,
      speed: 1,
      metalness: 0.4
    },
    cambrian: {
      color: '#00aaff',
      emissive: '#0066cc',
      distort: 0.15,
      speed: 0.8,
      metalness: 0.3
    },
    carboniferous: {
      color: '#00ff88',
      emissive: '#00cc66',
      distort: 0.1,
      speed: 0.5,
      metalness: 0.2
    },
    mesozoic: {
      color: '#00ffff',
      emissive: '#00cccc',
      distort: 0.1,
      speed: 0.5,
      metalness: 0.2
    },
    cenozoic: {
      color: '#00ff00',
      emissive: '#00aa00',
      distort: 0.05,
      speed: 0.3,
      metalness: 0.1
    }
  };

  const visual = eraVisuals[era] || eraVisuals.hadean;

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
      // Pulse effect during transition
      if (transitioning) {
        earthRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      }
    }
  });

  return (
    <group ref={earthRef}>
      <Sphere args={[2, 64, 64]} castShadow receiveShadow>
        <MeshDistortMaterial
          color={visual.color}
          emissive={visual.emissive}
          emissiveIntensity={0.5}
          metalness={visual.metalness}
          roughness={0.2}
          distort={visual.distort}
          speed={visual.speed}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color={visual.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}
