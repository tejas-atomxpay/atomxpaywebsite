import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoInitial from '../../assets/logo_initial.png';
import companyName from '../../assets/company_name.png';
import content from '../../data/content.json';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { navigation } = content;

  return (
    <header className="atomx-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <img src={logoInitial} alt="AtomX Pay Initial" className="h-8 w-auto brightness-0 invert" /> */}
            <img src={companyName} alt="AtomX Pay" className="h-[200px] w-auto" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
                type="button"
              >
                {link.label}
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
                  className="text-left text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
                  type="button"
                >
                  {link.label}
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
        )}
      </div>
    </header>
  );
};

export default Header;

