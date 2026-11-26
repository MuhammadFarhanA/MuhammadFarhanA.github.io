import * as THREE from 'three';
import { RENDER_CONFIG } from '../config/RenderConfig';

export class Renderer {
  public readonly instance: THREE.WebGLRenderer;

  public constructor(root: HTMLElement) {
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, RENDER_CONFIG.maxPixelRatio));
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    root.prepend(this.instance.domElement);
  }

  public resize(): void {
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }

  public dispose(): void {
    this.instance.dispose();
    this.instance.domElement.remove();
  }
}
