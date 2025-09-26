"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface Avatar3DProps {
  type: 'ai' | 'human';
  isActive?: boolean;
  className?: string;
}

function Avatar3DModel({ type, isActive }: { type: 'ai' | 'human'; isActive?: boolean }) {
  const meshRef = useRef<any>();
  
  const colors = type === 'ai' 
    ? { primary: '#218D8D', secondary: '#2EA5B8', glow: '#2B91A1' }
    : { primary: '#C1845A', secondary: '#D4A574', glow: '#C89868' };

  return (
    <group ref={meshRef} rotation={[0, 0, 0]}>
      {/* Avatar Head */}
      <Sphere args={[0.6, 32, 32]} position={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color={colors.primary} 
          metalness={type === 'ai' ? 0.8 : 0.2}
          roughness={type === 'ai' ? 0.2 : 0.8}
        />
      </Sphere>
      
      {/* Avatar Body */}
      <Box args={[0.8, 1.2, 0.4]} position={[0, -0.5, 0]}>
        <meshStandardMaterial 
          color={colors.secondary}
          metalness={type === 'ai' ? 0.6 : 0.1}
          roughness={type === 'ai' ? 0.4 : 0.9}
        />
      </Box>
      
      {/* Energy Ring */}
      {isActive && (
        <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial 
            color={colors.glow} 
            transparent 
            opacity={0.3}
            wireframe
          />
        </Sphere>
      )}
    </group>
  );
}

export function Avatar3D({ type, isActive, className }: Avatar3DProps) {
  return (
    <motion.div 
      className={`w-32 h-32 ${className}`}
      animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Avatar3DModel type={type} isActive={isActive} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}