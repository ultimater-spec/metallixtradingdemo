import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  hideFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'Metallix Trading | UAE Architectural Hardware & Building Materials',
  description = 'UAE supplier and distributor of architectural hardware, furniture fittings, stainless steel, tools, and construction materials.',
  hideFooter = false,
}) => {
  return (
    <div className="min-h-screen bg-[#17191C] text-[#F5F5F2] flex flex-col justify-between selection:bg-[#B69A69] selection:text-[#17191C] overflow-x-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Navbar />

      <main className="flex-1 w-full min-w-0">
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;

