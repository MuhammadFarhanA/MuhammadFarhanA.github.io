export const depthConfig = { entrance: { start: 0, end: 0.48 }, identity: { start: 0.42, end: 1 } };
export const cameraKeyframes = [
  { at: 0, position: [8, 3.2, 9] as [number, number, number], target: [0, 0, -1] as [number, number, number], fov: 48 },
  { at: 0.24, position: [4.2, 0.8, 4] as [number, number, number], target: [0, 0, -2.5] as [number, number, number], fov: 43 },
  { at: 0.5, position: [-3.6, 1.4, 0.6] as [number, number, number], target: [0, 0, -4] as [number, number, number], fov: 45 },
  { at: 0.72, position: [4.4, 2.3, -7.5] as [number, number, number], target: [0, 0.3, -11] as [number, number, number], fov: 50 },
  { at: 1, position: [-4.5, 1.2, -14] as [number, number, number], target: [0, 0, -11] as [number, number, number], fov: 46 },
];
