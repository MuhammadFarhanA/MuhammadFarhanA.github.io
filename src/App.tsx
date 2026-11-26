import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ExperienceProvider } from './experience/ExperienceProvider';
import FractalHome from './pages/FractalHome';
import ProjectList from './pages/ProjectList';
import PoemList from './pages/PoemList';
import PoemDetail from './pages/PoemDetail';
import CaseStudy from './pages/CaseStudy';

function RouteEffects() { const location = useLocation(); useEffect(() => { document.title = location.pathname === '/' ? 'Farhan Atif — Interface Architect' : 'Farhan Atif — Portfolio'; window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]); return null; }
export default function App() { return <ExperienceProvider><RouteEffects /><Routes><Route path="/" element={<FractalHome />} /><Route path="/projects" element={<ProjectList />} /><Route path="/poems" element={<PoemList />} /><Route path="/poems/:id" element={<PoemDetail />} /><Route path="/case-study/:projectId" element={<CaseStudy />} /><Route path="*" element={<FractalHome />} /></Routes></ExperienceProvider>; }
