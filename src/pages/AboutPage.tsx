// ============================================================
// KumariNest — AboutPage
// Brand story & Nagercoil market overview
// ============================================================

import { Link } from 'react-router-dom';
import { NAGERCOIL_LANDMARKS } from '@/data/properties';
import { MapPin, Train, GraduationCap, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';

const VALUES = [
  {
    title: 'Verified Listings Only',
    description:
      'Every property listed on KumariNest undergoes title deed verification, encumbrance check and physical site inspection by our field team.',
    icon: ShieldCheck,
  },
  {
    title: 'Deep Local Knowledge',
    description:
      'Our advisors are Nagercoil natives with decades of combined experience in the Kanyakumari District property market.',
    icon: MapPin,
  },
  {
    title: 'Transparent Pricing',
    description:
      'No hidden charges, no inflated valuations. We present fair market prices with comparable neighbourhood analysis.',
    icon: Landmark,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-estate-offwhite">
      {/* Hero */}
      <section className="bg-estate-charcoal text-white pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-full">
          <nav className="flex items-center gap-2 text-xs text-estate-stone/60 mb-4 font-sans">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-3xl md:text-5xl text-white mb-3">
            About KumariNest
          </h1>
          <p className="text-estate-stone/70 text-base max-w-xl font-sans">
            Nagercoil's trusted property platform — connecting families with
            verified homes across Kanyakumari District since 2011.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
              alt="Modern architectural interior"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="label-sm text-estate-grey mb-4">OUR STORY</p>
            <h2 className="text-3xl md:text-4xl text-estate-charcoal mb-8 leading-tight">
              Built for Nagercoil,
              <br />
              by Nagercoil
            </h2>
            <p className="text-estate-grey text-base leading-relaxed mb-5">
              KumariNest was founded with a simple belief: buying a home in
              Kanyakumari District should be a confident, well-informed decision.
              Too many families were navigating an opaque market with unreliable
              listings, inflated prices and unclear title documentation.
            </p>
            <p className="text-estate-grey text-base leading-relaxed mb-5">
              We set out to change that. Our team of experienced property
              advisors personally verifies every listing — checking title deeds,
              encumbrance certificates and conducting on-ground inspections
              before a property appears on our platform.
            </p>
            <p className="text-estate-grey text-base leading-relaxed mb-8">
              Today, KumariNest serves buyers, sellers and investors across 15+
              Nagercoil localities — from established neighbourhoods like N.G.O
              Colony and Vadasery to emerging areas like Ozhuginasery and
              Therakalputhoor. We provide end-to-end support, from your first
              enquiry through to registration at the Sub-Registrar's office.
            </p>

            {/* Stats */}
            <div className="flex items-start gap-10 md:gap-14 pt-8 border-t border-estate-stone/40">
              {[
                { value: '200+', label: 'Properties Listed' },
                { value: '15+', label: 'Years Experience' },
                { value: '500+', label: 'Families Served' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif text-2xl md:text-3xl text-estate-charcoal block mb-1">
                    {stat.value}
                  </span>
                  <span className="label-xs text-estate-grey">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-estate-ivory py-16 md:py-24 border-t border-estate-stone/40">
        <div className="container-full">
          <div className="text-center mb-14">
            <p className="label-sm mb-3">OUR VALUES</p>
            <h2 className="text-3xl md:text-4xl text-estate-charcoal">
              What Makes Us Different
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-5 bg-estate-forest/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-estate-forest" />
                  </div>
                  <h3 className="font-sans font-semibold text-base text-estate-charcoal mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-estate-grey leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nagercoil Landmarks */}
      <section className="container-full py-16 md:py-24">
        <div className="mb-14">
          <p className="label-sm mb-3">NAGERCOIL & KANYAKUMARI</p>
          <h2 className="text-3xl md:text-4xl text-estate-charcoal mb-4">
            Why Nagercoil?
          </h2>
          <p className="text-base text-estate-grey max-w-2xl leading-relaxed">
            As the administrative capital of Kanyakumari District, Nagercoil
            combines southern Tamil Nadu's lush green landscape with modern
            infrastructure, affordable living and proximity to the iconic
            Kanyakumari cape. Property values here offer excellent long-term
            appreciation with significantly lower entry points than metros.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-estate-stone/40">
          {NAGERCOIL_LANDMARKS.map((lm) => (
            <div
              key={lm.name}
              className="bg-white px-6 py-6"
            >
              <span className="text-xs font-mono text-estate-forest font-semibold block mb-2">
                {lm.distance}
              </span>
              <h4 className="font-sans font-medium text-sm text-estate-charcoal mb-1">
                {lm.name}
              </h4>
              <p className="text-xs text-estate-grey">{lm.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-estate-forest text-white py-14 md:py-20">
        <div className="container-full text-center">
          <h2 className="text-2xl md:text-3xl text-white mb-7">
            Ready to explore properties in Nagercoil?
          </h2>
          <Link to="/properties" className="btn-dark inline-flex items-center gap-2">
            Browse All Listings
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
