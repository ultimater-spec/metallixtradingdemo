import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Layers,
  Compass,
  Boxes,
  Truck,
} from 'lucide-react';

export const About: React.FC = () => {
  const MotionDiv: React.ElementType = motion.div;

  const values = [
    {
      title: 'Quality',
      icon: ShieldCheck,
      description: 'Delivering dependable architectural hardware, precision fittings, and building materials sourced to satisfy stringent commercial construction standards.',
    },
    {
      title: 'Reliability',
      icon: Award,
      description: 'Consistently fulfilling regional supply requirements with dependable delivery times, accurate order assembly, and responsive commercial trade support.',
    },
    {
      title: 'Integrity',
      icon: HeartHandshake,
      description: 'Conducting every business interaction with transparency, professional ethics, and authentic technical recommendations for our trading partners.',
    },
    {
      title: 'Customer Commitment',
      icon: Building2,
      description: 'Prioritizing customer satisfaction by aligning product solutions with the specific structural, aesthetic, and budgetary needs of each project.',
    },
  ];

  const whyChoosePillars = [
    {
      title: 'Comprehensive Product Range',
      icon: Boxes,
      description: 'From heavy-duty mortise locks and glass door patch fittings to structural sealants, stainless sheets, and fasteners, our broad portfolio covers multifaceted trade requirements under one roof.',
    },
    {
      title: 'Dedicated Supply Focus',
      icon: Truck,
      description: 'Centrally positioned in the UAE to support ongoing architectural and construction projects with fast turnaround times and streamlined commercial quotation workflows.',
    },
    {
      title: 'Customer-Oriented Approach',
      icon: Compass,
      description: 'Our trade desk works closely with contractors, fabricators, and interior designers, providing tailored item specifications and proactive communication throughout each procurement cycle.',
    },
  ];

  return (
    <PageLayout
      title="About Us | Metallix Trading | Architectural Hardware & Building Materials"
      description="Learn about Metallix Trading, a UAE-based supplier of architectural hardware, furniture fittings, and commercial building materials."
    >
      {/* Section A: Hero */}
      <section className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] flex items-center bg-[#0F1012] border-b border-[#BFC3C8]/10 overflow-hidden">
        {/* Background image with dark architectural overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Metallix Trading Architectural Materials"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/80 to-[#0F1012]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        </div>

        <Container className="relative z-10 py-10 sm:py-16 lg:py-20 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#BFC3C8]">
            <Link to="/" className="hover:text-[#B69A69] transition-colors py-0.5">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <span className="text-[#B69A69] font-medium py-0.5">About Us</span>
          </nav>

          <MotionDiv
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B69A69]/15 border border-[#B69A69]/30 text-[11px] sm:text-xs text-[#B69A69] font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>UAE Building Materials & Hardware Supplier</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
              About Metallix Trading
            </h1>

            <p className="text-lg sm:text-2xl font-heading font-medium text-[#B69A69]">
              Building Trust Through Quality.
            </p>

            <p className="text-sm sm:text-base text-[#BFC3C8] max-w-2xl leading-relaxed">
              Serving the UAE construction, fit-out, and architectural sectors with dependable commercial building products and hardware solutions.
            </p>
          </MotionDiv>
        </Container>
      </section>

      {/* Section B: Company Introduction */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#17191C] border-b border-[#BFC3C8]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B69A69]/15 text-[#B69A69] border border-[#B69A69]/30">
                  Company Introduction
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
                  Your Reliable Partner in Architectural & Building Supplies
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#BFC3C8] leading-relaxed">
                <p>
                  <strong>Metallix Trading</strong> is a UAE-based trading company specializing in the supply of premium architectural hardware, furniture fittings, construction sealants and adhesives, fasteners, power tools, stainless steel materials, handrail systems, glass door fittings, and architectural cladding sheets.
                </p>
                <p>
                  Operating at the intersection of modern design and construction functionality, we cater to contractors, joinery workshops, fabricators, and project developers across the United Arab Emirates. Our trade desk emphasizes dependable supply, clear product specifications, and fair commercial service.
                </p>
              </div>

              {/* Scope Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                {[
                  'Architectural Door & Glass Hardware',
                  'Cabinet Hinges & Furniture Fittings',
                  'Construction Sealants & Adhesives',
                  'Structural Fasteners & Fixings',
                  'Stainless Steel Sheets & Tubes',
                  'Exterior ACP & Cladding Materials',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-[#F5F5F2]">
                    <CheckCircle2 className="w-4 h-4 text-[#B69A69] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4 [&>*]:w-full sm:[&>*]:w-auto [&>*]:justify-center">
                <Button to="/products" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Product Range
                </Button>
                <Button to="/contact" variant="secondary">
                  Contact Our Team
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#23272C] border border-[#BFC3C8]/20 overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural Hardware and Fittings"
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-xl bg-[#17191C]/90 border border-[#BFC3C8]/20 backdrop-blur-md">
                  <div className="text-[11px] sm:text-xs font-semibold text-[#B69A69] uppercase tracking-wider">
                    UAE Trading Focus
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#F5F5F2] font-heading mt-0.5">
                    Architectural Hardware & Commercial Materials
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sections C & D: Vision & Mission */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1012] border-b border-[#BFC3C8]/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-4 hover:border-[#B69A69]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B69A69]/15 border border-[#B69A69]/30 flex items-center justify-center text-[#B69A69]">
                <Compass className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B69A69] font-heading">
                  Future Horizon
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F5F5F2]">
                  Our Vision
                </h2>
              </div>

              <p className="text-base text-[#F5F5F2] font-medium leading-relaxed">
                To become a trusted destination in the UAE for quality building materials and architectural solutions.
              </p>

              <p className="text-xs text-[#BFC3C8] leading-relaxed pt-1">
                We aspire to grow alongside the region’s dynamic construction landscape by consistently expanding our curated catalogue and upholding uncompromising standards for commercial hardware.
              </p>
            </MotionDiv>

            {/* Mission Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-4 hover:border-[#B69A69]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B69A69]/15 border border-[#B69A69]/30 flex items-center justify-center text-[#B69A69]">
                <Layers className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B69A69] font-heading">
                  Core Purpose
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F5F5F2]">
                  Our Mission
                </h2>
              </div>

              <p className="text-base text-[#F5F5F2] font-medium leading-relaxed">
                Focus on quality, reliability, product variety, and customer satisfaction.
              </p>

              <p className="text-xs text-[#BFC3C8] leading-relaxed pt-1">
                We accomplish our mission by maintaining dependable procurement channels, offering comprehensive trade product options, and delivering knowledgeable, efficient service for every customer inquiry.
              </p>
            </MotionDiv>
          </div>
        </Container>
      </section>

      {/* Section E: Our Values */}
      <section className="py-20 bg-[#17191C] border-b border-[#BFC3C8]/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B69A69]/15 text-[#B69A69] border border-[#B69A69]/30">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F5F5F2] tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-[#BFC3C8]">
              The operational cornerstones that guide our customer partnerships and material selections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <MotionDiv
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/15 space-y-3 hover:border-[#B69A69]/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#17191C] border border-[#BFC3C8]/10 flex items-center justify-center text-[#B69A69]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-[#F5F5F2]">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#BFC3C8] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section F: Why Metallix */}
      <section className="py-20 bg-[#0F1012]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B69A69]/15 text-[#B69A69] border border-[#B69A69]/30">
              The Trade Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F5F5F2] tracking-tight">
              Why Partner with Metallix Trading
            </h2>
            <p className="text-sm sm:text-base text-[#BFC3C8]">
              A disciplined combination of verified materials, regional inventory focus, and trade support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoosePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <MotionDiv
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-4 hover:border-[#B69A69]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#23272C] border border-[#BFC3C8]/10 flex items-center justify-center text-[#B69A69]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-[#F5F5F2]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#BFC3C8] leading-relaxed">
                    {pillar.description}
                  </p>
                </MotionDiv>
              );
            })}
          </div>

          {/* Bottom Contact CTA Box */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#17191C] via-[#23272C] to-[#17191C] border border-[#BFC3C8]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F2]">
                Looking for Specific Building Materials?
              </h3>
              <p className="text-xs sm:text-sm text-[#BFC3C8]">
                Reach out to our procurement team with your bill of materials or hardware specifications for a tailored quotation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0 w-full md:w-auto [&>*]:w-full sm:[&>*]:w-auto [&>*]:justify-center">
              <Button to="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Request a Quote
              </Button>
              <Button to="/products" variant="secondary">
                View Catalogue
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default About;
