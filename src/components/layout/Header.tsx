import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import content from '../../data/content.json';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { navigation } = content;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoImage} alt="AtomX Pay" className="h-10 w-10 mr-3" />
            <span className="text-xl font-bold atomx-text-primary">{navigation.logo}</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:atomx-text-primary transition-colors"
                type="button"
              >
                {link.label}
              </button>
            ))}
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="atomx-text-primary font-medium hover:underline" type="button">
              {navigation.authButtons.signIn}
            </button>
            <button className="atomx-accent text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity" type="button">
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.links.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:atomx-text-primary"
                  type="button"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t">
                <button className="block w-full text-left atomx-text-primary font-medium mb-2" type="button">
                  {navigation.authButtons.signIn}
                </button>
                <button className="atomx-accent text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity" type="button">
                  {navigation.authButtons.signUp}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

