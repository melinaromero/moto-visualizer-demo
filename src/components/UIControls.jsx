// src/components/Scene.jsx
//import React from 'react';
import { motion } from 'framer-motion'; // Importa motion para animaciones
import useStore, { colors } from "../store/store"; 

function UIControls({ onResetCamera }) { // Recibe una prop para el reset de cámara
  const setColor = useStore((state) => state.setColor);
  const currentColor = useStore((state) => state.currentColor);

  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center p-4 bg-white bg-opacity-80 rounded-lg shadow-lg z-10"
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Cambiar Color</h2>
      <div className="flex space-x-3 mb-4">
        {Object.entries(colors).map(([name, hex]) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full border-2 ${
              currentColor === hex ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'
            }`}
            style={{ backgroundColor: hex }}
            onClick={() => handleColorChange(hex)}
            title={name.charAt(0).toUpperCase() + name.slice(1)} // Título para accesibilidad
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors"
        onClick={onResetCamera}
      >
        Reset Cámara
      </motion.button>
    </motion.div>
  );
}

export default UIControls;