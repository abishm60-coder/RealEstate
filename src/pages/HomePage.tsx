// ============================================================
// KumariNest — HomePage
// Premium editorial layout for Nagercoil real estate
// ============================================================

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatPrice, getPropertySpecs } from '@/lib/utils';
import { agents, PROPERTY_TYPES, BUDGET_RANGES, NAGERCOIL_LANDMARKS } from '@/data/properties';
import { Search, ArrowRight, ChevronRight, MapPin, Compass } from 'lucide-react';
import type { Property } from '@/data/properties';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

// ────────────────────────────────────────────────────────────
// Hero Section
// ────────────────────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  const [location] = useState('Nagercoil');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  function handleSearch() {
    const params = new URLSearchParams();
    if (propertyType) params.set('type', propertyType);
    if (budget) params.set('budget', budget);
    navigate(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
        alt="Architectural photograph of a modern residence"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.20) 100%)',
        }}
      />

      {/* Content — bottom left aligned */}
      <div className="relative z-10 h-full flex flex-col justify-end container-full pb-16 md:pb-20">
        <p className="label-sm text-white/70 mb-4">
          NAGERCOIL · KANYAKUMARI DISTRICT
        </p>

        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.08] mb-5">
          Find Your Place
          <br />
          in Nagercoil
        </h1>

        <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
          Curated residential properties across Kanyakumari's most desirable
          neighbourhoods.
        </p>

        {/* Integrated search bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-px bg-white/10 backdrop-blur-sm max-w-3xl">
          {/* Location */}
          <div className="flex-1 min-w-0 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="label-xs text-white/50 block mb-1">Location</span>
            <input
              type="text"
              value={location}
              readOnly
              className="bg-transparent text-white text-sm font-sans w-full outline-none placeholder:text-white/40"
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 min-w-0 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="label-xs text-white/50 block mb-1">
              Property Type
            </span>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-transparent text-white text-sm font-sans w-full outline-none appearance-none cursor-pointer"
            >
              <option value="" className="text-estate-charcoal">
                Any Type
              </option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type} className="text-estate-charcoal">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex-1 min-w-0 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="label-xs text-white/50 block mb-1">Budget</span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent text-white text-sm font-sans w-full outline-none appearance-none cursor-pointer"
            >
              <option value="" className="text-estate-charcoal">
                Any Budget
              </option>
              {BUDGET_RANGES.map((range) => (
                <option
                  key={range.label}
                  value={range.label}
                  className="text-estate-charcoal"
                >
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <button onClick={handleSearch} className="btn-primary flex-shrink-0 gap-2">
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Property Card (shared by multiple sections)
// ────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property: Property;
  imageAspect?: string;
  orientation?: 'vertical' | 'horizontal';
}

function PropertyCard({
  property,
  imageAspect = 'aspect-[4/3]',
  orientation = 'vertical',
}: PropertyCardProps) {
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];
  const specs = getPropertySpecs(property);

  if (orientation === 'horizontal') {
    return (
      <Link
        to={`/properties/${property.slug}`}
        className="group grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-estate-stone/40"
      >
        {/* Image — 2/5 */}
        <div className="md:col-span-2 img-zoom bg-estate-stone/20">
          <img
            src={primaryImage?.url || FALLBACK_IMG}
            alt={primaryImage?.alt || property.title}
            className="w-full aspect-[16/10] md:aspect-auto md:h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>

        {/* Content — 3/5 */}
        <div className="md:col-span-3 flex flex-col justify-center px-6 md:px-10 py-6 md:py-8">
          <div className="flex items-center gap-2 mb-2">
            {property.isVerified && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            )}
            <span className="label-xs">{property.locality}</span>
          </div>
          <h3 className="font-sans font-medium text-lg md:text-xl text-estate-charcoal mb-2 group-hover:text-estate-forest transition-colors duration-200">
            {property.title}
          </h3>
          <p className="text-sm text-estate-grey mb-4 max-w-md leading-relaxed">
            {property.shortDescription}
          </p>
          <div className="flex items-center gap-4">
            <span className="price-display text-lg">
              {formatPrice(property.price)}
            </span>
            {specs && (
              <span className="text-sm text-estate-grey">{specs}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group block border-b border-estate-stone/40 pb-5"
    >
      <div className={`img-zoom ${imageAspect} mb-4 bg-estate-stone/20`}>
        <img
          src={primaryImage?.url || FALLBACK_IMG}
          alt={primaryImage?.alt || property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        {property.isVerified && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
        )}
        <span className="label-xs">{property.locality}</span>
      </div>
      <h3 className="font-sans font-medium text-base text-estate-charcoal mb-1 group-hover:text-estate-forest transition-colors duration-200">
        {property.title}
      </h3>
      <span className="price-display text-base block mb-1">
        {formatPrice(property.price)}
      </span>
      {specs && (
        <span className="text-sm text-estate-grey">{specs}</span>
      )}
    </Link>
  );
}

// ────────────────────────────────────────────────────────────
// Section 2: Featured Properties — Editorial Grid
// ────────────────────────────────────────────────────────────

function FeaturedSection() {
  const { getFeaturedProperties } = useProperties();
  const featured = useMemo(
    () => getFeaturedProperties().slice(0, 6),
    [getFeaturedProperties]
  );

  if (featured.length === 0) return null;

  return (
    <section className="bg-estate-offwhite section-padding">
      <div className="container-full">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="label-sm mb-3">FEATURED LISTINGS</p>
            <h2 className="text-3xl md:text-4xl text-estate-charcoal">
              Selected Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-sans font-medium text-estate-grey hover:text-estate-charcoal transition-colors duration-200"
          >
            View All Properties
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Row 1 — Asymmetric 7/5 split */}
        {featured.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="md:col-span-7">
              <PropertyCard
                property={featured[0]}
                imageAspect="aspect-[4/3]"
              />
            </div>
            <div className="md:col-span-5">
              <PropertyCard
                property={featured[1]}
                imageAspect="aspect-square"
              />
            </div>
          </div>
        )}

        {/* Row 2 — Three equal columns */}
        {featured.length >= 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {featured.slice(2, 5).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                imageAspect="aspect-[4/3]"
              />
            ))}
          </div>
        )}

        {/* Row 3 — Full-width horizontal card */}
        {featured.length >= 6 && (
          <PropertyCard
            property={featured[5]}
            orientation="horizontal"
          />
        )}

        {/* Mobile "View All" link */}
        <div className="mt-10 md:hidden text-center">
          <Link to="/properties" className="btn-secondary">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 3: Locality Showcase
