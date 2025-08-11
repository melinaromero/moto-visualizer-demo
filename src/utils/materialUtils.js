export function applyCustomColoring(model, currentColor, isOriginalColorActive, originalMaterials, includeList) {
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;

      const isPintable = includeList.some(name =>
        child.name.toLowerCase().includes(name.toLowerCase()) ||
        (child.material.name?.toLowerCase().includes(name.toLowerCase()))
      );

      if (
        child.material.isMeshStandardMaterial ||
        child.material.isMeshPhysicalMaterial ||
        child.material.isMeshLambertMaterial ||
        child.material.isMeshPhongMaterial
      ) {
        const origColor = originalMaterials.get(child.material.uuid);
        if (isPintable) {
          if (isOriginalColorActive && origColor) {
            child.material.color.copy(origColor);
          } else {
            child.material.color.set(currentColor);
          }
        } else if (origColor) {
          child.material.color.copy(origColor);
        }
      }
    }
  });
}
