# Moto Visualizer

Moto Visualizer es una aplicación web construida con **React**, **Vite**, **Three.js** y **TailwindCSS** que permite visualizar un modelo 3D de una moto en un entorno interactivo. Utiliza [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) para renderizar gráficos 3D y [`@react-three/drei`](https://docs.pmnd.rs/react-three-drei/introduction) para utilidades adicionales.


## Características

- Visualización 3D interactiva de una moto (`moto.glb`)
- Controles de cámara (rotar, hacer zoom y mover)
- Cargador visual mientras se carga el modelo
- Sombra realista bajo la moto
- Estilizado con TailwindCSS

## Instalación

```sh
git clone https://github.com/Alan4745/grupo-uma-v2.git
cd grupo-uma-v2
npm install
npm run dev

Abre http://localhost:5173 en tu navegador.

Estructura de Carpetas
├── public/
│   ├── moto.glb         # Modelo 3D de la moto
│   └── vite.svg         # Icono de la app
├── src/
│   ├── App.jsx          # Componente raíz
│   ├── main.jsx         # Punto de entrada de React
│   ├── index.css        # Tailwind base
│   ├── App.css          # Estilos adicionales
│   └── components/
│       ├── Scene.jsx        # Escena 3D principal
│       ├── MotoModel.jsx    # Carga y configura el modelo 3D
│       └── UIControls.jsx   # Controles de UI (placeholder)

Componentes Principales
App.jsx: Componente raíz. Renderiza la escena 3D y el cargador visual.
Scene.jsx: Renderiza el <Canvas>, configura cámara, luces, controles y entorno.
MotoModel.jsx: Carga y configura el modelo 3D de la moto.
UIControls.jsx: Placeholder para futuros controles de UI.