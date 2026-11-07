import { NavigationItem } from '../types';

export const mainNavItems: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'Architectural Hardware', path: '/products?category=architectural-hardware', description: 'Door locks, handles, hinges & security hardware' },
      { label: 'Furniture Fittings', path: '/products?category=furniture-fittings', description: 'Cabinet hinges, drawer runners & joinery fittings' },
      { label: 'Sealant & Adhesive', path: '/products?category=sealant-adhesive', description: 'Structural silicones, PU sealants & industrial bonding' },
      { label: 'Screws, Nails & Fittings', path: '/products?category=screws-nails-fittings', description: 'Self-drilling screws, expansion anchors & fixtures' },
      { label: 'Power Tools', path: '/products?category=power-tools', description: 'Industrial rotary hammers, drills & cutting tools' },
      { label: 'Hand Tools', path: '/products?category=hand-tools', description: 'Precision levels, sealant guns & trade essentials' },
      { label: 'Stainless Steel', path: '/products?category=stainless-steel', description: 'Decorative sheets, tubes, flat bars & custom profiles' },
      { label: 'Hand Rail', path: '/products?category=hand-rail', description: 'Glass spigots, balustrade clamps & handrail brackets' },
      { label: 'Glass Door Fittings', path: '/products?category=glass-door-fittings', description: 'Patch fittings, floor springs & architectural glass handles' },
      { label: 'Cladding Sheets', path: '/products?category=cladding-sheets', description: 'Aluminium composite panels (ACP) & facade sheets' },
    ],
  },
  { label: 'Brands', path: '/brands' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export const adminNavItems: NavigationItem[] = [
  { label: 'Overview', path: '/admin/dashboard' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Enquiries & Quotes', path: '/admin/enquiries' },
];

export const companyContactInfo = {
  address: 'United Arab Emirates (Inquire for warehouse / showroom location)',
  phone: 'Contact via enquiry form or WhatsApp',
  email: 'info@metallixtrading.com',
  salesEmail: 'sales@metallixtrading.com',
  workingHours: 'Mon - Fri: 08:00 - 18:00 (GST)',
  whatsAppPlaceholder: '+971 50 000 0000', // Configurable placeholder as required
};
