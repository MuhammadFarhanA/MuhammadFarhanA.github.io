import * as THREE from 'three';

export class PortalRenderer {
  private readonly target = new THREE.WebGLRenderTarget(512, 512);
  private readonly portalCamera = new THREE.PerspectiveCamera(46, 1, 0.1, 260);
  private registeredSurface: THREE.Mesh | undefined;

  public register(surface: THREE.Mesh): void {
    this.registeredSurface = surface;
    const material = surface.material as THREE.MeshBasicMaterial;
    material.map = this.target.texture;
    material.needsUpdate = true;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    destinationScene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    sourcePortal: THREE.Mesh,
    destinationPortal: THREE.Mesh,
  ): number {
    const surface = this.registeredSurface;
    if (!surface) {
      return 0;
    }

    const sourcePosition = new THREE.Vector3();
    const destinationPosition = new THREE.Vector3();
    sourcePortal.getWorldPosition(sourcePosition);
    destinationPortal.getWorldPosition(destinationPosition);
    const cameraOffset = camera.position.z - sourcePosition.z;

    surface.visible = false;
    this.portalCamera.position.set(
      destinationPosition.x + (camera.position.x - sourcePosition.x),
      destinationPosition.y + (camera.position.y - sourcePosition.y),
      destinationPosition.z + cameraOffset,
    );
    this.portalCamera.lookAt(
      destinationPosition.x,
      destinationPosition.y,
      destinationPosition.z - 8,
    );
    this.portalCamera.updateProjectionMatrix();
    renderer.setRenderTarget(this.target);
    renderer.render(destinationScene, this.portalCamera);
    renderer.setRenderTarget(null);
    surface.visible = true;
    return 1;
  }

  public dispose(): void {
    this.target.dispose();
  }
}
