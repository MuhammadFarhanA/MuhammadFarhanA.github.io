import type { MilestoneSnapshot } from '../types/SpatialTypes';

const DIMENSIONS = [
  { label: 'Mirror chamber', milestone: 0 },
  { label: 'Fractal architecture', milestone: 3 },
];

export class NavigationOverlay {
  private readonly element: HTMLElement;
  private readonly copy: HTMLElement;
  private readonly status: HTMLElement;
  private readonly buttons: HTMLButtonElement[] = [];

  public constructor(
    root: HTMLElement,
    private readonly onJump: (milestoneIndex: number) => void,
  ) {
    this.element = document.createElement('nav');
    this.element.className = 'spatial-navigation';
    this.element.setAttribute('aria-label', 'Spatial dimensions');

    const list = document.createElement('div');
    list.className = 'spatial-navigation__dimensions';
    DIMENSIONS.forEach(({ label, milestone }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => this.onJump(milestone));
      list.appendChild(button);
      this.buttons.push(button);
    });

    this.status = document.createElement('p');
    this.status.className = 'spatial-navigation__status';
    this.status.setAttribute('aria-live', 'polite');
    this.element.append(list, this.status);

    this.copy = document.createElement('section');
    this.copy.className = 'milestone-copy';
    this.copy.setAttribute('aria-live', 'polite');
    root.append(this.element, this.copy);
  }

  public update(snapshot: MilestoneSnapshot): void {
    this.status.textContent = `${snapshot.milestone.dimension} · milestone ${snapshot.currentIndex + 1} of 6`;
    this.copy.innerHTML = `<p class="milestone-copy__eyebrow">${snapshot.milestone.dimension}</p><h1>${snapshot.milestone.title}</h1><p>${snapshot.milestone.description}</p>`;

    this.buttons.forEach((button, index) => {
      const isActive =
        index === 0
          ? snapshot.milestone.dimension === 'mirror-chamber'
          : snapshot.milestone.dimension === 'fractal-architecture';
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  public dispose(): void {
    this.element.remove();
    this.copy.remove();
  }
}
