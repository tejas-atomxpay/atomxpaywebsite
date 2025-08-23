// Type definitions for AtomX Pay website

export interface ExchangeRateWidgetProps {
  usdAmount: number;
  setUsdAmount: (amount: number) => void;
  exchangeRate: number;
  isLoading?: boolean;
  lastUpdated?: string | null;
}

export interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export interface TestimonialData {
  id: number;
  rating: number;
  text: string;
  author: {
    name: string;
    title: string;
    location: string;
  };
}

export interface FeatureComparisonData {
  feature: string;
  atomxPay: string;
  traditionalBanks: string;
  otherApps: string;
}

export interface NavigationItem {
  label: string;
  sectionId: string;
}

export interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

