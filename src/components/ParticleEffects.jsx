import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function LavaParticles({ count = 1000 }) {
  const points = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random positions around Earth
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2.1 + Math.random() * 0.5;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.05;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;
      const velocities = particles.velocities;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Reset if too far
        const dist = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        );
        
        if (dist > 4) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          const radius = 2.1;
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff6600"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function WaterEffect({ enabled }) {
  if (!enabled) return null;
  
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial
        color="#0088ff"
        transparent
        opacity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

export function ThunderEffect({ flash }) {
  if (!flash) return null;
  
  return (
    <pointLight
      position={[5, 5, 5]}
      intensity={10}
      color="#ffffff"
      distance={20}
    />
  );
}
