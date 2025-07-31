// src/store/store.js
import { create } from 'zustand';

// Colores de ejemplo que la moto podrá tener
export const colors = {
  // Estos son los colores que el usuario podrá seleccionar más tarde.
  // El color 'default' aquí solo es un valor por si `currentColor`
  // necesita un valor inicial válido, pero NO afectará la carga inicial de la moto.
  white: '#FFFFFF',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#00FF00',
  black: '#000000',
};

const useStore = create((set) => ({
  // currentColor: Se inicializa a uno de los colores de la paleta.
  // IMPORTANTE: Este color NO será visible en la carga inicial
  // porque 'isOriginalColorActive' estará en true.
  currentColor: colors.white, // Puedes elegir cualquier color de la paleta aquí como "seleccionado por defecto"

  // ESTADO CLAVE: Inicializa en TRUE para que la moto cargue con sus colores de fábrica.
  isOriginalColorActive: true, // <-- ¡Este es el cambio fundamental!

  // Acción para cambiar el color de la carcasa
  setColor: (newColor) => set({
    currentColor: newColor,
    isOriginalColorActive: false, // Si se selecciona un color, el modo original se desactiva
  }),

  // Acción para activar/desactivar el modo de color original (para el botón "Orig.")
  setOriginalColorActive: (isActive) => set({
    isOriginalColorActive: isActive,
  }),
}));

export default useStore;