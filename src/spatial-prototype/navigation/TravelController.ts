import * as THREE from 'three';
import { RENDER_CONFIG } from '../config/RenderConfig';
import type { TravelState } from '../types/SpatialTypes';

export class TravelController {
  private state: TravelState = { current: 0, target: 0 };

  public addInput(delta: number): void {
    this.state.target = THREE.MathUtils.clamp(
      this.state.target + delta,
      0,
      RENDER_CONFIG.maxTravel,
    );
  }

  public update(deltaTime: number): TravelState {
    this.state.current = THREE.MathUtils.damp(
      this.state.current,
      this.state.target,
      RENDER_CONFIG.damping,
      deltaTime,
    );

    return { ...this.state };
  }

  public getState(): TravelState {
    return { ...this.state };
  }
}
