import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';

export default function Creature3D({ type, position }) {
  const creatureRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Creature visual data
  const creatures = {
    protocell: { emoji: '🦠', color: '#00ff00', size: 0.3 },
    cyanobacteria: { emoji: '🌿', color: '#00ff88', size: 0.4 },
    trilobite: { emoji: '🦐', color: '#8b4513', size: 0.5 },
    anomalocaris: { emoji: '🦞', color: '#ff6600', size: 0.8 },
    meganeura: { emoji: '🦋', color: '#00ffff', size: 1.2 },
    arthropleura: { emoji: '🐛', color: '#654321', size: 1.5 },
    trex: { emoji: '🦖', color: '#ff0000', size: 2.0 },
    pteranodon: { emoji: '🦅', color: '#ffaa00', size: 1.5 },
    mammoth: { emoji: '🦣', color: '#8b7355', size: 1.8 },
    sabertooth: { emoji: '🐯', color: '#ff8800', size: 1.2 }
  };
  
  const creature = creatures[type] || creatures.protocell;
  
  useFrame((state) => {
    if (creatureRef.current) {
      // Floating animation
      creatureRef.current.position.y = 
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Rotation
      creatureRef.current.rotation.y += 0.01;
      
      // Scale pulse when hovered
      const scale = hovered ? creature.size * 1.2 : creature.size;
      creatureRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
    }
  });

  return (
    <group
      ref={creatureRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Simple sphere for now - would be GLTF model in production */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={creature.color}
          emissive={creature.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Creature label */}
      {hovered && (
        <Center position={[0, 1, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.05}
          >
            {type}
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
      )}
    </group>
  );
}

// Flying creature behavior
export function FlyingCreature({ type, bounds = 5 }) {
  const ref = useRef();
  const velocity = useRef([
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.02
  ]);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += velocity.current[0];
      ref.current.position.y += velocity.current[1];
      ref.current.position.z += velocity.current[2];
      
      // Bounce off boundaries
      ['x', 'y', 'z'].forEach((axis, i) => {
        if (Math.abs(ref.current.position[axis]) > bounds) {
          velocity.current[i] *= -1;
        }
      });
      
      // Face direction of movement
      ref.current.lookAt(
        ref.current.position.x + velocity.current[0],
        ref.current.position.y + velocity.current[1],
        ref.current.position.z + velocity.current[2]
      );
    }
  });
  
  return <Creature3D ref={ref} type={type} position={[0, 3, 0]} />;
}
