import { INPUT_CONFIG } from '../config/InputConfig';
import type { TravelController } from '../navigation/TravelController';

export class InputController {
  private touchY = 0;

  public constructor(private readonly travel: TravelController) {}

  public connect(): () => void {
    const onWheel = (event: WheelEvent): void => {
      event.preventDefault();
      const delta = Math.max(
        -INPUT_CONFIG.maxWheelDelta,
        Math.min(INPUT_CONFIG.maxWheelDelta, event.deltaY),
      );
      this.travel.addInput(delta * INPUT_CONFIG.wheelScale);
    };

    const onTouchStart = (event: TouchEvent): void => {
      this.touchY = event.touches[0]?.clientY ?? this.touchY;
    };

    const onTouchMove = (event: TouchEvent): void => {
      event.preventDefault();
      const nextY = event.touches[0]?.clientY ?? this.touchY;
      this.travel.addInput((this.touchY - nextY) * INPUT_CONFIG.touchScale);
      this.touchY = nextY;
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        this.travel.addInput(INPUT_CONFIG.keyboardStep);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        this.travel.addInput(-INPUT_CONFIG.keyboardStep);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return (): void => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }
}
