import * as THREE from 'three';
import { EntranceScene } from '../scenes/EntranceScene';
import { FractalScene } from '../scenes/FractalScene';
import { LiquidMetalScene } from '../scenes/LiquidMetalScene';
import type { DimensionId, SpatialScene } from '../types/SpatialTypes';

export class SceneManager {
  public readonly group = new THREE.Group();
  private readonly scenes: SpatialScene[] = [
    new EntranceScene(),
    new FractalScene(),
    new LiquidMetalScene(),
  ];

  public constructor() {
    this.scenes.forEach((scene) => this.group.add(scene.group));
  }

  public getDimension(travel: number): DimensionId {
    if (travel < 0.29) {
      return 'entrance';
    }

    if (travel < 0.68) {
      return 'fractal';
    }

    return 'liquid-metal';
  }

  public update(travel: number): void {
    this.scenes[0].group.rotation.z = travel * 0.08;
    this.scenes[1].group.rotation.y = travel * 0.12;
    this.scenes[2].group.rotation.y = travel * 0.04;
  }

  public getPortalSurfaces(): THREE.Mesh[] {
    const entrance = this.scenes[0] as EntranceScene;
    const fractal = this.scenes[1] as FractalScene;
    return [entrance.portalSurface, fractal.portalSurface];
  }

  public dispose(): void {
    this.scenes.forEach((scene) => scene.dispose());
  }
}
