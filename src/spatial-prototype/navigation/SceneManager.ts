import * as THREE from 'three';
import { EntranceScene } from '../scenes/EntranceScene';
import { FractalScene } from '../scenes/FractalScene';
import { LiquidMetalScene } from '../scenes/LiquidMetalScene';
import type { EnvironmentAssetLoader } from '../environment/EnvironmentAssetLoader';
import type { DimensionId, SpatialScene } from '../types/SpatialTypes';

export class SceneManager {
  private readonly scenes: SpatialScene[];
  private activeIndex = 0;

  public constructor(environmentLoader: EnvironmentAssetLoader) {
    this.scenes = [
      new EntranceScene(environmentLoader),
      new FractalScene(environmentLoader),
      new LiquidMetalScene(environmentLoader),
    ];
  }

  public get activeScene(): THREE.Scene {
    return this.scenes[this.activeIndex].scene;
  }

  public get activeDimension(): DimensionId {
    return this.scenes[this.activeIndex].id;
  }

  public get destinationScene(): THREE.Scene {
    const destinationIndex = this.activeIndex === 0 ? 1 : this.activeIndex - 1;
    return this.scenes[destinationIndex].scene;
  }

  public get sourcePortal(): THREE.Mesh {
    return this.scenes[this.activeIndex].portalSurface;
  }

  public get destinationPortal(): THREE.Mesh {
    const destinationIndex = this.activeIndex === 0 ? 1 : this.activeIndex - 1;
    return this.scenes[destinationIndex].portalSurface;
  }

  public update(travel: number): void {
    const nextIndex = travel >= 0.67 ? 2 : travel >= 0.34 ? 1 : 0;
    if (nextIndex !== this.activeIndex) {
      this.activeIndex = nextIndex;
    }
  }

  public getCameraZ(travel: number): number {
    if (travel < 0.34) {
      return THREE.MathUtils.lerp(12, -24, travel / 0.34);
    }

    if (travel < 0.67) {
      return THREE.MathUtils.lerp(14, -24, (travel - 0.34) / 0.33);
    }

    return THREE.MathUtils.lerp(14, -24, (travel - 0.67) / 0.33);
  }

  public getPortalBoundary(): number {
    return this.activeIndex === 0 ? 0.34 : 0.67;
  }

  public dispose(): void {
    this.scenes.forEach((scene) => scene.dispose());
  }
}
