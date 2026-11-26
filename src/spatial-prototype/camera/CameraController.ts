import * as THREE from 'three';
import { CAMERA_PATH } from '../config/CameraPathConfig';
import { RENDER_CONFIG } from '../config/RenderConfig';

export class CameraController {
  public readonly camera: THREE.PerspectiveCamera;

  public constructor() {
    this.camera = new THREE.PerspectiveCamera(
      RENDER_CONFIG.fieldOfView,
      window.innerWidth / window.innerHeight,
      RENDER_CONFIG.nearClip,
      RENDER_CONFIG.farClip,
    );
    this.camera.position.set(0, CAMERA_PATH.verticalOffset, CAMERA_PATH.startZ);
  }

  public update(travel: number): void {
    const z = THREE.MathUtils.lerp(CAMERA_PATH.startZ, CAMERA_PATH.endZ, travel);
    const x = Math.sin(travel * Math.PI * 2) * 2.1;
    const y = CAMERA_PATH.verticalOffset + Math.sin(travel * Math.PI * 3) * 0.75;

    this.camera.position.set(x, y, z);
    this.camera.lookAt(x * 0.18, 0, z - CAMERA_PATH.lookAhead);
  }

  public resize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
