import * as THREE from 'three';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

export class FractalScene implements SpatialScene {
  public readonly id = 'fractal' as const;
  public readonly group = new THREE.Group();
  public readonly portalSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.2),
    new THREE.MeshBasicMaterial({ color: '#172126' }),
  );
  private readonly materials = createSceneMaterials();

  public constructor() {
    this.createBranch(this.group, 3, 2.3, new THREE.Vector3(0, 0, -60));
    this.createBranch(this.group, 2, 2.4, new THREE.Vector3(-5, 2, -69));
    this.createBranch(this.group, 2, 2.2, new THREE.Vector3(5, -1, -73));

    const beacon = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3.2, 0.34, 96, 18),
      this.materials.porcelain,
    );
    beacon.position.set(0, 0, -60);
    beacon.rotation.set(0.4, 0.2, 0);
    this.group.add(beacon);

    const portal = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.16, 16, 64),
      this.materials.darkSilver,
    );
    portal.position.z = -84;
    this.group.add(portal);

    this.portalSurface.position.z = -84.05;
    this.portalSurface.userData.destinationZ = -113;
    this.group.add(this.portalSurface);
  }

  private createBranch(
    parent: THREE.Group,
    level: number,
    scale: number,
    position: THREE.Vector3,
  ): void {
    if (level <= 0) {
      return;
    }

    const group = new THREE.Group();
    group.position.copy(position);
    group.scale.setScalar(scale);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      level % 2 === 0 ? this.materials.whiteGlass : this.materials.porcelain,
    );
    core.castShadow = true;
    group.add(core);
    parent.add(group);

    const offsets = [
      [1.55, 0, 0],
      [-1.55, 0, 0],
      [0, 1.55, 0],
      [0, -1.55, 0],
      [0, 0, 1.55],
      [0, 0, -1.55],
    ];

    offsets.forEach(([x, y, z]) => {
      this.createBranch(group, level - 1, 0.42, new THREE.Vector3(x, y, z));
    });
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
