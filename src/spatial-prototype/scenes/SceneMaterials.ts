import * as THREE from 'three';

export const createSceneMaterials = (): Record<string, THREE.Material> => ({
  silver: new THREE.MeshStandardMaterial({
    color: '#c9d0d2',
    metalness: 0.94,
    roughness: 0.13,
  }),
  darkSilver: new THREE.MeshStandardMaterial({
    color: '#30373a',
    metalness: 0.88,
    roughness: 0.2,
  }),
  porcelain: new THREE.MeshStandardMaterial({
    color: '#f4f2eb',
    roughness: 0.72,
    metalness: 0.03,
    emissive: '#bfc4bd',
    emissiveIntensity: 0.8,
  }),
  whiteGlass: new THREE.MeshPhysicalMaterial({
    color: '#dce5e5',
    roughness: 0.16,
    transmission: 0.35,
    thickness: 0.4,
    transparent: true,
    opacity: 0.82,
    emissive: '#8da7ad',
    emissiveIntensity: 0.65,
  }),
});

export const disposeMaterials = (materials: Record<string, THREE.Material>): void => {
  Object.values(materials).forEach((material) => material.dispose());
};
