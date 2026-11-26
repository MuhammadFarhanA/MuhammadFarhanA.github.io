import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ExperienceMode, Depth } from './experienceTypes';

type ExperienceState = { mode: ExperienceMode; depth: Depth; progress: number; setMode: (mode: ExperienceMode) => void; goToDepth: (depth: Depth) => void };
const ExperienceContext = createContext<ExperienceState | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const [mode, setModeState] = useState<ExperienceMode>(() => reduced ? 'standard' : ((localStorage.getItem('experience-mode') as ExperienceMode) || 'immersive'));
  const [depth, setDepth] = useState<Depth>('entrance'); const [progress, setProgress] = useState(0);
  const setMode = (next: ExperienceMode) => setModeState(next);
  useEffect(() => { document.documentElement.dataset.experienceMode = mode; localStorage.setItem('experience-mode', mode); }, [mode]);
  useEffect(() => { const listener = (event: Event) => { const value = Number((event as CustomEvent<number>).detail); setProgress(value); setDepth(value < 0.5 ? 'entrance' : 'identity'); }; window.addEventListener('fractal-progress', listener); return () => window.removeEventListener('fractal-progress', listener); }, []);
  const value = useMemo(() => ({ mode, depth, progress, setMode, goToDepth: (next: Depth) => { const value = next === 'entrance' ? 0 : 0.58; window.scrollTo({ top: value * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'smooth' }); } }), [mode, depth, progress]);
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
export function useExperience() { const context = useContext(ExperienceContext); if (!context) throw new Error('useExperience must be used inside ExperienceProvider'); return context; }
