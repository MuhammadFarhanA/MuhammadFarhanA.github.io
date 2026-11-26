import type * as THREE from 'three';

export type DimensionId = 'mirror-chamber' | 'fractal-architecture';

export interface TravelState {
  current: number;
  target: number;
}

export interface CameraMilestone {
  id: string;
  dimension: DimensionId;
  title: string;
  description: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface MilestoneSnapshot {
  currentIndex: number;
  targetIndex: number;
  position: number;
  settled: boolean;
  milestone: CameraMilestone;
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
  milestoneIndex: number;
  milestoneName: string;
  settled: boolean;
}

export interface SpatialScene {
  readonly id: DimensionId;
  readonly scene: THREE.Scene;
  readonly group: THREE.Group;
  readonly portalSurface: THREE.Mesh;
  dispose(): void;
}
