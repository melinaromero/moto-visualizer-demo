// src/components/MotoModel.jsx
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber'; // Importa useFrame
function MotoModel(props) {
  const { scene } = useGLTF('/moto.glb');
  const modelRef = useRef(); // Crea una referencia para el grupo del modelo

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      // child.receiveShadow = true; // Descomenta si es necesario
    }
  });

  // Si la escala 1  da un tamaño razonable, la mantenemos. Si no, ajustar.
  // Basado en tu última imagen, escala 1 parece estar bien para el tamaño.
  // scene.scale.set(1, 1, 1); // Puedes mantenerla comentada si por defecto es 1

  // Primero reseteamos la posición para un cálculo limpio del bbox
  scene.position.set(0, 0, 0);

  // Calcula el bounding box
  const bbox = new THREE.Box3().setFromObject(scene);
  console.log('Bounding box:', bbox);

  // Calcula la elevación necesaria para que bbox.min.y esté en 0
  const elevation = -bbox.min.y;
  scene.position.set(0, elevation, 0); // Asienta la moto en Y=0

  // Añade el BoxHelper *después* de posicionar la moto, para que refleje la posición final.
  const boxHelper = new THREE.BoxHelper(scene, 0xff0000); // Rojo para visibilidad
  scene.add(boxHelper);
 // --- ANIMACIÓN DE ROTACIÓN AUTOMÁTICA ---
  useFrame(() => {
    if (modelRef.current) {
      // Rota el modelo un poco en el eje Y en cada frame
      // Ajusta la velocidad cambiando el 0.005 (más grande = más rápido)
      modelRef.current.rotation.y += 0.005;
    }
  });
  return <primitive object={scene} ref={modelRef} {...props} />;
}

useGLTF.preload('/moto.glb');

export default MotoModel;