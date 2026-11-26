import * as THREE from 'three';
import type { EnvironmentAssetLoader } from '../environment/EnvironmentAssetLoader';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

export class FractalScene implements SpatialScene {
  public readonly id = 'fractal-architecture' as const;
  public readonly scene = new THREE.Scene();
  public readonly group = new THREE.Group();
  public readonly portalSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 8),
    new THREE.MeshBasicMaterial({ color: '#f4f2eb' }),
  );
  private readonly materials = createSceneMaterials();

  public constructor(environmentLoader: EnvironmentAssetLoader) {
    this.scene.background = new THREE.Color('#e8e8e2');
    this.scene.fog = new THREE.Fog('#e8e8e2', 20, 110);
    this.scene.add(this.group);
    void environmentLoader.load('/assets/hdri/white_studio_06_2k.hdr').then((texture) => {
      this.scene.environment = texture;
    });
    this.createArchitecture();
    this.addLighting();
  }

  private createArchitecture(): void {
    for (let index = 0; index < 5; index += 1) {
      const z = 9 - index * 8;
      const size = 15 + index * 2;
      this.createRecursiveBay(new THREE.Vector3(0, 0, z), size, 2);
    }

    this.portalSurface.position.set(0, 0, -28);
    this.portalSurface.userData.destinationZ = 14;
    this.group.add(this.portalSurface);
  }

  private createRecursiveBay(position: THREE.Vector3, size: number, level: number): void {
    const frameMaterial = level % 2 === 0 ? this.materials.porcelain : this.materials.whiteGlass;
    const thickness = 0.36;
    const depth = 0.42;
    const half = size / 2;
    const pieces = [
      [size, thickness, depth, 0, half],
      [size, thickness, depth, 0, -half],
      [thickness, size, depth, -half, 0],
      [thickness, size, depth, half, 0],
    ];

    pieces.forEach(([width, height, zDepth, x, y]) => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(width, height, zDepth), frameMaterial);
      panel.position.set(position.x + x, position.y + y, position.z);
      panel.castShadow = true;
      panel.receiveShadow = true;
      this.group.add(panel);
    });

    if (level > 1) {
      const childSize = size * 0.42;
      const offsets = [
        [-size * 0.3, size * 0.3],
        [size * 0.3, size * 0.3],
        [-size * 0.3, -size * 0.3],
        [size * 0.3, -size * 0.3],
      ];
      offsets.forEach(([x, y]) => {
        this.createRecursiveBay(
          new THREE.Vector3(position.x + x, position.y + y, position.z - 0.35),
          childSize,
          level - 1,
        );
      });
    }
  }

  private addLighting(): void {
    this.scene.add(new THREE.AmbientLight('#ffffff', 1.5));

    const softbox = new THREE.DirectionalLight('#ffffff', 3.2);
    softbox.position.set(-6, 10, 6);
    softbox.castShadow = true;
    this.scene.add(softbox);

    const rim = new THREE.DirectionalLight('#b9d5ff', 1.8);
    rim.position.set(7, 3, -18);
    this.scene.add(rim);
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
