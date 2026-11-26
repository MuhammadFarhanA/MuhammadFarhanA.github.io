import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const frameSizes = [[7.8, 5.2], [6.3, 4.2], [4.9, 3.2], [3.7, 2.4], [2.6, 1.7]] as const;
export default function Entrance({ progress }: { progress: React.MutableRefObject<number> }) {
  const frames = useRef<(THREE.Group | null)[]>([]); const mirror = useRef<THREE.Mesh>(null);
  useFrame(() => { const p = progress.current; frames.current.forEach((frame, index) => { if (!frame) return; const depth = index * 1.2 + 0.1; const reveal = THREE.MathUtils.smoothstep(p, 0.08, 0.44); frame.position.z = THREE.MathUtils.lerp(depth, index * 0.34, reveal); frame.rotation.y = THREE.MathUtils.lerp((index % 2 ? 0.06 : -0.06), 0, reveal); frame.scale.setScalar(THREE.MathUtils.lerp(0.88, 1, reveal)); }); if (mirror.current) { const reveal = THREE.MathUtils.smoothstep(p, 0.16, 0.5); (mirror.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(0.25, 0.72, reveal); } });
  return <group position={[0, 0, -1]}>
    <mesh ref={mirror} position={[0, 0, -2.2]} material={new THREE.MeshStandardMaterial({ color: '#aeb7bb', metalness: 0.92, roughness: 0.12, transparent: true, opacity: 0.3 })}><planeGeometry args={[3.5, 2.3]} /></mesh>
    {frameSizes.map(([width, height], index) => <group key={width} ref={(node) => { frames.current[index] = node; }} position={[0, 0, index * 1.2 + 0.1]} rotation={[0, index % 2 ? 0.06 : -0.06, 0]}>
      <mesh position={[0, height / 2, 0]} material={new THREE.MeshStandardMaterial({ color: index === 0 ? '#d6dde0' : '#737d83', metalness: 0.78, roughness: 0.2 })}><boxGeometry args={[width, 0.12, 0.16]} /><Edges color="#f6f8f8" /></mesh><mesh position={[0, -height / 2, 0]} material={new THREE.MeshStandardMaterial({ color: '#5e696f', metalness: 0.8, roughness: 0.2 })}><boxGeometry args={[width, 0.12, 0.16]} /></mesh><mesh position={[-width / 2, 0, 0]} material={new THREE.MeshStandardMaterial({ color: '#aeb8bb', metalness: 0.84, roughness: 0.18 })}><boxGeometry args={[0.12, height, 0.16]} /></mesh><mesh position={[width / 2, 0, 0]} material={new THREE.MeshStandardMaterial({ color: '#aeb8bb', metalness: 0.84, roughness: 0.18 })}><boxGeometry args={[0.12, height, 0.16]} /></mesh>
    </group>)}
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, -8]} material={new THREE.MeshStandardMaterial({ color: '#101416', roughness: 0.5, metalness: 0.5 })}><planeGeometry args={[22, 28]} /></mesh>
    <pointLight position={[0, 2, 4]} intensity={18} distance={15} color="#ffffff" /><pointLight position={[0, 0, -8]} intensity={14} distance={15} color="#8ea6ff" />
  </group>;
}
