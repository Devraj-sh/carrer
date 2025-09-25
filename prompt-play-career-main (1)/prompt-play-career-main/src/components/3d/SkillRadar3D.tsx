import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line, Sphere } from "@react-three/drei";
import { Vector3 } from "three";
import * as THREE from "three";

interface SkillData {
  skill: string;
  value: number;
  color: string;
}

interface SkillRadar3DProps {
  skills: SkillData[];
  className?: string;
}

const RadarMesh = ({ skills }: { skills: SkillData[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  // Calculate positions for radar chart
  const skillPositions = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return [Math.cos(angle), 0, Math.sin(angle)];
  });

  // Create radar grid lines
  const gridLines = [0.2, 0.4, 0.6, 0.8, 1.0].map(radius => {
    const points = [];
    for (let i = 0; i <= skills.length; i++) {
      const angle = (i / skills.length) * Math.PI * 2;
      points.push(new Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    return points;
  });

  return (
    <group ref={groupRef}>
      {/* Radar grid */}
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00ffff"
          opacity={0.3}
          transparent
          lineWidth={1}
        />
      ))}

      {/* Axis lines */}
      {skillPositions.map((pos, index) => (
        <Line
          key={`axis-${index}`}
          points={[new Vector3(0, 0, 0), new Vector3(pos[0], pos[1], pos[2])]}
          color="#00ffff"
          opacity={0.5}
          transparent
          lineWidth={2}
        />
      ))}

      {/* Skill points and labels */}
      {skills.map((skill, index) => {
        const pos = skillPositions[index];
        const skillValue = skill.value / 100; // Normalize to 0-1
        const x = pos[0] * skillValue;
        const y = pos[1];
        const z = pos[2] * skillValue;
        
        return (
          <group key={skill.skill}>
            {/* Skill point */}
            <Sphere
              position={[x, y, z]}
              args={[0.05, 16, 16]}
            >
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.3}
              />
            </Sphere>
            
            {/* Skill label */}
            <Text
              position={[pos[0] * 1.2, 0.2, pos[2] * 1.2]}
              fontSize={0.1}
              color="#00ffff"
              anchorX="center"
              anchorY="middle"
            >
              {skill.skill}
            </Text>
            
            {/* Value label */}
            <Text
              position={[pos[0] * 1.2, -0.1, pos[2] * 1.2]}
              fontSize={0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {skill.value}%
            </Text>
          </group>
        );
      })}

      {/* Skill area polygon */}
      <Line
        points={[
          ...skills.map((skill, index) => {
            const pos = skillPositions[index];
            const skillValue = skill.value / 100;
            return new Vector3(pos[0] * skillValue, pos[1], pos[2] * skillValue);
          }),
          // Close the polygon
          (() => {
            const firstPos = skillPositions[0];
            const firstValue = skills[0].value / 100;
            return new Vector3(firstPos[0] * firstValue, firstPos[1], firstPos[2] * firstValue);
          })()
        ]}
        color="#ff00ff"
        opacity={0.7}
        transparent
        lineWidth={3}
      />
    </group>
  );
};

export const SkillRadar3D = ({ skills, className }: SkillRadar3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 2, 3], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RadarMesh skills={skills} />
      </Canvas>
    </div>
  );
};