import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import companyName from '../../assets/company_name.png';
import content from '../../data/content.json';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, activeSection = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { navigation } = content;

  return (
    <header className="atomx-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={companyName} alt="AtomX Pay" className="h-[200px] w-auto" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors font-medium cursor-pointer relative ${
                  activeSection === link.id 
                    ? 'text-white' 
                    : 'text-white/90 hover:text-white'
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
            <button className="text-white/90 hover:text-white font-medium transition-colors cursor-pointer" type="button">
              {navigation.authButtons.signIn}
            </button>
            <button className="bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-all cursor-pointer" type="button">
              {navigation.authButtons.signUp}
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
                  className={`text-left transition-colors font-medium cursor-pointer ${
                    activeSection === link.id 
                      ? 'text-white font-semibold' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  type="button"
                >
                  {link.label}
                  {activeSection === link.id && <span className="ml-2 text-orange-400">•</span>}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="block w-full text-left text-white/90 hover:text-white font-medium mb-2 transition-colors cursor-pointer" type="button">
                  {navigation.authButtons.signIn}
                </button>
                <button className="bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-all w-full text-center cursor-pointer" type="button">
                  {navigation.authButtons.signUp}
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

