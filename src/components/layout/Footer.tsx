import React from 'react';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook
};

const Footer: React.FC = () => {
  const { footer } = content;
  const isMobile = useIsMobile();

  return (
    <footer className={`bg-gray-900 text-white ${
      isMobile ? 'py-12' : 'py-16'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`grid gap-8 ${
          isMobile ? 'grid-cols-1 mb-8' : 'md:grid-cols-2 lg:grid-cols-6 mb-12'
        }`}>
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src={logoImage} alt="AtomX Pay" className="h-10 w-10 mr-3" />
              <span className="text-xl font-bold">{footer.company.name}</span>
            </div>
            <p className="text-gray-400 mb-6">
              {footer.company.description}
            </p>
            <div className="flex space-x-4">
              {footer.social.map((social, index) => {
                const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Footer Sections */}
          {footer.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Information */}
        <div className={`grid gap-8 pt-8 border-t border-gray-800 ${
          isMobile ? 'grid-cols-1 mb-8' : 'md:grid-cols-2 mb-12'
        }`}>
          <div>
            <h3 className="font-semibold mb-4">{footer.contact.usa.title}</h3>
            <div className="text-gray-400 space-y-2">
              <p>{footer.contact.usa.address}</p>
              {/* <p>{footer.contact.usa.phone}</p> */}
              <p>{footer.contact.usa.email}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{footer.contact.india.title}</h3>
            <div className="text-gray-400 space-y-2">
              <p>{footer.contact.india.address}</p>
              {/* <p>{footer.contact.india.phone}</p> */}
              <p>{footer.contact.india.email}</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

