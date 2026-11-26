import './SpatialPrototype.module.scss';
import { SpatialPrototype } from './SpatialPrototype';

const root = document.querySelector<HTMLDivElement>('#spatial-root');

if (!root) {
  throw new Error('Spatial prototype root element was not found.');
}

try {
  const prototype = new SpatialPrototype(root);
  prototype.start();
  window.addEventListener('pagehide', () => prototype.dispose(), { once: true });
} catch (error) {
  console.error('Unable to initialize spatial prototype.', error);
}
