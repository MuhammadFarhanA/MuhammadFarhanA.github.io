import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { sceneConfig } from './config/sceneConfig';

export default function CameraRig({ progress, onDebug }: { progress: React.MutableRefObject<number>; onDebug?: (camera: THREE.PerspectiveCamera) => void }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());
  useFrame(() => {
    const p = progress.current;
    const hero = sceneConfig.hero.position; const identity = sceneConfig.identity.position;
    const t = THREE.MathUtils.smoothstep(p, 0.22, 0.56);
    desired.current.set(THREE.MathUtils.lerp(hero[0], identity[0], t), THREE.MathUtils.lerp(hero[1], identity[1], t), THREE.MathUtils.lerp(hero[2], identity[2], t));
    camera.position.lerp(desired.current, 0.08);
    target.current.set(THREE.MathUtils.lerp(0, 0, t), THREE.MathUtils.lerp(0, 0.2, t), THREE.MathUtils.lerp(-1.5, -16, t));
    camera.lookAt(target.current);
    onDebug?.(camera as THREE.PerspectiveCamera);
  });
  return null;
}
