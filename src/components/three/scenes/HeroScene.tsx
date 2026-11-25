import { useFrame } from '@react-three/fiber';
import { Edges, Grid, Line } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';
import { electricBlue, matteGraphite, mattePaper } from '../materials/materials';

const layers = Array.from({ length: 6 }, (_, index) => index);

export default function HeroScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const layerRefs = useRef<(Group | null)[]>([]); const assembly = useRef(0);
  useFrame(() => { assembly.current += (Math.min(1, Math.max(0, (progress.current - 0.06) / 0.25)) - assembly.current) * 0.1; layerRefs.current.forEach((layer, index) => { if (!layer) return; const explodedX = -2.8 + index * 1.08; const assembledX = (index - 2.5) * 0.62; layer.position.x = THREE.MathUtils.lerp(explodedX, assembledX, assembly.current); layer.position.y = THREE.MathUtils.lerp(0.15 + (index % 2) * 0.14, 0.1, assembly.current); layer.position.z = THREE.MathUtils.lerp(0.8 - index * 0.38, 0.2 - index * 0.24, assembly.current); layer.rotation.y = THREE.MathUtils.lerp((index - 2.5) * 0.14, 0, assembly.current); layer.rotation.z = THREE.MathUtils.lerp(index % 2 ? 0.08 : -0.08, 0, assembly.current); }); if (import.meta.env.DEV) (window as Window & { __heroTransforms?: unknown }).__heroTransforms = layerRefs.current.map((layer) => layer ? { x: layer.position.x, y: layer.position.y, z: layer.position.z } : null); });
  return <group position={[0, 0, -1.5]}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.25, 0]} material={matteGraphite}><planeGeometry args={[24, 32]} /><Edges color="#526064" /></mesh>
    <Grid args={[18, 24]} position={[0, -2.2, -7]} cellSize={0.75} cellThickness={0.7} sectionSize={3} sectionThickness={1.1} sectionColor="#2459ff" cellColor="#627074" fadeDistance={28} />
    <mesh castShadow position={[0, 1.1, -0.7]} material={matteGraphite}><boxGeometry args={[8.8, 5.7, 0.18]} /><Edges color="#9ba6a4" /></mesh>
    {layers.map((index) => <group key={index} ref={(node) => { layerRefs.current[index] = node; }} position={[-2.8 + index * 1.08, 0.15 + (index % 2) * 0.14, 0.8 - index * 0.38]} rotation={[0, (index - 2.5) * 0.14, index % 2 ? 0.08 : -0.08]}>
      <mesh castShadow material={index % 2 ? mattePaper : matteGraphite}><boxGeometry args={[3.8, 2.3, 0.18]} /><Edges color={index % 2 ? '#20262b' : '#b6c2c1'} /></mesh>
      <mesh position={[-1.35, 0.72, 0.13]} material={electricBlue}><boxGeometry args={[0.35, 0.07, 0.04]} /></mesh><mesh position={[-0.92, 0.72, 0.13]} material={index % 2 ? matteGraphite : mattePaper}><boxGeometry args={[0.35, 0.07, 0.04]} /></mesh><mesh position={[0.7, -0.42, 0.13]} material={electricBlue}><boxGeometry args={[1.2, 0.08, 0.04]} /></mesh>
    </group>)}
    <mesh castShadow position={[0, 0.9, -2.1]} material={electricBlue}><boxGeometry args={[0.08, 5.6, 0.08]} /></mesh><mesh castShadow position={[4.35, 0.9, -2.1]} material={electricBlue}><boxGeometry args={[0.08, 5.6, 0.08]} /></mesh><mesh castShadow position={[0, -0.1, -2.1]} material={electricBlue}><boxGeometry args={[8.8, 0.08, 0.08]} /></mesh>
    <Line points={[[-4.4, -1.9, 1.5], [4.4, -1.9, 1.5]]} color="#2459ff" lineWidth={1.2} />
  </group>;
}
