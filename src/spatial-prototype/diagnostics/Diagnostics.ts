import type { RuntimeDiagnostics } from '../types/SpatialTypes';

export class Diagnostics {
  private readonly element: HTMLElement;
  private readonly fields = new Map<string, HTMLElement>();

  public constructor(root: HTMLElement) {
    this.element = document.createElement('aside');
    this.element.className = 'spatial-debug';
    this.element.setAttribute('aria-label', 'Spatial prototype diagnostics');
    this.element.innerHTML = '<strong>SPATIAL PROTOTYPE</strong>';
    root.appendChild(this.element);

    [
      'dimension',
      'portal',
      'travel',
      'camera',
      'fov',
      'fps',
      'frameTime',
      'drawCalls',
      'triangles',
    ].forEach((name) => {
      const field = document.createElement('span');
      field.dataset.field = name;
      this.fields.set(name, field);
      this.element.appendChild(field);
    });
  }

  public update(diagnostics: RuntimeDiagnostics): void {
    this.set('dimension', `dimension: ${diagnostics.dimension}`);
    this.set('portal', `portal: ${diagnostics.dimension === 'entrance' ? 'first' : 'second'}`);
    this.set(
      'travel',
      `travel: ${diagnostics.travel.current.toFixed(3)} / target ${diagnostics.travel.target.toFixed(3)}`,
    );
    this.set(
      'camera',
      `camera: ${diagnostics.camera.position.x.toFixed(2)} / ${diagnostics.camera.position.y.toFixed(2)} / ${diagnostics.camera.position.z.toFixed(2)}`,
    );
    this.set('fov', `fov: ${diagnostics.camera.fov.toFixed(1)}`);
    this.set('fps', `fps: ${diagnostics.fps}`);
    this.set('frameTime', `frame: ${diagnostics.frameTime.toFixed(2)}ms`);
    this.set('drawCalls', `draw calls: ${diagnostics.drawCalls}`);
    this.set('triangles', `triangles: ${diagnostics.triangles}`);
  }

  public dispose(): void {
    this.element.remove();
  }

  private set(name: string, value: string): void {
    this.fields.get(name)?.replaceChildren(value);
  }
}
