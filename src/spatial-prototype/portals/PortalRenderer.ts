import * as THREE from 'three';

export class PortalRenderer {
  private readonly target = new THREE.WebGLRenderTarget(512, 512, {
    depthBuffer: true,
    stencilBuffer: false,
  });
  private readonly portalCamera = new THREE.PerspectiveCamera(46, 1, 0.1, 260);
  private readonly surfaces: THREE.Mesh[] = [];

  public register(surface: THREE.Mesh): void {
    this.surfaces.push(surface);
    const material = surface.material as THREE.MeshBasicMaterial;
    material.map = this.target.texture;
    material.needsUpdate = true;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ): number {
    const surface = this.surfaces.find((candidate) => {
      const destinationZ = candidate.userData.destinationZ ?? -84;
      return camera.position.z > destinationZ;
    });

    if (!surface) {
      return 0;
    }

    const destinationZ = (surface.userData.destinationZ as number) ?? -84;
    const visibility = surface.visible;
    surface.visible = false;
    this.portalCamera.position.copy(camera.position);
    this.portalCamera.position.z = destinationZ - 6;
    this.portalCamera.rotation.copy(camera.rotation);
    this.portalCamera.updateProjectionMatrix();
    renderer.setRenderTarget(this.target);
    renderer.render(scene, this.portalCamera);
    renderer.setRenderTarget(null);
    surface.visible = visibility;
    return 1;
  }

  public dispose(): void {
    this.target.dispose();
  }
}
