// src/pages/MotoConfigurator.jsx
import React, { Suspense, useRef } from 'react';
import Scene from '../components/Scene';
import UIControls from '../components/UIControls';
import '../index.css';

export default function MotoConfigurator() {
  const orbitControlsRef = useRef();

  const handleResetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };
   // nueva funcion: Lógica para mover la cámara
    const handleMoveCamera = (position, target) => {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.object.position.set(...position); // Mueve la cámara
        orbitControlsRef.current.target.set(...target); // Establece el punto de enfoque
        orbitControlsRef.current.update(); // Actualiza los controles
      }
    };

  return (
    <div className="w-full h-screen relative">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-2xl">
          Cargando escena 3D...
        </div>
      }>
        <Scene orbitControlsRef={orbitControlsRef} />
      </Suspense>
      <UIControls onResetCamera={handleResetCamera} onMoveCamera={handleMoveCamera} />
        </div>
  );
}
