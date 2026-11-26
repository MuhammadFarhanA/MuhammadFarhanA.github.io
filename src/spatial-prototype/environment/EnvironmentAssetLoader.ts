import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

interface EnvironmentCacheEntry {
  texture: THREE.Texture;
  target: THREE.WebGLRenderTarget;
}

export class EnvironmentAssetLoader {
  private readonly loader = new RGBELoader();
  private readonly pmrem: THREE.PMREMGenerator;
  private readonly cache = new Map<string, Promise<EnvironmentCacheEntry>>();

  public constructor(renderer: THREE.WebGLRenderer) {
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.pmrem.compileEquirectangularShader();
  }

  public load(path: string): Promise<THREE.Texture> {
    const cached = this.cache.get(path);
    if (cached) {
      return cached.then((entry) => entry.texture);
    }

    const entryPromise = this.loader.loadAsync(path).then((hdrTexture) => {
      hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
      const target = this.pmrem.fromEquirectangular(hdrTexture);
      hdrTexture.dispose();
      const entry = { texture: target.texture, target };
      return entry;
    });

    this.cache.set(path, entryPromise);
    return entryPromise.then((entry) => entry.texture);
  }

  public preload(paths: string[]): Promise<THREE.Texture[]> {
    return Promise.all(paths.map((path) => this.load(path)));
  }

  public dispose(): void {
    this.cache.forEach((entryPromise) => {
      void entryPromise.then((entry) => entry.target.dispose());
    });
    this.cache.clear();
    this.pmrem.dispose();
  }
}
