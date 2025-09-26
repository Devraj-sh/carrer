import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Skill } from '@/hooks/useSkillMapping';

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  connections: string[];
}

function SkillNode({ skill, position, connections }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  const getColorByCategory = (category: string) => {
    const colors = {
      cognitive: '#8B5CF6',
      analytical: '#06B6D4', 
      creative: '#F59E0B',
      social: '#10B981',
      technical: '#EF4444'
    };
    return colors[category as keyof typeof colors] || '#6366F1';
  };

  const nodeSize = Math.max(0.3, skill.level * 0.1);
  const glowIntensity = skill.xp / 1000;

  return (
    <group position={position}>
      {/* Main skill sphere */}
      <Sphere ref={meshRef} args={[nodeSize, 16, 16]}>
        <meshStandardMaterial
          color={getColorByCategory(skill.category)}
          emissive={getColorByCategory(skill.category)}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[nodeSize * 1.5, 16, 16]}>
        <meshBasicMaterial
          color={getColorByCategory(skill.category)}
          transparent
          opacity={glowIntensity * 0.3}
        />
      </Sphere>

      {/* Skill label */}
      <Text
        position={[0, nodeSize + 0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
      
      {/* Level indicator */}
      <Text
        position={[0, -nodeSize - 0.2, 0]}
        fontSize={0.1}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        Level {skill.level}
      </Text>
    </group>
  );
}

function ConnectionLines({ skills }: { skills: Skill[] }) {
  const { scene } = useThree();
  
  useEffect(() => {
    const connections = [
      // Cognitive cluster
      ['critical-thinking', 'media-literacy'],
      ['critical-thinking', 'research'],
      ['research', 'critical-reasoning'],
      
      // Analytical cluster
      ['logic', 'problem-solving'],
      ['analytical-thinking', 'logic'],
      ['analytical-thinking', 'intro-to-ml'],
      
      // Creative cluster
      ['creativity', 'communication'],
      ['creativity', 'prompt-engineering'],
      
      // Technical cluster
      ['applied-ai', 'intro-to-ml'],
      ['prompt-engineering', 'applied-ai'],
      ['multi-tool-adaptability', 'applied-ai'],
      
      // Cross-connections
      ['problem-solving', 'applied-ai'],
      ['communication', 'knowledge-depth'],
      ['evaluation', 'critical-reasoning']
    ];

    connections.forEach(([skill1Id, skill2Id]) => {
      const skill1 = skills.find(s => s.id === skill1Id);
      const skill2 = skills.find(s => s.id === skill2Id);
      
      if (skill1 && skill2) {
        const pos1 = getSkillPosition(skill1Id, skills);
        const pos2 = getSkillPosition(skill2Id, skills);
        
        if (pos1 && pos2) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...pos1),
            new THREE.Vector3(...pos2)
          ]);
          
          const material = new THREE.LineBasicMaterial({ 
            color: '#444',
            transparent: true,
            opacity: 0.3
          });
          
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      }
    });

    return () => {
      // Cleanup lines
      scene.children = scene.children.filter(child => !(child instanceof THREE.Line));
    };
  }, [skills, scene]);

  return null;
}

function getSkillPosition(skillId: string, skills: Skill[]): [number, number, number] | null {
  const positions: Record<string, [number, number, number]> = {
    // Cognitive cluster (top)
    'critical-thinking': [0, 2, 0],
    'media-literacy': [-1.5, 1.5, -0.5],
    'research': [1.5, 1.5, -0.5],
    'critical-reasoning': [0, 1, -1],
    'knowledge-depth': [-1, 1, 1],
    
    // Analytical cluster (left)
    'logic': [-2, 0, 0],
    'problem-solving': [-2.5, -0.5, 0.5],
    'analytical-thinking': [-2, -1, 0],
    'evaluation': [-1.5, -0.5, -0.5],
    
    // Creative cluster (right)
    'creativity': [2, 0, 0],
    'communication': [2.5, -0.5, 0.5],
    'prompt-engineering': [2, -1, 0],
    
    // Technical cluster (bottom)
    'intro-to-ml': [0, -2, 0],
    'applied-ai': [1, -2.5, 0],
    'multi-tool-adaptability': [-1, -2.5, 0],
    
    // Social cluster (back)
    'ethical-decision-making': [0, 0, -2]
  };

  return positions[skillId] || null;
}

export function SkillTree({ skills }: { skills: Skill[] }) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {/* Skill nodes */}
        {skills.map((skill) => {
          const position = getSkillPosition(skill.id, skills);
          if (!position) return null;
          
          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              position={position}
              connections={[]}
            />
          );
        })}
        
        {/* Connection lines */}
        <ConnectionLines skills={skills} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}