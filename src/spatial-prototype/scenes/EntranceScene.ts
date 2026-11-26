import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

const createFrame = (size: number, z: number, material: THREE.Material): THREE.Group => {
  const group = new THREE.Group();
  const thickness = 0.2;
  const depth = 0.32;
  const parts = [
    [size, thickness, 0, size / 2],
    [size, thickness, 0, -size / 2],
    [thickness, size, -size / 2, 0],
    [thickness, size, size / 2, 0],
  ];

  parts.forEach(([width, height, x, y]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, 0);
    mesh.castShadow = true;
    group.add(mesh);
  });

  group.position.z = z;
  return group;
};

export class EntranceScene implements SpatialScene {
  public readonly id = 'entrance' as const;
  public readonly group = new THREE.Group();
  public readonly portalSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 4.8),
    new THREE.MeshBasicMaterial({ color: '#0e1418' }),
  );
  private readonly materials = createSceneMaterials();

  public constructor() {
    const sizes = [8.8, 7.1, 5.6, 4.2, 3];
    sizes.forEach((size, index) => {
      const material = index % 2 === 0 ? this.materials.silver : this.materials.darkSilver;
      const frame = createFrame(size, -8 - index * 4.1, material);
      frame.rotation.z = index % 2 === 0 ? -0.025 : 0.025;
      this.group.add(frame);
    });

    const mirror = new Reflector(new THREE.PlaneGeometry(3.1, 3.1), {
      clipBias: 0.003,
      textureWidth: 512,
      textureHeight: 512,
      color: 0x53606a,
    });
    mirror.position.z = -29;
    this.group.add(mirror);

    this.portalSurface.position.z = -29.15;
    this.portalSurface.userData.destinationZ = -60;
    this.group.add(this.portalSurface);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 130),
      new THREE.MeshStandardMaterial({
        color: '#0a0d0f',
        metalness: 0.65,
        roughness: 0.3,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -3.2, -52);
    floor.receiveShadow = true;
    this.group.add(floor);
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
