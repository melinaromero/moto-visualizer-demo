// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MotoConfigurator from './pages/MotoConfigurator';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/configurator" element={<MotoConfigurator />} />
        {/* Puedes añadir una ruta de fallback para 404 */}
        <Route path="*" element={<div>404: Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;