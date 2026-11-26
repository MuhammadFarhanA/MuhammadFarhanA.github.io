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

  public update(localZ: number): void {
    this.camera.position.set(0, CAMERA_PATH.verticalOffset, localZ);
    this.camera.lookAt(0, CAMERA_PATH.verticalOffset, localZ - CAMERA_PATH.lookAhead);
  }

  public resize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
