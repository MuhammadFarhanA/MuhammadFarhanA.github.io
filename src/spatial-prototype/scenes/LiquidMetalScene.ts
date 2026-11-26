import * as THREE from 'three';
import type { EnvironmentAssetLoader } from '../environment/EnvironmentAssetLoader';
import type { SpatialScene } from '../types/SpatialTypes';
import { disposeObject } from '../utils/DisposalUtils';
import { createSceneMaterials, disposeMaterials } from './SceneMaterials';

export class LiquidMetalScene implements SpatialScene {
  public readonly id = 'liquid-metal' as const;
  public readonly scene = new THREE.Scene();
  public readonly group = new THREE.Group();
  public readonly portalSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 8),
    new THREE.MeshBasicMaterial({ color: '#241b16' }),
  );
  private readonly materials = createSceneMaterials();

  public constructor(environmentLoader: EnvironmentAssetLoader) {
    this.scene.background = new THREE.Color('#160f0b');
    this.scene.fog = new THREE.Fog('#160f0b', 18, 96);
    this.scene.add(this.group);
    void environmentLoader.load('/assets/hdri/studio_wizja_03_2k.hdr').then((texture) => {
      this.scene.environment = texture;
    });
    this.createArchitecture();
    this.addLighting();
  }

  private createArchitecture(): void {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 4, 10),
      new THREE.Vector3(-6, -3, 0),
      new THREE.Vector3(7, 3, -12),
      new THREE.Vector3(0, -2, -28),
    ]);
    const primarySurface = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 120, 3.4, 32, false),
      this.materials.liquid,
    );
    primarySurface.castShadow = true;
    this.group.add(primarySurface);

    for (let index = 0; index < 4; index += 1) {
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(8 + index * 1.2, 0.34, 24, 96),
        index % 2 === 0 ? this.materials.liquid : this.materials.warm,
      );
      rib.position.set(0, 0, 5 - index * 9);
      rib.rotation.x = Math.PI / 2;
      rib.castShadow = true;
      this.group.add(rib);
    }

    this.portalSurface.position.set(0, 0, -29);
    this.portalSurface.userData.destinationZ = 14;
    this.group.add(this.portalSurface);
  }

  private addLighting(): void {
    this.scene.add(new THREE.AmbientLight('#8d6c59', 0.55));

    const warmLight = new THREE.PointLight('#ffb56f', 40, 54);
    warmLight.position.set(3, 4, -18);
    this.scene.add(warmLight);

    const rimLight = new THREE.DirectionalLight('#d5e7ff', 2.4);
    rimLight.position.set(-8, 6, 10);
    this.scene.add(rimLight);
  }

  public dispose(): void {
    disposeObject(this.group);
    disposeMaterials(this.materials);
  }
}
