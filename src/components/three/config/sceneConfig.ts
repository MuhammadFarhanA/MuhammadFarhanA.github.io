import * as THREE from 'three';

export const sceneConfig = {
  hero: { start: 0, end: 0.52 },
  identity: { start: 0.48, end: 1 },
};

export const cameraKeyframes = [
  { at: 0, position: [7.8, 4.8, 8.6] as [number, number, number], target: [0, 0.2, -1.4] as [number, number, number], fov: 46 },
  { at: 0.2, position: [4.8, 1.7, 4.1] as [number, number, number], target: [-0.2, 0, -1.3] as [number, number, number], fov: 42 },
  { at: 0.4, position: [-3.6, 1.2, 2.4] as [number, number, number], target: [0, 0, -1.6] as [number, number, number], fov: 44 },
  { at: 0.6, position: [-5.2, 2.2, -7.2] as [number, number, number], target: [0, 0.2, -8.2] as [number, number, number], fov: 48 },
  { at: 0.8, position: [-4.2, 1.6, -13] as [number, number, number], target: [0, 0.2, -16] as [number, number, number], fov: 44 },
  { at: 1, position: [4.8, 2.8, -18.5] as [number, number, number], target: [0, 0, -16] as [number, number, number], fov: 50 },
];

export const cameraPositionPath = new THREE.CatmullRomCurve3(cameraKeyframes.map((keyframe) => new THREE.Vector3(...keyframe.position)), false, 'centripetal', 0.45);
export const cameraTargetPath = new THREE.CatmullRomCurve3(cameraKeyframes.map((keyframe) => new THREE.Vector3(...keyframe.target)), false, 'centripetal', 0.45);

export const palette = { graphite: '#20262b', charcoal: '#11181d', paper: '#e6e2da', blue: '#2459ff', steel: '#7d888a' };
