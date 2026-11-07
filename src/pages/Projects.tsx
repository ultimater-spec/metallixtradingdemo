import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Project } from '../types';
import {
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Layers,
  Building2,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { publishedProjects } = useWebsiteData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxProject, setActiveLightboxProject] = useState<Project | null>(null);
  const MotionDiv: React.ElementType = motion.div;

  const categories = [
    'All Applications',
    'Architectural Applications',
    'Glass & Hardware',
    'Interior Fittings',
    'Building Materials',
  ];

  const filteredProjects = publishedProjects.filter((item) => {
    if (activeCategory === 'all' || activeCategory === 'All Applications') {
      return true;
    }
    return item.category === activeCategory;
  });

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeLightboxProject) {
        setActiveLightboxProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxProject]);

  return (
    <PageLayout
      title="Projects & Applications | Metallix Trading"
      description="Explore architectural, glass hardware, interior joinery, and building material applications."
    >
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#0F1012] via-[#17191C] to-[#17191C] border-b border-[#BFC3C8]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container className="relative z-10 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#BFC3C8]">
            <Link to="/" className="hover:text-[#B69A69] transition-colors py-0.5">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <span className="text-[#B69A69] font-medium py-0.5">Projects & Applications</span>
          </nav>

          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B69A69]/15 border border-[#B69A69]/30 text-[11px] sm:text-xs text-[#B69A69] font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Architectural Applications Showcase</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
              Projects & Applications
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#BFC3C8] leading-relaxed">
              Explore how architectural hardware, precision glass fittings, and commercial building materials integrate across diverse building envelopes and interior spaces.
            </p>
          </div>

          {/* Important Demonstration Notice */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#23272C]/70 border border-[#BFC3C8]/15 flex items-start space-x-2.5 sm:space-x-3 text-xs text-[#BFC3C8] max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> Images and case applications in this gallery represent illustrative visuals of typical building hardware installations and material implementations. They do not claim verified Metallix project ownership.
            </span>
          </div>
        </Container>
      </section>

      {/* Main Gallery Section */}
      <section className="py-8 sm:py-12 bg-[#17191C]">
        <Container className="space-y-6 sm:space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#BFC3C8]/10">
            {categories.map((cat) => {
              const isSelected =
                (cat === 'All Applications' && activeCategory === 'all') ||
                activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat === 'All Applications' ? 'all' : cat)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] flex items-center ${
                    isSelected
                      ? 'bg-[#B69A69] text-[#17191C] shadow-md shadow-[#B69A69]/10'
                      : 'bg-[#23272C]/50 text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2] border border-[#BFC3C8]/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => (
              <MotionDiv
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#23272C]/30 border border-[#BFC3C8]/15 overflow-hidden hover:border-[#B69A69]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B69A69]/5"
              >
                {/* Image Container with Clickable Lightbox Trigger */}
                <div
                  onClick={() => setActiveLightboxProject(project)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#17191C] cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-[#17191C]/90 text-[#B69A69] border border-[#B69A69]/30 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Demo Visual Indicator */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-medium bg-[#0F1012]/80 text-[#BFC3C8] border border-[#BFC3C8]/20 backdrop-blur-md">
                      Demo Visual
                    </span>
                  </div>

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F1012]/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#B69A69] text-[#17191C] text-xs font-semibold shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Showcase</span>
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {project.sector && (
                      <div className="text-[11px] font-semibold text-[#B69A69] flex items-center space-x-1">
                        <Building2 className="w-3 h-3" />
                        <span>{project.sector}</span>
                      </div>
                    )}
                    <h3
                      onClick={() => setActiveLightboxProject(project)}
                      className="text-lg font-bold font-heading text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#BFC3C8] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Materials Chips */}
                  {project.materialsSupplied && (
                    <div className="pt-3 border-t border-[#BFC3C8]/10 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#BFC3C8]/60">
                        Applicable Materials
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.materialsSupplied.map((mat, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-[#17191C] text-[#BFC3C8] border border-[#BFC3C8]/15"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* Bottom Inquiries CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#17191C] via-[#23272C] to-[#17191C] border border-[#BFC3C8]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F2]">
                Need Materials for an Upcoming Project?
              </h3>
              <p className="text-xs sm:text-sm text-[#BFC3C8]">
                Share your architectural schedule or hardware specifications with our UAE sales engineers.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <Button to="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Submit Project RFQ
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxProject(null)}
              className="fixed inset-0 bg-[#0F1012]/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#17191C] border border-[#BFC3C8]/20 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#BFC3C8]/10 bg-[#23272C]/40 shrink-0">
                <div className="flex items-center space-x-2 text-xs text-[#BFC3C8] truncate">
                  <span className="px-2.5 py-0.5 rounded bg-[#B69A69]/15 text-[#B69A69] font-semibold border border-[#B69A69]/30">
                    {activeLightboxProject.category}
                  </span>
                  <span>•</span>
                  <span className="truncate">Illustrative Demo Visual</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLightboxProject(null)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C] transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-1">
                {/* Image Frame */}
                <div className="relative aspect-[16/9] w-full bg-[#0F1012] overflow-hidden">
                  <img
                    src={activeLightboxProject.image}
                    alt={activeLightboxProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#B69A69]">
                      {activeLightboxProject.sector}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F2]">
                      {activeLightboxProject.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#BFC3C8] leading-relaxed">
                    {activeLightboxProject.description}
                  </p>

                  {activeLightboxProject.materialsSupplied && (
                    <div className="space-y-2 pt-2 border-t border-[#BFC3C8]/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F2] flex items-center space-x-1.5 font-heading">
                        <Layers className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>Associated Building Materials</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeLightboxProject.materialsSupplied.map((m, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg text-xs bg-[#23272C] text-[#F5F5F2] border border-[#BFC3C8]/15"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-[#23272C]/40 border border-[#BFC3C8]/15 flex items-start space-x-2.5 text-xs text-[#BFC3C8]">
                    <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demonstration Showcase:</strong> This case study illustrates architectural application scope and material selection for commercial projects.
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 xs:space-x-3 [&>*]:w-full xs:[&>*]:w-auto [&>*]:justify-center">
                    <Button variant="ghost" size="sm" onClick={() => setActiveLightboxProject(null)}>
                      Close
                    </Button>
                    <Button to="/contact" variant="primary" size="sm">
                      Inquire for Similar Project
                    </Button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Projects;