// ────────────────────────────────────────────────────────────

const SHOWCASE_LOCALITIES = [
  'N.G.O Colony',
  'Weavers Colony',
  'Vetturnimadam',
  'Kottar',
  'Manavilai',
  'Therakalputhoor',
  'Vadasery',
  'Asaripallam',
  'Ozhuginasery',
  'Nesamony Nagar',
];

function LocalitySection() {
  const { getActiveProperties } = useProperties();
  const activeProperties = useMemo(
    () => getActiveProperties(),
    [getActiveProperties]
  );

  // Count properties per locality
  const localityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    activeProperties.forEach((p) => {
      counts[p.locality] = (counts[p.locality] || 0) + 1;
    });
    return counts;
  }, [activeProperties]);

  // Only show localities that have at least 1 property
  const localities = SHOWCASE_LOCALITIES.filter(
    (loc) => (localityCounts[loc] || 0) > 0
  );

  return (
    <section id="localities" className="bg-estate-ivory section-padding">
      <div className="container-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl text-estate-charcoal mb-6 leading-tight">
              Discover Nagercoil's
              <br />
              Finest Localities
            </h2>
            <p className="text-estate-grey text-base leading-relaxed mb-8">
              As the district headquarters of Kanyakumari, Nagercoil offers a
              unique blend of southern Tamil Nadu's lush green landscape and
              proximity to the iconic Kanyakumari cape. With a rapidly growing
              real estate market, well-connected infrastructure and a pleasant
              year-round climate, the city has become one of Tamil Nadu's most
              promising residential destinations.
            </p>
            <div>
              <Link to="/properties" className="btn-secondary">
                Explore All Properties
              </Link>
            </div>
          </div>

          {/* Right column — locality grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-estate-stone/40">
              {localities.map((locality) => (
                <Link
                  key={locality}
                  to={`/properties?locality=${encodeURIComponent(locality)}`}
                  className="bg-estate-ivory hover:bg-estate-stone-light px-5 py-5 transition-colors duration-200 group"
                >
                  <span className="font-sans font-medium text-sm text-estate-charcoal group-hover:text-estate-forest transition-colors duration-200 block mb-1">
                    {locality}
                  </span>
                  <span className="text-sm text-estate-grey">
                    {localityCounts[locality]}{' '}
                    {localityCounts[locality] === 1 ? 'property' : 'properties'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 3b: Regional Connectivity & Landmarks
// ────────────────────────────────────────────────────────────

function RegionalLandmarksSection() {
  return (
    <section className="bg-estate-offwhite section-padding-sm border-y border-estate-stone/40">
      <div className="container-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="label-sm mb-2">REGIONAL ADVANTAGE</p>
            <h3 className="text-2xl md:text-3xl text-estate-charcoal font-serif">
              Connectivity & Landmarks of Kanyakumari
            </h3>
          </div>
          <p className="text-xs text-estate-grey max-w-md font-sans">
            Centrally situated between the Western Ghats and the Indian Ocean coastline, Nagercoil offers unmatched regional connectivity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {NAGERCOIL_LANDMARKS.map((lm) => (
            <div
              key={lm.name}
              className="bg-white p-5 border border-estate-stone/40 hover:border-estate-charcoal/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase bg-estate-forest/10 text-estate-forest px-2 py-0.5 font-semibold">
                  {lm.distance}
                </span>
                <Compass className="w-3.5 h-3.5 text-estate-grey/50" />
              </div>
              <h4 className="font-sans font-medium text-sm text-estate-charcoal mb-1">
                {lm.name}
              </h4>
              <p className="text-xs text-estate-grey leading-relaxed">
                {lm.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 4: About / Brand Story
// ────────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [
    { value: '200+', label: 'Properties Listed' },
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Families Served' },
  ];

  return (
    <section id="about" className="bg-estate-charcoal text-white section-padding">
      <div className="container-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
              alt="Modern architectural interior"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>

          {/* Right — copy */}
          <div className="flex flex-col justify-center">
            <p className="label-sm text-estate-grey mb-4">ABOUT KUMARINEST</p>

            <h2 className="text-3xl md:text-4xl text-white mb-8 leading-tight">
              Nagercoil's Trusted
              <br />
              Property Partner
            </h2>

            <p className="text-white/70 text-base leading-relaxed mb-5">
              KumariNest is a dedicated real estate platform serving Nagercoil
              and the wider Kanyakumari District. Built on deep knowledge of the
              local market, we connect buyers with verified residential
              properties — from independent houses in established
              neighbourhoods to premium villas and plots in emerging localities.
            </p>

            <p className="text-white/70 text-base leading-relaxed mb-12">
              Every listing on our platform is professionally vetted. Our team of
              experienced property advisors provides honest guidance, transparent
              pricing and end-to-end support — from your first enquiry through
              to registration. We believe finding a home in Nagercoil should be a
              confident, well-informed decision.
            </p>

            {/* Stats row */}
            <div className="flex items-start gap-10 md:gap-14 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif text-2xl md:text-3xl text-white block mb-1">
                    {stat.value}
                  </span>
                  <span className="label-xs text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 5: Agents / Team Preview
// ────────────────────────────────────────────────────────────

function AgentsSection() {
  return (
    <section className="bg-estate-offwhite section-padding">
      <div className="container-full">
        {/* Centered header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="label-sm mb-3">OUR ADVISORS</p>
          <h2 className="text-3xl md:text-4xl text-estate-charcoal">
            Meet Our Property Experts
          </h2>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {agents.slice(0, 3).map((agent) => (
            <div key={agent.id} className="group">
              <div className="img-zoom aspect-[3/4] mb-5">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-sans font-medium text-base text-estate-charcoal mb-1">
                {agent.name}
              </h4>
              <p className="text-sm text-estate-grey mb-2">{agent.title}</p>
              <p className="label-xs">
                {agent.propertiesListed} properties · {agent.yearsExperience}{' '}
                years
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 6: CTA Band
// ────────────────────────────────────────────────────────────

function CtaBand() {
  return (
    <section className="bg-estate-forest text-white py-14 md:py-20">
      <div className="container-full text-center">
        <h2 className="text-2xl md:text-3xl text-white mb-7">
          Ready to find your home in Nagercoil?
        </h2>
        <Link to="/properties" className="btn-dark">
          Browse Properties
        </Link>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Section 7: Recent Listings Strip
// ────────────────────────────────────────────────────────────

function RecentListingsStrip() {
  const { getActiveProperties } = useProperties();

  const recentProperties = useMemo(() => {
    return [...getActiveProperties()]
      .sort(
        (a, b) =>
          new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      )
      .slice(0, 4);
  }, [getActiveProperties]);

  if (recentProperties.length === 0) return null;

  return (
    <section className="bg-estate-offwhite section-padding-sm border-t border-estate-stone/40">
      <div className="container-full">
        <p className="label-sm mb-8">RECENTLY LISTED</p>

        {/* Horizontal scroll strip */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin">
          {recentProperties.map((property) => {
            const primaryImage =
              property.images.find((img) => img.isPrimary) ||
              property.images[0];
            const specs = getPropertySpecs(property);

            return (
              <Link
                key={property.id}
                to={`/properties/${property.slug}`}
                className="group flex-shrink-0 w-72"
              >
                <div className="img-zoom aspect-[16/10] mb-3 bg-estate-stone/20">
                  <img
                    src={primaryImage?.url || FALLBACK_IMG}
                    alt={primaryImage?.alt || property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                </div>
                <span className="label-xs block mb-1">{property.locality}</span>
                <h4 className="font-sans font-medium text-sm text-estate-charcoal mb-1 group-hover:text-estate-forest transition-colors duration-200 line-clamp-1">
                  {property.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="price-display text-sm">
                    {formatPrice(property.price)}
                  </span>
                  {specs && (
                    <>
                      <span className="text-estate-stone">·</span>
                      <span className="text-xs text-estate-grey">{specs}</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// HomePage — Composed Layout
// ────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <LocalitySection />
      <RegionalLandmarksSection />
      <AboutSection />
      <AgentsSection />
      <CtaBand />
      <RecentListingsStrip />
    </>
  );
}
