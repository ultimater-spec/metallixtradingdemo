import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall, ShieldCheck, FileText } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const location = useLocation();
  const { companySettings, publishedCategories } = useWebsiteData();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products', isDropdown: true },
    { label: 'Brands', path: '/brands' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#17191C]/95 backdrop-blur-md border-b border-[#BFC3C8]/10 transition-all">
      {/* Top micro bar for corporate trust */}
      <div className="bg-[#0F1012] text-xs text-[#BFC3C8] border-b border-[#BFC3C8]/5 py-1.5 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>UAE Market Focus • Architectural Hardware & Building Materials</span>
            </span>
            <span>{companySettings.workingHours}</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/contact"
              className="flex items-center space-x-1.5 hover:text-[#B69A69] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#B69A69]" />
              <span>Direct Inquiries: {companySettings.phone}</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-[#BFC3C8]/70 hover:text-[#B69A69] transition-colors text-[11px] uppercase tracking-wider font-semibold"
            >
              Client / Admin Portal
            </Link>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <nav aria-label="Main Navigation">
        <Container className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#B69A69] via-[#8E949C] to-[#17191C] p-[1.5px] shadow-lg shadow-[#B69A69]/10 shrink-0">
              <div className="w-full h-full bg-[#17191C] rounded-[7px] flex items-center justify-center">
                <span className="font-heading font-black text-lg sm:text-xl text-[#B69A69] group-hover:scale-105 transition-transform">
                  M
                </span>
              </div>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-[#F5F5F2] leading-none truncate">
                {companySettings.companyName.replace(/ LLC$/i, '') || 'METALLIX'}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B69A69] font-semibold mt-1">
                TRADING LLC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              if (item.isDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-1 transition-colors ${
                        isActive(item.path)
                          ? 'text-[#B69A69]'
                          : 'text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C]/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsOpen ? 'rotate-180 text-[#B69A69]' : ''
                        }`}
                      />
                    </Link>

                    {/* Products Mega Dropdown */}
                    {productsOpen && (
                      <div className="absolute top-full left-0 w-80 bg-[#17191C] border border-[#BFC3C8]/15 rounded-xl shadow-2xl p-3 py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B69A69] px-3 py-1.5 border-b border-[#BFC3C8]/10 mb-1">
                          Product Categories
                        </div>
                        {publishedCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.slug}`}
                            onClick={() => setProductsOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-[#23272C] transition-colors group"
                          >
                            <div className="text-sm font-medium text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-xs text-[#BFC3C8]/70 line-clamp-1">
                              {cat.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-[#B69A69]'
                      : 'text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C]/40'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Request Quote Button */}
          <div className="flex items-center space-x-3">
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              icon={<FileText className="w-4 h-4" />}
              className="hidden sm:inline-flex"
            >
              Request Quote
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C] focus:outline-none focus:ring-2 focus:ring-[#B69A69] cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#BFC3C8]/10 bg-[#17191C] px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map((item) => (
              <div key={item.label} className="space-y-1">
                {item.isDropdown ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex-1 px-3 py-3 rounded-lg text-base font-medium min-h-[44px] flex items-center ${
                          isActive(item.path)
                            ? 'bg-[#B69A69]/15 text-[#B69A69]'
                            : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C] cursor-pointer"
                        aria-label="Toggle product categories"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileCategoriesOpen ? 'rotate-180 text-[#B69A69]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileCategoriesOpen && (
                      <div className="pl-3 pr-1 py-1 space-y-1 bg-[#0F1012]/60 rounded-xl my-1 border border-[#BFC3C8]/10">
                        {publishedCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.slug}`}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileCategoriesOpen(false);
                            }}
                            className="block px-3 py-2.5 rounded-lg text-xs font-medium text-[#BFC3C8] hover:text-[#B69A69] hover:bg-[#23272C] transition-colors min-h-[40px] flex items-center"
                          >
                            <span className="text-[#B69A69] mr-2">•</span>
                            <span>{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-medium min-h-[44px] flex items-center ${
                      isActive(item.path)
                        ? 'bg-[#B69A69]/15 text-[#B69A69]'
                        : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-[#BFC3C8]/10 flex flex-col space-y-3">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center min-h-[44px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Quick Quote
              </Button>
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs text-[#BFC3C8]/60 hover:text-[#B69A69] py-2 min-h-[40px] flex items-center justify-center"
              >
                Go to Admin Portal →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
