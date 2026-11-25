import { Html, RoundedBox } from '@react-three/drei';
import { electricBlue, matteGraphite, mattePaper } from '../materials/materials';

export default function IdentityScene() {
  return <group position={[0, 0, -16]}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} material={mattePaper}><planeGeometry args={[18, 14]} /></mesh>
    <group position={[-2.6, 0, 0]}>
      <RoundedBox args={[3.4, 4.2, 0.45]} radius={0.04} smoothness={2} castShadow material={matteGraphite} />
      {[-1.2, -0.4, 0.4, 1.2].map((y) => <mesh key={y} position={[0, y, 0.26]} material={electricBlue}><boxGeometry args={[2.4, 0.05, 0.04]} /></mesh>)}
    </group>
    <group position={[2.3, 0.4, 0.3]} rotation={[0, -0.18, -0.08]}>
      <RoundedBox args={[3.9, 3.1, 0.28]} radius={0.03} smoothness={2} castShadow material={mattePaper} />
      <mesh position={[0, -0.65, 0.2]} material={electricBlue}><boxGeometry args={[2.4, 0.11, 0.04]} /></mesh>
      <mesh position={[-0.75, 0.15, 0.2]} material={matteGraphite}><boxGeometry args={[0.85, 0.85, 0.04]} /></mesh>
    </group>
    <mesh position={[0, 1.4, -0.5]} rotation={[0, 0, Math.PI / 2]} material={electricBlue}><boxGeometry args={[0.06, 9, 0.06]} /></mesh>
    <Html position={[-2.6, -2.05, 0]} center><span className="webgl-label">ORDER / SYSTEM</span></Html>
    <Html position={[2.3, -1.75, 0]} center><span className="webgl-label">SPACE / EXPRESSION</span></Html>
  </group>;
}
