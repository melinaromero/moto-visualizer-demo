import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import  { useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore from "../store/store";
import { applyCustomColoring } from '../utils/materialUtils'; // nueva funcion apartadapara aplicar el color

// Lista de nombres de meshes o materiales que SÍ deberían cambiar de color.
// Esta lista permanece en el componente ya que es específica del modelo.
const INCLUDE_FOR_COLOR_CHANGE = [
    'ColorMoto', 'ColorMoto001', 'ColorMoto002', 'ColorMoto003', 'ColorMoto004',
    'ColorMoto005', 'ColorMoto006', 'ColorMoto007', 'ColorMoto008',
    'body001', 'body001_1', 'body001_2', 'body001_3', 'body001_4',
    'plastic_small_rear',
    'plastic_body003',
    'plastic_body_front',
    'Plane001',
    'protect_engine001', 'protect_engine001_1', 'protect_engine001_2',
    'fender_front001',
    'fender_rear',
    'frame001',
    'Car Paint', 'Car Paint.001', 'Car Paint.003', 'Car Paint.004',
    'Car Paint.008', 'Car Paint.009', 'Car Paint.011', 'Car Paint.012',
    'Car Paint.013'
];

function MotoModel(props) {
    const { scene } = useGLTF('/moto.glb');
    const modelRef = useRef();
    const originalMaterials = useRef(new Map());

    const modelToRender = useMemo(() => {
        const clone = scene.clone(true);
        
        clone.traverse((child) => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(mat => {
                        const clonedMat = mat.clone();
                        originalMaterials.current.set(clonedMat.uuid, clonedMat.color.clone());
                        return clonedMat;
                    });
                } else {
                    child.material = child.material.clone();
                    originalMaterials.current.set(child.material.uuid, child.material.color.clone());
                }
            }
        });
        
        return clone;
    }, [scene]);

    const currentColor = useStore((state) => state.currentColor);
    const isOriginalColorActive = useStore((state) => state.isOriginalColorActive);

    // 1. AJUSTE INICIAL PARA ASENTAR EL MODELO
    useLayoutEffect(() => {
        modelToRender.position.set(0, 0, 0);
        const bbox = new THREE.Box3().setFromObject(modelToRender);
        console.log('Bounding box:', bbox);
        const elevation = -bbox.min.y;
        modelToRender.position.set(0, elevation, 0);
    }, [modelToRender]);

    // 2. APLICAR COLOR Y CONFIGURAR SOMBRAS
    useEffect(() => {
        // Llamamos a la nueva  función de utilidades aquí
        applyCustomColoring(
            modelToRender,
            currentColor,
            isOriginalColorActive,
            originalMaterials.current,
            INCLUDE_FOR_COLOR_CHANGE
        );
    }, [currentColor, isOriginalColorActive, modelToRender]);

    // ANIMACIÓN DE ROTACIÓN AUTOMÁTICA
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    return <primitive object={modelToRender} ref={modelRef} {...props} />;
}

useGLTF.preload('/moto.glb');

export default MotoModel;