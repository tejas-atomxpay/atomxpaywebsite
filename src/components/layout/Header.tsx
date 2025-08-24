import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import companyName from '../../assets/company_name.png';
import content from '../../data/content.json';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, scrollToTop, activeSection = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { navigation } = content;

  return (
    <header className="shadow-sm sticky top-0 z-50 backdrop-blur-md border-b border-white/20" style={{background: 'linear-gradient(135deg, rgba(94, 41, 163, 0.92) 0%, rgba(124, 58, 237, 0.88) 100%)'}}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                scrollToTop();
                setIsMenuOpen(false); // Close mobile menu when logo is clicked
              }}
              className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
              type="button"
              aria-label="Scroll to top"
            >
              <img src={companyName} alt="AtomX Pay" className="h-[200px] w-auto" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
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
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white/95 hover:text-white font-medium transition-colors cursor-pointer drop-shadow-sm" type="button">
              {navigation.authButtons.signIn}
            </button>
            <button className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-white/90 transition-all cursor-pointer hover-lift font-technical btn-gooey relative overflow-hidden group" type="button" style={{filter: 'url(#atomx-glow)'}}>
              <span className="relative z-10">{navigation.authButtons.signUp}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
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
                    scrollToSection(link.id);
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
              <div className="pt-4 border-t border-white/10">
                <button className="block w-full text-left text-white/95 hover:text-white font-medium mb-2 transition-colors cursor-pointer drop-shadow-sm" type="button">
                  {navigation.authButtons.signIn}
                </button>
                <button className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-white/90 transition-all w-full text-center cursor-pointer hover-lift font-technical btn-gooey relative overflow-hidden group" type="button">
                  <span className="relative z-10">{navigation.authButtons.signUp}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

