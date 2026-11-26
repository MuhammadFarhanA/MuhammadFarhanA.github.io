import type { CameraMilestone } from '../types/SpatialTypes';

export const MILESTONES: CameraMilestone[] = [
  {
    id: 'mirror-arrival',
    dimension: 'mirror-chamber',
    title: 'Recursive Mirror Chamber',
    description: 'A reflective threshold suspended inside a monumental chrome interior.',
    position: [0, 0.7, 10],
    target: [0, 0.7, 2],
    fov: 46,
  },
  {
    id: 'mirror-introduction',
    dimension: 'mirror-chamber',
    title: 'Architecture That Looks Back',
    description:
      'Repeated ribs, polished walls and controlled light establish the first dimension.',
    position: [0, 0.7, 1],
    target: [0, 0.7, -7],
    fov: 44,
  },
  {
    id: 'mirror-content',
    dimension: 'mirror-chamber',
    title: 'The Aperture',
    description: 'The chamber resolves into a portal where another environment becomes visible.',
    position: [0, 0.7, -21],
    target: [0, 0.7, -28],
    fov: 42,
  },
  {
    id: 'fractal-arrival',
    dimension: 'fractal-architecture',
    title: 'White Fractal Architecture',
    description: 'Porcelain structures unfold around the camera as a bright recursive world.',
    position: [0, 0.7, 12],
    target: [0, 0.7, 4],
    fov: 46,
  },
  {
    id: 'fractal-introduction',
    dimension: 'fractal-architecture',
    title: 'Negative Space, Repeated',
    description: 'The camera travels through the openings inside a recursive architectural system.',
    position: [0, 0.7, 1],
    target: [0, 0.7, -7],
    fov: 44,
  },
  {
    id: 'fractal-content',
    dimension: 'fractal-architecture',
    title: 'A Traversable Pattern',
    description:
      'Layered bays create a stable reading position before the next approved dimension.',
    position: [0, 0.7, -12],
    target: [0, 0.7, -20],
    fov: 42,
  },
];

export const MILESTONE_THRESHOLD = 0.12;
