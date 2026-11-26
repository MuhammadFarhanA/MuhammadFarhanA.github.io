import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
export default function Identity({ progress }: { progress: React.MutableRefObject<number> }) { const group = useRef<THREE.Group>(null); useFrame(() => { if (!group.current) return; const p = THREE.MathUtils.smoothstep(progress.current, 0.46, 0.72); group.current.position.y = THREE.MathUtils.lerp(-1, 0, p); group.current.rotation.y = THREE.MathUtils.lerp(0.12, -0.08, p); }); return <group ref={group} position={[0, -1, -5.5]}>
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} material={new THREE.MeshStandardMaterial({ color: '#edeae2', roughness: 0.92 })}><planeGeometry args={[22, 20]} /></mesh>
  <group position={[-2.7, 0, 0]}><RoundedBox args={[3.4, 5.2, 0.42]} radius={0.05} smoothness={3} material={new THREE.MeshStandardMaterial({ color: '#f0eee8', roughness: 0.82 })} castShadow /><mesh position={[0, 0, 0.25]} material={new THREE.MeshStandardMaterial({ color: '#111416', roughness: 0.2, metalness: 0.3, transparent: true, opacity: 0.7 })}><boxGeometry args={[2.5, 3.8, 0.06]} /></mesh></group>
  <group position={[2.4, 0.4, 0.4]} rotation={[0, -0.2, -0.08]}><RoundedBox args={[4.1, 3.2, 0.3]} radius={0.04} smoothness={3} material={new THREE.MeshStandardMaterial({ color: '#14181b', roughness: 0.38, metalness: 0.2 })} castShadow /><mesh position={[0, 0, 0.2]} material={new THREE.MeshStandardMaterial({ color: '#d8d4ca', roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.5 })}><boxGeometry args={[2.9, 2.1, 0.05]} /></mesh></group>
  <mesh position={[0, 1.8, -0.8]} material={new THREE.MeshStandardMaterial({ color: '#20262b', roughness: 0.45, metalness: 0.3 })}><boxGeometry args={[0.08, 8.5, 0.08]} /></mesh><pointLight position={[0, 2, 2]} intensity={16} distance={14} color="#fffaf0" /><pointLight position={[-4, 1, -5]} intensity={12} distance={12} color="#b9c7ff" />
</group>; }
