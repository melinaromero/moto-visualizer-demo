// src/components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// Importa ContactShadows de Drei
import { OrbitControls, Environment} from '@react-three/drei';
import MotoModel from './MotoModel';

function Scene({ orbitControlsRef }) { // <-- Recibe la prop aquí
  return (
    <Canvas
      shadows // Sigue habilitado
      camera={{ position: [15, 15, 15], fov: 45 }} 
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