// src/components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// Importa ContactShadows de Drei
import { OrbitControls, Environment} from '@react-three/drei';
import MotoModel from './MotoModel';
import * as THREE from 'three'; //importar THREE para Math.PI

function Scene({ orbitControlsRef }) { // <-- Recibe la prop aquí
  return (
    <Canvas
      shadows
      // Puedes ajustar esta cámara para que vea la moto cómodamente.
      // Si la moto es escala 1, [5,5,5] suele ser un buen punto de partida.
      camera={{ position: [5, 5, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      <OrbitControls
          ref={orbitControlsRef}
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={1}
          maxDistance={500}
        />
      <Suspense fallback={null}>
        <MotoModel />
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[10, 10, 10]} //ajustar esta posición para cambiar la dirección de la sombra
          intensity={1}
          castShadow // MUY IMPORTANTE: Esta luz proyectará sombras
          shadow-mapSize-width={1024} // Aumenta la resolución de la sombra
          shadow-mapSize-height={1024} // Aumenta la resolución de la sombra
          shadow-camera-far={50} // Distancia máxima de la sombra
          shadow-camera-left={-10} // Bounding box de la cámara de sombra
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <mesh rotation-x={-Math.PI / 2} position={[0, -0.001, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} /> 
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      
      </Suspense>
    </Canvas>
  );
}

export default Scene;