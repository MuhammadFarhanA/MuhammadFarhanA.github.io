import * as THREE from 'three';
import { MILESTONES, MILESTONE_THRESHOLD } from '../config/MilestoneConfig';
import type { MilestoneSnapshot, TravelState } from '../types/SpatialTypes';

export class MilestoneNavigation {
  private position = 0;
  private targetIndex = 0;
  private inputAccumulator = 0;

  public addInput(delta: number): void {
    this.inputAccumulator = THREE.MathUtils.clamp(
      this.inputAccumulator + delta,
      -MILESTONE_THRESHOLD,
      MILESTONE_THRESHOLD,
    );

    if (Math.abs(this.inputAccumulator) < MILESTONE_THRESHOLD) {
      return;
    }

    const direction = this.inputAccumulator > 0 ? 1 : -1;
    this.targetIndex = THREE.MathUtils.clamp(
      this.targetIndex + direction,
      0,
      MILESTONES.length - 1,
    );
    this.inputAccumulator = 0;
  }

  public jumpTo(index: number): void {
    this.targetIndex = THREE.MathUtils.clamp(index, 0, MILESTONES.length - 1);
    this.inputAccumulator = 0;
  }

  public update(deltaTime: number): MilestoneSnapshot {
    this.position = THREE.MathUtils.damp(this.position, this.targetIndex, 8.5, deltaTime);
    const currentIndex = Math.round(this.position);
    const milestone = MILESTONES[currentIndex];

    return {
      currentIndex,
      targetIndex: this.targetIndex,
      position: this.position,
      settled: Math.abs(this.position - this.targetIndex) < 0.02,
      milestone,
    };
  }

  public getTravelState(): TravelState {
    return {
      current: this.position / (MILESTONES.length - 1),
      target: this.targetIndex / (MILESTONES.length - 1),
    };
  }

  public getSnapshot(): MilestoneSnapshot {
    const currentIndex = Math.round(this.position);
    return {
      currentIndex,
      targetIndex: this.targetIndex,
      position: this.position,
      settled: Math.abs(this.position - this.targetIndex) < 0.02,
      milestone: MILESTONES[currentIndex],
    };
  }
}
