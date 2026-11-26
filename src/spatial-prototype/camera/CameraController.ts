import * as THREE from 'three';
import { CAMERA_PATH } from '../config/CameraPathConfig';
import { MILESTONES } from '../config/MilestoneConfig';
import { RENDER_CONFIG } from '../config/RenderConfig';

export class CameraController {
  public readonly camera: THREE.PerspectiveCamera;
  private readonly position = new THREE.Vector3();
  private readonly target = new THREE.Vector3();
  private readonly upperPosition = new THREE.Vector3();
  private readonly upperTarget = new THREE.Vector3();

  public constructor() {
    this.camera = new THREE.PerspectiveCamera(
      RENDER_CONFIG.fieldOfView,
      window.innerWidth / window.innerHeight,
      RENDER_CONFIG.nearClip,
      RENDER_CONFIG.farClip,
    );
    this.camera.position.set(0, CAMERA_PATH.verticalOffset, CAMERA_PATH.startZ);
  }

  public update(milestonePosition: number): void {
    const lowerIndex = Math.min(Math.floor(milestonePosition), MILESTONES.length - 2);
    const upperIndex = lowerIndex + 1;
    const rawBlend = milestonePosition - lowerIndex;
    const blend = THREE.MathUtils.smoothstep(rawBlend, 0, 1);
    const lower = MILESTONES[lowerIndex];
    const upper = MILESTONES[upperIndex];
    this.position
      .fromArray(lower.position)
      .lerp(this.upperPosition.fromArray(upper.position), blend);
    this.target.fromArray(lower.target).lerp(this.upperTarget.fromArray(upper.target), blend);

    this.camera.position.copy(this.position);
    this.camera.lookAt(this.target);
    this.camera.fov = THREE.MathUtils.lerp(lower.fov, upper.fov, blend);
    this.camera.updateProjectionMatrix();
  }

  public resize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
