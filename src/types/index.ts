export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  productCount: number;
  featured?: boolean;
  isPublished?: boolean;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Product {
  id: string; // Unique demo product ID (e.g. DEMO-AH-001)
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  image: string;
  shortDescription: string;
  description: string;
  availability: 'Enquiry required' | string;
  grade?: string;
  forms?: string[];
  dimensions?: string;
  finish?: string;
  applications?: string[];
  isFeatured?: boolean;
  specifications: Record<string, string>;
  isDemo?: boolean;
  isPublished?: boolean;
  referenceNumber?: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  children?: { label: string; path: string; description?: string }[];
}

export interface Brand {
  id: string;
  name: string;
  origin?: string;
  tagline?: string;
  description: string;
  categories: string[];
  logo?: string;
  isDemoPlaceholder?: boolean;
  isPublished?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Architectural Applications' | 'Glass & Hardware' | 'Interior Fittings' | 'Building Materials' | string;
  description: string;
  image: string;
  sector?: string;
  materialsSupplied?: string[];
  isDemoVisual?: boolean;
  isPublished?: boolean;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Pending' | 'In Review' | 'Quoted' | 'Closed';

export interface Enquiry {
  id: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  productName: string;
  productId?: string;
  quantity?: string;
  message?: string;
  status: EnquiryStatus;
  date: string;
  notes?: string;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  productName: string;
  productId?: string;
  message: string;
}

export interface HomepageSettings {
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroBgImage: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  aboutBadge: string;
  aboutHeading: string;
  aboutDescription: string;
  contactCtaBadge: string;
  contactCtaHeading: string;
  contactCtaDescription: string;
}

export interface CompanySettings {
  companyName: string;
  email: string;
  salesEmail: string;
  phone: string;
  whatsApp: string;
  address: string;
  website: string;
  workingHours: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
