import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type Keyframe = { at: number; position: [number, number, number]; target: [number, number, number]; fov: number };
const keyframes: Keyframe[] = [
  { at: 0, position: [7.8, 4.8, 8.6], target: [0, 0.2, -1.4], fov: 46 },
  { at: 0.2, position: [4.8, 1.7, 4.1], target: [-0.2, 0, -1.3], fov: 42 },
  { at: 0.4, position: [-3.6, 1.2, 2.4], target: [0, 0, -1.6], fov: 44 },
  { at: 0.6, position: [-5.2, 2.2, -7.2], target: [0, 0.2, -8.2], fov: 48 },
  { at: 0.8, position: [-4.2, 1.6, -13], target: [0, 0.2, -16], fov: 44 },
  { at: 1, position: [4.8, 2.8, -18.5], target: [0, 0, -16], fov: 50 },
];

function sample(progress: number, field: 'position' | 'target') {
  const p = THREE.MathUtils.clamp(progress, 0, 1); const index = Math.min(keyframes.length - 2, Math.floor(p * (keyframes.length - 1))); const local = THREE.MathUtils.smoothstep((p - index / 5) * 5, 0, 1); const a = keyframes[index][field]; const b = keyframes[index + 1][field]; return [THREE.MathUtils.lerp(a[0], b[0], local), THREE.MathUtils.lerp(a[1], b[1], local), THREE.MathUtils.lerp(a[2], b[2], local)] as [number, number, number];
}

export default function CameraRig({ progress, controlsActive, reducedMotion, onDebug }: { progress: React.MutableRefObject<number>; controlsActive: React.MutableRefObject<boolean>; reducedMotion: boolean; onDebug?: (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void }) {
  const { camera, gl, scene } = useThree(); const target = useRef(new THREE.Vector3()); const desired = useRef(new THREE.Vector3());
  useFrame(() => { if (controlsActive.current) return; const p = reducedMotion ? 0 : progress.current; const pos = sample(p, 'position'); const look = sample(p, 'target'); desired.current.set(...pos); camera.position.lerp(desired.current, reducedMotion ? 1 : 0.12); target.current.set(...look); camera.lookAt(target.current); const k = keyframes[Math.min(keyframes.length - 1, Math.round(p * (keyframes.length - 1)))]; (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, k.fov, 0.12); (camera as THREE.PerspectiveCamera).updateProjectionMatrix(); onDebug?.(camera as THREE.PerspectiveCamera, gl, scene); });
  return null;
}
