import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.15;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.2}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <torusGeometry args={[3, 0.8, 16, 100]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        opacity={0.15}
        transparent
        emissive="#ffffff"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[-5, 2, -6]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        opacity={0.2}
        transparent
        emissive="#ffffff"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function SpinningSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[6, -2, -7]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        opacity={0.25}
        transparent
        emissive="#ffffff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function LightOrb() {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      lightRef.current.position.x = Math.sin(t * 0.5) * 8;
      lightRef.current.position.y = Math.cos(t * 0.3) * 6;
      lightRef.current.position.z = Math.sin(t * 0.7) * 5;
    }
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.x = Math.sin(t * 0.5) * 8;
      meshRef.current.position.y = Math.cos(t * 0.3) * 6;
      meshRef.current.position.z = Math.sin(t * 0.7) * 5;
      meshRef.current.scale.setScalar(0.5 + Math.sin(t * 2) * 0.3);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={2} color="#ffffff" />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <LightOrb />
        <AnimatedParticles />
        <FloatingTorus />
        <RotatingBox />
        <SpinningSphere />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
