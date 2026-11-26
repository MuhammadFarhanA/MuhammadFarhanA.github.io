import * as THREE from 'three';
import { CameraController } from './camera/CameraController';
import { Renderer } from './core/Renderer';
import { Diagnostics } from './diagnostics/Diagnostics';
import { InputController } from './input/InputController';
import { SceneManager } from './navigation/SceneManager';
import { TravelController } from './navigation/TravelController';
import { PortalRenderer } from './portals/PortalRenderer';

export class SpatialPrototype {
  private readonly scene = new THREE.Scene();
  private readonly camera = new CameraController();
  private readonly renderer: Renderer;
  private readonly travel = new TravelController();
  private readonly input: InputController;
  private readonly scenes = new SceneManager();
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
    this.input = new InputController(this.travel);
    this.diagnostics = new Diagnostics(root);
    this.scene.background = new THREE.Color('#030405');
    this.scene.fog = new THREE.Fog('#030405', 34, 260);
    this.scene.add(this.scenes.group);
    this.scenes.getPortalSurfaces().forEach((surface) => {
      this.portals.register(surface);
    });
    this.addLighting();
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
    this.camera.update(travel.current);
    this.scenes.update(travel.current);
    this.updatePerformance(now);
    const portalPasses = this.portals.render(
      this.renderer.instance,
      this.scene,
      this.camera.camera,
    );
    this.renderer.instance.render(this.scene, this.camera.camera);
    this.diagnostics.update({
      dimension: this.scenes.getDimension(travel.current),
      travel,
      camera: this.camera.camera,
      fps: this.fps,
      frameTime: deltaTime * 1000,
      drawCalls: this.renderer.instance.info.render.calls,
      triangles: this.renderer.instance.info.render.triangles,
      portalPasses,
      reflectionPasses: 1,
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

  private addLighting(): void {
    this.scene.add(new THREE.AmbientLight('#cbd4d7', 0.72));

    const key = new THREE.DirectionalLight('#ffffff', 3.6);
    key.position.set(7, 12, 6);
    key.castShadow = true;
    this.scene.add(key);

    const blue = new THREE.PointLight('#788cff', 32, 52);
    blue.position.set(0, 1, -28);
    this.scene.add(blue);

    const white = new THREE.PointLight('#ffffff', 28, 70);
    white.position.set(0, 3, -58);
    this.scene.add(white);

    const warm = new THREE.PointLight('#ffb56f', 34, 70);
    warm.position.set(3, 3, -106);
    this.scene.add(warm);
  }
}
