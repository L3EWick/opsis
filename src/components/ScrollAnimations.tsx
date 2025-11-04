import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

function ScrollReactivePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (meshRef.current) {
      const offset = scroll.offset;
      meshRef.current.position.y = -offset * 10;
      meshRef.current.rotation.x = offset * Math.PI * 0.5;
      meshRef.current.material.opacity = 0.1 + offset * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticlesOnScroll() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const particles = Array.from({ length: 50 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
  }));

  useFrame(() => {
    if (groupRef.current) {
      const offset = scroll.offset;
      groupRef.current.rotation.y = offset * Math.PI * 2;
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y += Math.sin(offset * 10 + i) * 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ScrollReactiveRings() {
  const ringsRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (ringsRef.current) {
      const offset = scroll.offset;
      ringsRef.current.children.forEach((ring, i) => {
        if (ring instanceof THREE.Mesh) {
          const progress = (offset * ringsRef.current.children.length + i) % 1;
          ring.scale.setScalar(0.5 + progress * 2);
          ring.material.opacity = 0.15 * (1 - progress);
          ring.rotation.z += 0.01;
        }
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, i * 3 - 6, -8]}>
          <torusGeometry args={[2 + i * 0.5, 0.1, 16, 32]} />
          <meshStandardMaterial
            color="#000000"
            wireframe
            transparent
            opacity={0.15}
            emissive="#000000"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function ScrollLines() {
  const linesRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (linesRef.current) {
      const offset = scroll.offset;
      linesRef.current.children.forEach((line, i) => {
        if (line instanceof THREE.Line) {
          const progress = (offset * 3 + i * 0.3) % 1;
          const positions = line.geometry.attributes.position;
          for (let j = 0; j < positions.count; j++) {
            positions.setY(j, Math.sin(progress * Math.PI * 2 + j * 0.1) * 2);
          }
          positions.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {Array.from({ length: 10 }, (_, i) => {
        const points = [];
        for (let j = 0; j < 20; j++) {
          points.push(new THREE.Vector3((j - 10) * 0.5, 0, (i - 5) * 0.5));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#000000" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
}

function ScrollOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (meshRef.current) {
      const offset = scroll.offset;
      meshRef.current.position.y = Math.sin(offset * Math.PI * 4) * 3;
      meshRef.current.position.x = Math.cos(offset * Math.PI * 4) * 3;
      meshRef.current.scale.setScalar(0.5 + offset * 1.5);
      meshRef.current.material.opacity = 0.3 + offset * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -6]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#000000"
        wireframe
        transparent
        opacity={0.3}
        emissive="#000000"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function ScrollAnimations() {
  return (
    <>
      <ScrollReactivePlane />
      <FloatingParticlesOnScroll />
      <ScrollReactiveRings />
      <ScrollLines />
      <ScrollOrb />
    </>
  );
}
