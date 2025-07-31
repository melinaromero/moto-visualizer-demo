// src/components/MotoModel.jsx
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore from "../store/store";

// Lista de nombres de meshes O materiales que SÍ deberían cambiar de color.
// AJUSTA SEGÚN LAS PARTES ESPECÍFICAS DE LA CARCASA A PINTAR.
// BASADO EN CONSOLE.LOG 
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
    'frame001', // Si el chasis también es pintable, si no, no

    'Car Paint', 'Car Paint.001', 'Car Paint.003', 'Car Paint.004',
    'Car Paint.008', 'Car Paint.009', 'Car Paint.011', 'Car Paint.012',
    'Car Paint.013',
    // Revisar console.log para añadir más si es necesario.
];

function MotoModel(props) {
    const { scene } = useGLTF('/moto.glb');
    const modelRef = useRef();

    const clonedScene = useRef(null);
    const originalMaterials = useRef(new Map()); // Mapa para almacenar los colores originales de los materiales

    if (!clonedScene.current) {
        clonedScene.current = scene.clone();
        // Recorrer la escena clonada y guardar los materiales originales CLONADOS
        clonedScene.current.traverse((child) => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(mat => {
                        const clonedMat = mat.clone();
                        // Guardar el color original de CADA material clonado
                        originalMaterials.current.set(clonedMat.uuid, clonedMat.color.clone());
                        return clonedMat;
                    });
                } else {
                    child.material = child.material.clone();
                    // Guardar el color original del material clonado
                    originalMaterials.current.set(child.material.uuid, child.material.color.clone());
                }
            }
        });
    }
    const modelToRender = clonedScene.current;

    const currentColor = useStore((state) => state.currentColor);
    const isOriginalColorActive = useStore((state) => state.isOriginalColorActive); // Obtiene el estado de si el color original está activo

    // 1. AJUSTE INICIAL PARA ASENTAR EL MODELO
    useLayoutEffect(() => {
        modelToRender.position.set(0, 0, 0); // Reset para un cálculo limpio del bbox
        const bbox = new THREE.Box3().setFromObject(modelToRender);
        console.log('Bounding box:', bbox);
        const elevation = -bbox.min.y;
        modelToRender.position.set(0, elevation, 0); // Asienta la moto en Y=0
    }, [modelToRender]);

    // 2. APLICAR COLOR Y CONFIGURAR SOMBRAS
    useEffect(() => {
        modelToRender.traverse((child) => {
            // Descomenta esta línea para depuración si se necesitas ver los nombres nuevamente
            // console.log('Mesh Name:', child.name, 'Material Name:', child.material?.name);
            if (child.isMesh && child.material) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Determinar si esta malla DEBE cambiar de color
                const isPintablePart = INCLUDE_FOR_COLOR_CHANGE.some(name =>
                    child.name.toLowerCase().includes(name.toLowerCase()) ||
                    (child.material?.name && child.material.name.toLowerCase().includes(name.toLowerCase()))
                );

                // Aplica el color solo a los tipos de material que lo soportan directamente
                if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial || child.material.isMeshLambertMaterial || child.material.isMeshPhongMaterial) {
                    if (isPintablePart) {
                        // Si es una parte pintable
                        if (isOriginalColorActive) {
                            // Si el modo original está activo, aplica el color original guardado
                            const originalColor = originalMaterials.current.get(child.material.uuid);
                            if (originalColor) {
                                child.material.color.copy(originalColor);
                            }
                        } else {
                            // Si el modo original NO está activo, aplica el currentColor del store
                            child.material.color.set(currentColor);
                        }
                    } else {
                        // Si NO es una parte pintable, SIEMPRE restaura su color original
                        const originalColor = originalMaterials.current.get(child.material.uuid);
                        if (originalColor) {
                            child.material.color.copy(originalColor);
                        }
                    }
                }
            }
        });
    }, [currentColor, isOriginalColorActive, modelToRender]); // Re-ejecuta cuando el color o el estado original cambien

    // ANIMACIÓN DE ROTACIÓN AUTOMÁTICA
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005; // Ajusta la velocidad aquí
        }
    });

    return <primitive object={modelToRender} ref={modelRef} {...props} />;
}

useGLTF.preload('/moto.glb');

export default MotoModel;