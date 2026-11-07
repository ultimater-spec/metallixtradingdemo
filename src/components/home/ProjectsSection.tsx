import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { ArrowRight, Layers, Building2 } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const ProjectsSection: React.FC = () => {
  const { publishedProjects } = useWebsiteData();
  const displayProjects = publishedProjects.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1012] border-b border-[#BFC3C8]/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <SectionHeading
            badge="Project Applications"
            title="Architectural & Commercial Applications"
            subtitle="Explore how our hardware, fittings, sealants, and metal solutions are applied in modern construction and joinery."
          />
          <Button to="/projects" variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
            View All Applications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#17191C] border border-[#BFC3C8]/10 overflow-hidden hover:border-[#B69A69]/40 transition-all flex flex-col justify-between group"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#23272C]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider text-[#B69A69] uppercase bg-[#17191C]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#B69A69]/20">
                  Demo Visual
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-medium text-[#F5F5F2] bg-[#23272C]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#BFC3C8]/10 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>{proj.category}</span>
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#B69A69] uppercase tracking-wider">
                    {proj.sector}
                  </span>
                  <h3 className="text-base font-bold font-heading text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#BFC3C8]/80 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {proj.materialsSupplied && proj.materialsSupplied.length > 0 && (
                  <div className="pt-3 sm:pt-4 border-t border-[#BFC3C8]/10">
                    <div className="text-[11px] text-[#BFC3C8]/60 mb-2 flex items-center space-x-1">
                      <Layers className="w-3 h-3 text-[#B69A69]" />
                      <span>Materials & Fittings:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.materialsSupplied.map((mat, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#23272C] text-[#BFC3C8] px-2 py-0.5 rounded border border-[#BFC3C8]/10"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <Link
                  to="/projects"
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#23272C]/50 hover:bg-[#B69A69] text-xs font-semibold text-[#F5F5F2] hover:text-[#17191C] border border-[#BFC3C8]/10 hover:border-[#B69A69] transition-all min-h-[44px]"
                >
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSection;

