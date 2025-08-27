import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import companyName from '../../assets/company_name.png';
import content from '../../data/content.json';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, scrollToTop, activeSection = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const { navigation } = content;

  const handleNavigation = (sectionId: string) => {
    // If we're not on the homepage, navigate there first
    if (router.state.location.pathname !== '/') {
      router.navigate({ to: '/' }).then(() => {
        // Small delay to ensure the page has loaded
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      });
    } else {
      // We're already on homepage, just scroll
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="shadow-sm sticky top-0 z-50 backdrop-blur-md border-b border-white/20" style={{background: 'linear-gradient(135deg, rgba(94, 41, 163, 0.92) 0%, rgba(124, 58, 237, 0.88) 100%)'}}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (router.state.location.pathname !== '/') {
                  router.navigate({ to: '/' });
                } else {
                  scrollToTop();
                }
                setIsMenuOpen(false); // Close mobile menu when logo is clicked
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
              type="button"
              aria-label="Navigate to homepage"
            >
              <img src={companyName} alt="AtomX Pay" className="h-[200px] w-auto" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={`transition-colors font-medium cursor-pointer relative ${
                  activeSection === link.id 
                    ? 'text-white drop-shadow-sm' 
                    : 'text-white/95 hover:text-white drop-shadow-sm'
                }`}
                type="button"
              >
                {link.label}
                {activeSection === link.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 atomx-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
          

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.links.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => {
                    handleNavigation(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left transition-colors font-medium cursor-pointer drop-shadow-sm ${
                    activeSection === link.id 
                      ? 'text-white font-semibold' 
                      : 'text-white/95 hover:text-white'
                  }`}
                  type="button"
                >
                  {link.label}
                  {activeSection === link.id && <span className="ml-2 text-accent">•</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

