import { CameraController } from './camera/CameraController';
import { EnvironmentAssetLoader } from './environment/EnvironmentAssetLoader';
import { Renderer } from './core/Renderer';
import { Diagnostics } from './diagnostics/Diagnostics';
import { InputController } from './input/InputController';
import { SceneManager } from './navigation/SceneManager';
import { TravelController } from './navigation/TravelController';
import { PortalRenderer } from './portals/PortalRenderer';

export class SpatialPrototype {
  private readonly camera = new CameraController();
  private readonly renderer: Renderer;
  private readonly travel = new TravelController();
  private readonly input: InputController;
  private readonly scenes: SceneManager;
  private readonly environments: EnvironmentAssetLoader;
  private readonly diagnostics: Diagnostics;
  private readonly portals = new PortalRenderer();
  private lastTime = performance.now();
  private fpsTime = this.lastTime;
  private frameCount = 0;
  private fps = 60;
  private frameId = 0;
  private disconnectInput: (() => void) | undefined;

  public constructor(private readonly root: HTMLElement) {
    this.renderer = new Renderer(root);
    this.environments = new EnvironmentAssetLoader(this.renderer.instance);
    this.scenes = new SceneManager(this.environments);
    this.input = new InputController(this.travel);
    this.diagnostics = new Diagnostics(root);
    this.portals.register(this.scenes.sourcePortal);
    void this.environments.preload([
      '/assets/hdri/studio_small_03_2k.hdr',
      '/assets/hdri/white_studio_06_2k.hdr',
      '/assets/hdri/studio_wizja_03_2k.hdr',
    ]);
  }

  public start(): void {
    this.disconnectInput = this.input.connect();
    window.addEventListener('resize', this.handleResize);
    this.frameId = requestAnimationFrame(this.renderFrame);
  }

  public dispose(): void {
    cancelAnimationFrame(this.frameId);
    this.disconnectInput?.();
    window.removeEventListener('resize', this.handleResize);
    this.scenes.dispose();
    this.portals.dispose();
    this.environments.dispose();
    this.diagnostics.dispose();
    this.renderer.dispose();
  }

  private readonly handleResize = (): void => {
    this.camera.resize();
    this.renderer.resize();
  };

  private readonly renderFrame = (now: number): void => {
    const deltaTime = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    const travel = this.travel.update(deltaTime);
    this.scenes.update(travel.current);
    this.portals.register(this.scenes.sourcePortal);
    this.camera.update(this.scenes.getCameraZ(travel.current));

    const portalPasses = this.portals.render(
      this.renderer.instance,
      this.scenes.destinationScene,
      this.camera.camera,
      this.scenes.sourcePortal,
      this.scenes.destinationPortal,
    );
    this.updatePerformance(now);
    this.renderer.instance.render(this.scenes.activeScene, this.camera.camera);
    this.diagnostics.update({
      dimension: this.scenes.activeDimension,
      travel,
      camera: this.camera.camera,
      fps: this.fps,
      frameTime: deltaTime * 1000,
      drawCalls: this.renderer.instance.info.render.calls,
      triangles: this.renderer.instance.info.render.triangles,
      portalPasses,
      reflectionPasses: 0,
    });
    this.frameId = requestAnimationFrame(this.renderFrame);
  };

  private updatePerformance(now: number): void {
    this.frameCount += 1;
    if (now - this.fpsTime > 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.fpsTime));
      this.frameCount = 0;
      this.fpsTime = now;
    }
  }
}
