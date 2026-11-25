import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { cameraKeyframes, cameraPositionPath, cameraTargetPath } from './config/sceneConfig';

export default function CameraRig({ progress, controlsActive, reducedMotion, onDebug }: { progress: React.MutableRefObject<number>; controlsActive: React.MutableRefObject<boolean>; reducedMotion: boolean; onDebug?: (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void }) {
  const { camera, gl, scene } = useThree(); const target = useRef(new THREE.Vector3()); const desired = useRef(new THREE.Vector3());
  useFrame(() => { if (controlsActive.current) return; const p = reducedMotion ? 0 : THREE.MathUtils.clamp(progress.current, 0, 1); cameraPositionPath.getPointAt(p, desired.current); cameraTargetPath.getPointAt(p, target.current); camera.position.lerp(desired.current, reducedMotion ? 1 : 0.16); camera.lookAt(target.current); const fov = THREE.MathUtils.lerp(cameraKeyframes[0].fov, cameraKeyframes[cameraKeyframes.length - 1].fov, p); (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, fov, reducedMotion ? 1 : 0.14); (camera as THREE.PerspectiveCamera).updateProjectionMatrix(); onDebug?.(camera as THREE.PerspectiveCamera, gl, scene); });
  return null;
}
