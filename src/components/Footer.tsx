import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface-dark text-white py-12">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <a href="#" className="text-xl font-bold tracking-tighter mb-4 inline-block">
                <span className="text-primary-400">design</span>
                <span className="text-white">portfolio</span>
              </a>
              <p className="text-neutral-400 max-w-md">
                Creating exceptional digital experiences through thoughtful design 
                and user-centered solutions. Let's build something amazing together.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`} 
                      className="text-neutral-400 hover:text-primary-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {[
                  'UI/UX Design', 
                  'Web Design', 
                  'Mobile App Design', 
                  'Product Design', 
                  'Design System'
                ].map((service) => (
                  <li key={service}>
                    <a 
                      href="#" 
                      className="text-neutral-400 hover:text-primary-400 transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            
            <p className="text-neutral-500 text-sm flex items-center">
              Designed and built with <Heart size={14} className="text-tertiary-500 mx-1" /> by Bolt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;