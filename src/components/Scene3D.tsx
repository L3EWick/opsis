import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000; // Reduzido para menos poluição

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 25 + Math.random() * 15;
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
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.1;
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
        color="#000000"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LightOrb() {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      lightRef.current.position.x = Math.sin(t * 0.4) * 10;
      lightRef.current.position.y = Math.cos(t * 0.25) * 7;
      lightRef.current.position.z = Math.sin(t * 0.6) * 6;
      lightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.5;
    }
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.x = Math.sin(t * 0.4) * 10;
      meshRef.current.position.y = Math.cos(t * 0.25) * 7;
      meshRef.current.position.z = Math.sin(t * 0.6) * 6;
      const scale = 0.4 + Math.sin(t * 1.8) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={2} color="#ffffff" />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1
        }}
        style={{
          background: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.0} />
        <pointLight position={[0, 10, -5]} intensity={0.8} />
        <LightOrb />
        <AnimatedParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
