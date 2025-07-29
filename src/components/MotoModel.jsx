// src/components/MotoModel.jsx
import { useGLTF } from '@react-three/drei';

function MotoModel(props) {
  const { scene } = useGLTF('/moto.glb');

  // Habilita las sombras para todos los meshes en el modelo
  // Necesitamos atravesar el modelo y habilitar castShadow para cada mesh
  // y receiveShadow para el suelo si tuviéramos uno explícito (ContactShadows lo maneja internamente)
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;   // Este objeto proyecta sombra
      // child.receiveShadow = true; // Este objeto recibe sombras (útil si la moto tuviera partes que se sombrean a sí mismas)
    }
  });
  //scene.scale.set(0.0001, 0.0001, 0.0001);
  // Chequear que la posición de la moto sea compatible con la posición de la sombra
  // Puede que se necesite ajustar esta posición o la de ContactShadows
  scene.position.set(0, -79, 0);  // Ajusta la posición si la moto se ve "flotando" o "enterrada"

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/moto.glb');

export default MotoModel;