import * as THREE from 'three';
import { palette } from '../config/sceneConfig';

export const matteGraphite = new THREE.MeshStandardMaterial({ color: palette.graphite, roughness: 0.76, metalness: 0.08 });
export const mattePaper = new THREE.MeshStandardMaterial({ color: palette.paper, roughness: 0.88, metalness: 0 });
export const electricBlue = new THREE.MeshStandardMaterial({ color: palette.blue, roughness: 0.35, metalness: 0.2, emissive: palette.blue, emissiveIntensity: 0.13 });
export const darkSteel = new THREE.MeshStandardMaterial({ color: palette.steel, roughness: 0.62, metalness: 0.34 });
