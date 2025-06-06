import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectList from './pages/ProjectList';
import './index.css';

function App() {
  useEffect(() => {
    document.title = 'Design Portfolio | UI/UX Designer';
    
    if (!localStorage.getItem('theme')) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-background-light dark:bg-background-dark text-neutral-900 dark:text-neutral-100">
            <Header />
            <main>
              <Hero />
              <About />
              <WorkExperience />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/projects" element={<ProjectList />} />
    </Routes>
  );
}

export default App;