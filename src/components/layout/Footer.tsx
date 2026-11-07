import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, ArrowUpRight } from 'lucide-react';
import Container from '../common/Container';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const Footer: React.FC = () => {
  const { companySettings, publishedCategories } = useWebsiteData();

  return (
    <footer className="bg-[#0F1012] border-t border-[#BFC3C8]/10 text-[#BFC3C8] text-sm">
      {/* Upper footer grid */}
      <div className="py-10 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Column 1: Company Profile */}
            <div className="sm:col-span-2 space-y-4 sm:space-y-5">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B69A69] via-[#8E949C] to-[#17191C] p-[1.5px] shrink-0">
                  <div className="w-full h-full bg-[#17191C] rounded-[7px] flex items-center justify-center">
                    <span className="font-heading font-black text-xl text-[#B69A69]">M</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xl tracking-wider text-[#F5F5F2] leading-none">
                    {companySettings.companyName.replace(/ LLC$/i, '') || 'METALLIX'}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A69] font-semibold mt-1">
                    TRADING LLC
                  </span>
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-[#BFC3C8]/80 leading-relaxed max-w-md">
                Metallix Trading is a UAE-based trading company supplying quality architectural hardware, furniture fittings, building materials, glass fittings, and stainless steel solutions for trade contractors and developers.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#17191C] border border-[#BFC3C8]/15 text-xs text-[#BFC3C8]">
                  <Award className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <span>UAE Market Focus</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#17191C] border border-[#BFC3C8]/15 text-xs text-[#BFC3C8]">
                  <Award className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <span>B2B Commercial Supply</span>
                </div>
              </div>
            </div>

            {/* Column 2: Product Categories */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F5F2]">
                Product Categories
              </h3>
              <ul className="space-y-2 text-xs">
                {publishedCategories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/products?category=${category.slug}`}
                      className="hover:text-[#B69A69] transition-colors flex items-center space-x-1"
                    >
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/products"
                    className="text-[#B69A69] hover:underline font-medium inline-flex items-center pt-1"
                  >
                    View All Categories <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F5F2]">
                Company
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="hover:text-[#B69A69] transition-colors">
                    About Metallix
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className="hover:text-[#B69A69] transition-colors">
                    Brands & Partners
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-[#B69A69] transition-colors">
                    Projects & Applications
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#B69A69] transition-colors">
                    Contact & Quotation
                  </Link>
                </li>
                <li>
                  <Link to="/admin/dashboard" className="hover:text-[#B69A69] transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Facilities */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F5F2]">
                Headquarters
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>{companySettings.address}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <a href={`tel:${companySettings.phone}`} className="hover:text-[#B69A69] transition-colors">
                    {companySettings.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <a href={`mailto:${companySettings.salesEmail}`} className="hover:text-[#B69A69] transition-colors">
                    {companySettings.salesEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom legal & copyright bar */}
      <div className="border-t border-[#BFC3C8]/5 py-6 bg-[#0B0C0E]">
        <Container className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#BFC3C8]/60 space-y-3 sm:space-y-0 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {companySettings.companyName}. Building materials & architectural hardware trading.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <span className="hover:text-[#B69A69] cursor-pointer">Quality Policy</span>
            <span className="hover:text-[#B69A69] cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-[#B69A69] cursor-pointer">Privacy Statement</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
