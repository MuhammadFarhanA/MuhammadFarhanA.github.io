import { useRef } from 'react';
import { Group } from 'three';
import { Edges, Grid, Line } from '@react-three/drei';
import { electricBlue, matteGraphite, mattePaper } from '../materials/materials';

const layers = Array.from({ length: 6 }, (_, index) => index);

export default function HeroScene() {
  const group = useRef<Group>(null);
  return <group ref={group} position={[0, 0, -1.5]}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.25, 0]} material={matteGraphite}><planeGeometry args={[20, 20]} /><Edges color="#526064" /></mesh>
    <Grid args={[14, 14]} position={[0, -2.2, 0]} rotation={[0, 0, 0]} cellSize={0.75} cellThickness={0.7} sectionSize={3} sectionThickness={1.1} sectionColor="#2459ff" cellColor="#627074" fadeDistance={22} />
    <mesh castShadow position={[0, 1.1, -0.7]} material={matteGraphite}><boxGeometry args={[8.8, 5.7, 0.18]} /><Edges color="#9ba6a4" /></mesh>
    {layers.map((index) => <group key={index} position={[-2.8 + index * 1.08, 0.15 + (index % 2) * 0.14, 0.8 - index * 0.38]} rotation={[0, (index - 2.5) * 0.035, (index % 2 ? 0.018 : -0.018)]}>
      <mesh castShadow material={index % 2 ? mattePaper : matteGraphite}><boxGeometry args={[3.8, 2.3, 0.12]} /><Edges color={index % 2 ? '#20262b' : '#b6c2c1'} /></mesh>
      <mesh position={[-1.35, 0.72, 0.1]} material={electricBlue}><boxGeometry args={[0.35, 0.07, 0.025]} /></mesh>
      <mesh position={[-0.92, 0.72, 0.1]} material={index % 2 ? matteGraphite : mattePaper}><boxGeometry args={[0.35, 0.07, 0.025]} /></mesh>
      <mesh position={[0.7, -0.42, 0.1]} material={electricBlue}><boxGeometry args={[1.2, 0.08, 0.025]} /></mesh>
    </group>)}
    <mesh castShadow position={[0, 0.9, -2.1]} material={electricBlue}><boxGeometry args={[0.08, 5.6, 0.08]} /></mesh>
    <mesh castShadow position={[4.35, 0.9, -2.1]} material={electricBlue}><boxGeometry args={[0.08, 5.6, 0.08]} /></mesh>
    <Line points={[[-4.4, -1.9, 1.5], [4.4, -1.9, 1.5]]} color="#2459ff" lineWidth={1.2} />
  </group>;
}
