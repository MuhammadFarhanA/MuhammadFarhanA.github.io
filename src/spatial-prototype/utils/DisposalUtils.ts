import * as THREE from 'three';

export const disposeObject = (root: THREE.Object3D): void => {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => material.dispose());
    } else if (mesh.material) {
      mesh.material.dispose();
    }
  });
};
