// Type definitions for AtomX Pay website

export interface CurrencyPair {
  from: string;
  to: string;
  fromSymbol: string;
  toSymbol: string;
  apiPair: string;
}

export interface ExchangeRateWidgetProps {
  fromAmount: number;
  setFromAmount: (amount: number) => void;
  exchangeRate: number;
  isLoading?: boolean;
  lastUpdated?: string | null;
  currentPair?: CurrencyPair;
  onPairChange?: (pair: CurrencyPair) => void;
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

