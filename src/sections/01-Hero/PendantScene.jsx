import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Center, useGLTF } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ── MODEL LOADER ────────────────────────────────────────────────────────
// When you download your GLB, place it in public/models/pendant.glb
// and uncomment the useGLTF line and the <primitive> line.
function UniversalModel() {
  // const { scene } = useGLTF('/models/pendant.glb'); 
  
  return (
    <mesh>
      {/* 
        This box is a placeholder. 
        Once you have a real model, delete these two lines (boxGeometry and meshStandardMaterial)
        and uncomment the <primitive object={scene} /> line below.
      */}
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
      
      {/* <primitive object={scene} /> */}
    </mesh>
  );
}

// ── ANIMATED STAGE ──────────────────────────────────────────────────────
// This component reads the GSAP values from Hero.jsx every single frame
// and applies them directly to the 3D group.
function AnimatedStage({ scrollTransformRef }) {
  const groupRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion || !scrollTransformRef?.current) return;

    const { x, y, z, rotX, rotY, rotZ, scale } = scrollTransformRef.current;
    
    // Apply GSAP coordinates to the 3D group
    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.set(rotX, rotY, rotZ);
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      {/* Center automatically calculates the bounding box of ANY model and centers it */}
      <Center top>
        <UniversalModel />
      </Center>
    </group>
  );
}

// ── CANVAS WRAPPER ──────────────────────────────────────────────────────
export default function PendantScene({ scrollTransformRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Basic Studio Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <directionalLight position={[-3, -5, -4]} intensity={0.5} color="#9DB4C7" />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <AnimatedStage scrollTransformRef={scrollTransformRef} />
      </Suspense>
    </Canvas>
  );
}