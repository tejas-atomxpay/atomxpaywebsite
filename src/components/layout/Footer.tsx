import React from 'react';
// import companyName from '../../assets/company_name_new.png';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const Footer: React.FC = () => {
  const { footer } = content;
  const isMobile = useIsMobile();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className={`${isMobile ? 'py-6' : 'py-8'}`}>
          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : 'md:grid-cols-3'
          }`}>
            {/* Column 1: AtomX Pay */}
            <div className={`${isMobile ? 'text-center' : ''}`}>
              <div className={`flex items-center mb-4 ${isMobile ? 'justify-center' : ''}`}>
                {/* <img src={companyName} alt="AtomX Pay" className="h-12 w-12 mr-3" /> */}
                <span className="text-2xl font-bold">{footer.company.name}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {footer.company.description}
              </p>
              <p className="text-gray-400 text-xs">
                {footer.copyright}
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className={`${isMobile ? 'text-center mt-6' : ''}`}>
              <h3 className="text-white font-semibold mb-4 text-lg">{footer.sections[0].title}</h3>
              <ul className="space-y-2">
                {footer.sections[0].links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline cursor-pointer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Address */}
            <div className={`${isMobile ? 'text-center mt-6' : ''}`}>
              <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
              <div className="space-y-4">
                {/* USA Office */}
                <div>
                  <h4 className="text-white font-medium mb-2 text-sm">{footer.contact.usa.title}</h4>
                  <div className="text-gray-300 text-xs space-y-1">
                    <p className="leading-relaxed">{footer.contact.usa.address}</p>
                  </div>
                </div>
                
                {/* India Office */}
                <div>
                  <h4 className="text-white font-medium mb-2 text-sm">{footer.contact.india.title}</h4>
                  <div className="text-gray-300 text-xs space-y-1">
                    <p className="leading-relaxed">{footer.contact.india.address}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section with Email */}
        <div className="border-t border-gray-800 py-4">
          <div className="text-center text-sm">
            For any queries or grievances, please write to us at{" "}
            <a 
              href="mailto:contactus@atomxpay.com" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline"
            >
              contactus@atomxpay.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

