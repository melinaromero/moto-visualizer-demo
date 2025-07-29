// src/components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// Importa ContactShadows de Drei
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import MotoModel from './MotoModel';

function Scene() {
  return (
    <Canvas
      shadows // Sigue habilitado
      camera={{ position: [15, 15, 15], fov: 45 }} 
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <MotoModel />
        <ambientLight intensity={1.5} />
        <ContactShadows
          frames={1}        // Número de frames para calcular la sombra (1 es estática)
          position={[0, -80, 0]} // Posición de la sombra (justo debajo de la moto)
          scale={10}         // Escala del plano de la sombra
          far={1.5}          // Distancia de la cámara para la sombra
          blur={1}           // Desenfoque de la sombra
          opacity={0.75}     // Opacidad de la sombra
          flat              // Hace que la sombra sea plana, sin perspectiva
        />

        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={1}
          maxDistance={500}
        />

      <Environment files="/back.hdr" background />
      </Suspense>
    </Canvas>
  );
}

export default Scene;