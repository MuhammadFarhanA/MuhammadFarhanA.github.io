import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import World from './World';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceCanvas() {
  const progress = useRef(0); const [debug, setDebug] = useState({ x: 0, y: 0, z: 0, fps: 60 }); const [inspect, setInspect] = useState(false); const fps = useRef({ last: performance.now(), frames: 0 });
  useEffect(() => { const proxy = { value: 0 }; const trigger = ScrollTrigger.create({ trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1, onUpdate: (self) => { gsap.to(proxy, { value: self.progress, duration: 0.12, overwrite: true, onUpdate: () => { progress.current = proxy.value; } }); } }); return () => trigger.kill(); }, []);
  const updateDebug = (camera: THREE.PerspectiveCamera) => { if (!import.meta.env.DEV) return; fps.current.frames += 1; const now = performance.now(); if (now - fps.current.last > 500) { setDebug({ x: camera.position.x, y: camera.position.y, z: camera.position.z, fps: Math.round((fps.current.frames * 1000) / (now - fps.current.last)) }); fps.current = { last: now, frames: 0 }; } };
  return <div className={`experience-canvas ${inspect ? 'inspect-mode' : ''}`} aria-hidden="true"><Canvas shadows dpr={[1, 1.7]} gl={{ antialias: true, alpha: false }} fallback={<div className="webgl-fallback">3D preview unavailable — the interface remains fully accessible below.</div>}><PerspectiveCamera makeDefault fov={44} position={[0, 0.3, 3.5]} /><CameraRig progress={progress} onDebug={updateDebug} /><World />{import.meta.env.DEV && <OrbitControls enabled={inspect} enablePan={false} />}</Canvas>{import.meta.env.DEV && <aside className="debug-panel"><b>WEBGL DEBUG</b><span>scene: {progress.current < .3 ? 'hero' : progress.current < .6 ? 'identity' : 'journey'}</span><span>progress: {progress.current.toFixed(3)}</span><span>camera: {debug.x.toFixed(1)} / {debug.y.toFixed(1)} / {debug.z.toFixed(1)}</span><span>rotation: live look-at</span><span>fps: {debug.fps}</span><span>meshes: 34 · mode: immersive</span><button type="button" onClick={() => setInspect(!inspect)}>{inspect ? 'Exit camera inspect' : 'Inspect camera'}</button></aside>}</div>;
}
