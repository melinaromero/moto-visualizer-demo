// src/components/UIControls.jsx
import { motion } from 'framer-motion';
import useStore, { colors } from "../store/store";
import ConfigTabs from './ConfigTabs'; 

function UIControls({ onResetCamera, onMoveCamera }) {
  const setColor = useStore((state) => state.setColor);
  const currentColor = useStore((state) => state.currentColor);
  const handleColorChange = (color) => {
    setColor(color);
  };
  const cameraViews = {
    'Vista Frontal': { position: [10, 5, 0], target: [0, 0, 0] },
    'Vista Lateral': { position: [0, 5, 10], target: [0, 0, 0] },
    'Vista Trasera': { position: [-10, 5, 0], target: [0, 0, 0] },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-center p-6 bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl text-white z-10 w-80"
    >
      <h2 className="text-xl font-bold mb-5">Configuración de la Moto</h2>
      
      <ConfigTabs>
        <div tabId="color">
          <div className="w-full mb-5">
            <h3 className="text-lg font-semibold mb-3">Colores</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(colors).map(([name, hex]) => (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                    currentColor === hex ? 'border-blue-500 ring-4 ring-blue-300' : 'border-gray-600 hover:border-blue-300'
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => handleColorChange(hex)}
                  title={name}
                />
              ))}
            </div>
          </div>
        </div>
        <div tabId="wheels">
          <p>Opciones de ruedas irán aquí.</p>
        </div>
        <div tabId="accessories">
          <p>Opciones de accesorios irán aquí.</p>
        </div>
      </ConfigTabs>

      <div className="w-full mb-5">
        <h3 className="text-lg font-semibold mb-3">Vistas de la cámara</h3>
        <div className="flex flex-col space-y-2">
          {Object.entries(cameraViews).map(([name, view]) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors"
              onClick={() => onMoveCamera(view.position, view.target)}
            >
              {name}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors mt-3"
        onClick={onResetCamera}
      >
        Reset Cámara
      </motion.button>
    </motion.div>
  );
}

export default UIControls;