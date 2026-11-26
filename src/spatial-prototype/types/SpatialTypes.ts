import type * as THREE from 'three';

export type DimensionId = 'mirror-chamber' | 'fractal-architecture' | 'liquid-metal';

export interface TravelState {
  current: number;
  target: number;
}

export interface RuntimeDiagnostics {
  dimension: DimensionId;
  travel: TravelState;
  camera: THREE.PerspectiveCamera;
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangles: number;
  portalPasses: number;
  reflectionPasses: number;
}

export interface SpatialScene {
  readonly id: DimensionId;
  readonly scene: THREE.Scene;
  readonly group: THREE.Group;
  readonly portalSurface: THREE.Mesh;
  dispose(): void;
}
