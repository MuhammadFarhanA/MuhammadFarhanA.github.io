import HeroScene from './scenes/HeroScene';
import IdentityScene from './scenes/IdentityScene';
import Lighting from './Lighting';

export default function World({ progress }: { progress: React.MutableRefObject<number> }) { return <><color attach="background" args={['#cfd5d1']} /><Lighting /><HeroScene progress={progress} /><IdentityScene progress={progress} /></>; }
