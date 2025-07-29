// src/App.jsx
import React, { Suspense } from 'react'; // Necesitamos Suspense aquí para el fallback HTML
import Scene from './components/Scene';
import './index.css';

function App() {
  return (
    // Este div es el contenedor de toda tu aplicación, ocupará el 100% de la ventana.
    // 'relative' es crucial para posicionar el overlay de carga.
    <div className="w-full h-screen relative">
      {/*
        Este Suspense es el ÚNICO que debe tener un fallback de HTML.
        Envuelve todo el contenido 3D (tu Scene) y mostrará "Cargando escena 3D..."
        mientras el modelo (y otros assets grandes) dentro de Scene se cargan.
      */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-2xl z-50">
          Cargando escena 3D... {/* <--- ¡Este es tu cargador HTML! */}
        </div>
      }>
        {/* Aquí es donde se renderiza tu escena 3D completa. */}
        {/* Solo una instancia de <Scene />. */}
        <Scene />
      </Suspense>

      {/* Aquí es donde eventualmente agregarías otros componentes de UI (botones, info, etc.)
          que NO sean parte de la escena 3D, y que quieres que aparezcan POR ENCIMA del Canvas.
          Por ejemplo: <UIControls /> */}
    </div>
  );
}

export default App;