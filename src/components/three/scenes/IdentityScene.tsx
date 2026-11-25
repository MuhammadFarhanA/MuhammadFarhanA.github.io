import { useFrame } from '@react-three/fiber';
import { Edges, Html, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { electricBlue, matteGraphite, mattePaper } from '../materials/materials';

export default function IdentityScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => { if (!group.current) return; const t = THREE.MathUtils.smoothstep(progress.current, 0.58, 0.78); group.current.position.y = THREE.MathUtils.lerp(-0.8, 0, t); group.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 1, t)); });
  return <group ref={group} position={[0, -0.8, -16]} scale={0.8}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} material={mattePaper}><planeGeometry args={[20, 18]} /></mesh>
    <mesh receiveShadow position={[0, 1, -1.6]} material={matteGraphite}><boxGeometry args={[10, 5.2, 0.18]} /><Edges color="#b6c2c1" /></mesh>
    <group position={[-2.7, 0, 0]}><RoundedBox args={[3.4, 4.2, 0.45]} radius={0.04} smoothness={2} castShadow material={matteGraphite} />{[-1.2, -0.4, 0.4, 1.2].map((y) => <mesh key={y} position={[0, y, 0.26]} material={electricBlue}><boxGeometry args={[2.4, 0.05, 0.04]} /></mesh>)}<mesh position={[0, -1.75, 0.25]} material={electricBlue}><boxGeometry args={[2.3, 0.04, 0.04]} /></mesh></group>
    <group position={[2.3, 0.4, 0.3]} rotation={[0, -0.18, -0.08]}><RoundedBox args={[3.9, 3.1, 0.28]} radius={0.03} smoothness={2} castShadow material={mattePaper} /><mesh position={[0, -0.65, 0.2]} material={electricBlue}><boxGeometry args={[2.4, 0.11, 0.04]} /></mesh><mesh position={[-0.75, 0.15, 0.2]} material={matteGraphite}><boxGeometry args={[0.85, 0.85, 0.04]} /></mesh></group>
    <mesh position={[0, 1.4, -0.5]} rotation={[0, 0, Math.PI / 2]} material={electricBlue}><boxGeometry args={[0.06, 9, 0.06]} /></mesh><mesh position={[0, -0.7, -0.5]} material={electricBlue}><boxGeometry args={[8, 0.04, 0.04]} /></mesh>
    <Html position={[-2.7, -2.05, 0]} center><span className="webgl-label">ORDER / SYSTEM</span></Html><Html position={[2.3, -1.75, 0]} center><span className="webgl-label">SPACE / EXPRESSION</span></Html>
  </group>;
}
