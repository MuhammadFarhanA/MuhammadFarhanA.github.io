import * as THREE from 'three';
import type { EnvironmentAssetLoader } from '../environment/EnvironmentAssetLoader';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

const createPanel = (
  size: THREE.Vector3,
  position: THREE.Vector3,
  material: THREE.Material,
): THREE.Mesh => {
  const panel = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
  panel.position.copy(position);
  panel.castShadow = true;
  panel.receiveShadow = true;
  return panel;
};

export class EntranceScene implements SpatialScene {
  public readonly id = 'mirror-chamber' as const;
  public readonly scene = new THREE.Scene();
  public readonly group = new THREE.Group();
  public readonly portalSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 8),
    new THREE.MeshBasicMaterial({ color: '#101820' }),
  );
  private readonly materials = createSceneMaterials();

  public constructor(environmentLoader: EnvironmentAssetLoader) {
    this.scene.background = new THREE.Color('#020305');
    this.scene.fog = new THREE.Fog('#020305', 18, 92);
    this.scene.add(this.group);
    void environmentLoader.load('/assets/hdri/studio_small_03_2k.hdr').then((texture) => {
      this.scene.environment = texture;
    });
    this.createChamber();
    this.addLighting();
  }

  private createChamber(): void {
    const wallMaterial = this.materials.darkSilver;
    const chromeMaterial = this.materials.silver;

    this.group.add(
      createPanel(new THREE.Vector3(30, 0.3, 62), new THREE.Vector3(0, -6, -18), wallMaterial),
      createPanel(new THREE.Vector3(30, 0.3, 62), new THREE.Vector3(0, 6, -18), wallMaterial),
      createPanel(new THREE.Vector3(0.3, 12, 62), new THREE.Vector3(-15, 0, -18), wallMaterial),
      createPanel(new THREE.Vector3(0.3, 12, 62), new THREE.Vector3(15, 0, -18), wallMaterial),
    );

    for (let index = 0; index < 7; index += 1) {
      const z = -2 - index * 7.5;
      const width = 10 + index * 0.8;
      this.group.add(
        createPanel(
          new THREE.Vector3(0.24, 11, 0.24),
          new THREE.Vector3(-width / 2, 0, z),
          chromeMaterial,
        ),
        createPanel(
          new THREE.Vector3(0.24, 11, 0.24),
          new THREE.Vector3(width / 2, 0, z),
          chromeMaterial,
        ),
        createPanel(
          new THREE.Vector3(width, 0.24, 0.24),
          new THREE.Vector3(0, 5.5, z),
          chromeMaterial,
        ),
        createPanel(
          new THREE.Vector3(width, 0.24, 0.24),
          new THREE.Vector3(0, -5.5, z),
          chromeMaterial,
        ),
      );
    }

    this.portalSurface.position.set(0, 0, -28);
    this.portalSurface.userData.destinationZ = 14;
    this.group.add(this.portalSurface);
  }

  private addLighting(): void {
    const ambient = new THREE.AmbientLight('#7b8791', 0.36);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight('#ffffff', 4.2);
    key.position.set(4, 9, 6);
    key.castShadow = true;
    this.scene.add(key);

    const portalLight = new THREE.PointLight('#a5c7ff', 26, 30);
    portalLight.position.set(0, 0, -25);
    this.scene.add(portalLight);
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
