import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import AboutSection from '../components/home/AboutSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import BrandsSection from '../components/home/BrandsSection';
import ProjectsSection from '../components/home/ProjectsSection';
import ContactCTA from '../components/home/ContactCTA';

export const Home: React.FC = () => {
  return (
    <PageLayout
      title="Metallix Trading | UAE Architectural Hardware & Building Materials"
      description="Leading UAE supplier and distributor of architectural hardware, furniture fittings, stainless steel, glass door systems, tools, and construction materials."
    >
      <Hero />
      <TrustBar />
      <CategorySection />
      <AboutSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <BrandsSection />
      <ProjectsSection />
      <ContactCTA />
    </PageLayout>
  );
};

export default Home;

