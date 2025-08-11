// src/components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MotoModel from './MotoModel';
import * as THREE from 'three';

function Scene({ orbitControlsRef }) {
  return (
    <Canvas
      shadows
      camera={{ position: [15, 15, 15], fov: 45 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <MotoModel />

        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <Environment files="/parking_garage_1k.hdr" background blur={0.5} />

        <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          {/* Color del suelo más oscuro para que coincida con el fondo */}
          <meshStandardMaterial color="#303030" />
        </mesh>

        <OrbitControls
          ref={orbitControlsRef}
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={1}
          maxDistance={500}
        />
        
      </Suspense>
    
    </Canvas>
  );
}

export default Scene;