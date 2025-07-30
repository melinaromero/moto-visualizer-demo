// src/components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import MotoModel from './MotoModel';
import * as THREE from 'three'; //importar THREE para Math.PI

function Scene() {
  return (
    <Canvas
      shadows
      // Puedes ajustar esta cámara para que vea la moto cómodamente.
      // Si la moto es escala 1, [5,5,5] suele ser un buen punto de partida.
      camera={{ position: [5, 5, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <MotoModel />
        <ambientLight intensity={1.5} />
        {/* Asegúrate de que haya una luz direccional para que las sombras se vean bien */}
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

        <ContactShadows
          //frames={1}
          //position={[0, 0, 0]}
          //scale={5} // Ajusta el tamaño de la sombra para que cubra bien la moto
          //far={1.5}
          //blur={1}
          //opacity={0.75}
          //flat
        />
        <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} /> 
          <meshStandardMaterial color="gray" /> 
        </mesh>

        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={1} // Ajusta según tu preferencia para el zoom mínimo
          maxDistance={20} // Ajusta según tu preferencia para el zoom máximo
          target={[0, 0, 0]} // El target es el origen (Y=0), donde está la base de la moto
          // --- CAMBIOS PARA EL RESET Y SUAVIZADO ---
          enableDamping // Habilita el "damping" para un movimiento más suave
          dampingFactor={0.05} // Ajusta la suavidad del movimiento (valores más bajos = más suave)
          // Añadir un target si se quiere que la cámara siempre apunte a un punto específico
          // target={[0, 0, 0]} // Por ejemplo, el centro de la escena
          // Para un "reset" real de la cámara a una posición inicial,
          // necesitaríamos un botón en la UI y usar un 'ref' en OrbitControls.
          // Por ahora, 'enableDamping' mejora la sensación. El reset se hará con un ref en la UI.
    
        />

    
      </Suspense>
    </Canvas>
  );
}

export default Scene;