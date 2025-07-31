// src/App.jsx
import React, { Suspense, useRef } from 'react'; // Importa useRef
import Scene from './components/Scene';
import UIControls from './components/UIControls'; // Importa UIControls
import './index.css';

function App() {
  const orbitControlsRef = useRef(); // Ref para OrbitControls

   // Función para resetear la cámara (llamada desde UIControls)
  const handleResetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset(); // Método reset de OrbitControls
      console.log('Cámara reseteada.'); // Para depuración
    } else {
      console.log('OrbitControls ref no está disponible.'); // Para depuración
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* Aquí se le pasa el ref a la Scene. Más adelante, OrbitControls dentro de Scene.jsx
          necesitará acceder a este ref. */}

      {/* Este Suspense envuelve el Scene para mostrar el cargador HTML */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-2xl">
          Cargando escena 3D...
        </div>
      }>
      
      <Scene orbitControlsRef={orbitControlsRef} /> {/* Pasa la ref a Scene */}
      </Suspense>

      {/* Renderiza los controles de la UI */}
      <UIControls onResetCamera={handleResetCamera} />
    </div>
  );
}

export default App;