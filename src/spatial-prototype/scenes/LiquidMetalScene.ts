import * as THREE from 'three';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

export class LiquidMetalScene implements SpatialScene {
  public readonly id = 'liquid-metal' as const;
  public readonly group = new THREE.Group();
  private readonly materials = createSceneMaterials();

  public constructor() {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7, 1, -102),
      new THREE.Vector3(-2, -2, -112),
      new THREE.Vector3(4, 2, -124),
      new THREE.Vector3(0, 0, -136),
    ]);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 100, 1.8, 24, false),
      this.materials.liquid,
    );
    tube.castShadow = true;
    this.group.add(tube);

    [-108, -119, -130].forEach((z, index) => {
      const torus = new THREE.Mesh(
        new THREE.TorusKnotGeometry(2.3 + index * 0.45, 0.23, 96, 18),
        index === 1 ? this.materials.warm : this.materials.liquid,
      );
      torus.position.set(index % 2 === 0 ? -3 : 3, index - 1, z);
      torus.rotation.set(0.3, index * 0.5, 0.2);
      torus.castShadow = true;
      this.group.add(torus);
    });

    const beacon = new THREE.Mesh(
      new THREE.TorusKnotGeometry(4.2, 0.42, 128, 24),
      this.materials.liquid,
    );
    beacon.position.set(0, 0, -113);
    beacon.rotation.set(0.6, 0.4, 0.2);
    this.group.add(beacon);
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
