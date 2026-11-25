import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Lighting() {
  const { scene } = useThree();
  useEffect(() => { scene.fog = new THREE.Fog('#cfd5d1', 18, 42); return () => { scene.fog = null; }; }, [scene]);
  return <><ambientLight intensity={1.25} color="#dce6e2" /><directionalLight castShadow position={[5, 9, 5]} intensity={3.2} color="#fff8e8" shadow-mapSize={[1024, 1024]} /><directionalLight position={[-8, 2, -12]} intensity={2.1} color="#4f6fff" /></>;
}
