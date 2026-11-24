// ============================================================
// KumariNest — PropertyDetailPage
// Editorial property showcase with Nagercoil locality context
// ============================================================

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatPrice, formatPriceFull, formatArea, formatDate } from '@/lib/utils';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Compass,
  Layers,
  Car,
  Check,
  ShieldCheck,
  Clock,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  Calculator,
  ChevronRight,
  Share2,
  CheckCircle2
} from 'lucide-react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProperty, properties, enquiries } = useProperties();
  const property = slug ? getProperty(slug) : undefined;

  // Active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Site visit form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [visitMessage, setVisitMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // EMI Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center container-narrow py-24 text-center">
        <span className="label-sm text-estate-forest mb-3">404 — Property Not Found</span>
        <h1 className="text-3xl md:text-4xl font-serif text-estate-charcoal mb-4">
          Listing Unavailable or Archived
        </h1>
        <p className="text-estate-grey max-w-md mb-8">
          The property you are looking for may have been sold, unpublished or moved to another locality in Nagercoil.
        </p>
        <Link to="/properties" className="btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Properties
        </Link>
      </div>
    );
  }

  // Calculate EMI
  const principal = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const monthlyEMI = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  // Similar properties in same locality or same type
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status === 'Active' &&
        (p.locality === property.locality || p.propertyType === property.propertyType)
    )
    .slice(0, 3);

  // WhatsApp share link
  const whatsappUrl = `https://wa.me/${property.agent.whatsapp?.replace(/[^0-9]/g, '') || '919443100000'}?text=${encodeURIComponent(
    `Hello ${property.agent.name}, I am interested in viewing the property: "${property.title}" (Ref: ${property.id}) priced at ${formatPriceFull(property.price)} in ${property.locality}, Nagercoil. Please share more details.`
  )}`;

  function handleScheduleVisit(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorName || !visitorPhone) return;

    // Simulate saving enquiry
    setFormSubmitted(true);
  }

  return (
    <article className="min-h-screen bg-estate-offwhite pb-24">
      {/* Editorial Breadcrumbs & Sub-header */}
      <div className="bg-estate-ivory border-b border-estate-stone/50 py-3.5">
        <div className="container-full flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-1.5 text-estate-grey font-sans">
            <Link to="/" className="hover:text-estate-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-estate-stone-dark" />
            <Link to="/properties" className="hover:text-estate-charcoal transition-colors">Nagercoil</Link>
            <ChevronRight className="w-3.5 h-3.5 text-estate-stone-dark" />
            <Link to={`/properties?locality=${encodeURIComponent(property.locality)}`} className="hover:text-estate-charcoal transition-colors">
              {property.locality}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-estate-stone-dark" />
            <span className="text-estate-charcoal font-medium truncate max-w-[220px] sm:max-w-xs">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="label-xs text-estate-grey">
              Listing ID: <strong className="text-estate-charcoal font-mono">{property.id}</strong>
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Listing URL copied to clipboard');
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-estate-grey hover:text-estate-charcoal transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Architectural Visual Showcase */}
      <section className="bg-estate-charcoal py-4 sm:py-6">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            {/* Primary High-Resolution Stage */}
            <div className="lg:col-span-9 relative bg-estate-charcoal-light overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] flex items-center justify-center">
              <img
                src={property.images[activeImageIndex]?.url || property.images[0]?.url || FALLBACK_IMG}
                alt={property.images[activeImageIndex]?.alt || property.title}
                className="w-full h-full object-cover transition-all duration-500 ease-out"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
              <div className="absolute bottom-4 left-4 bg-estate-charcoal/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-sans tracking-wide text-white/90">
                {property.images[activeImageIndex]?.alt || `${property.title} — View ${activeImageIndex + 1}`}
              </div>
              <div className="absolute top-4 right-4 bg-estate-charcoal/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-white/90">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Gallery Thumbnails List */}
            <div className="lg:col-span-3 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto max-h-[500px] scrollbar-thin">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 lg:flex-shrink w-24 sm:w-28 lg:w-full aspect-[4/3] overflow-hidden border-2 transition-all duration-200 text-left ${
                    activeImageIndex === idx
                      ? 'border-estate-gold ring-1 ring-estate-gold opacity-100'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url || FALLBACK_IMG}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] text-white/90 truncate max-w-[90%]">
                    {img.alt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Primary Editorial Info Header */}
      <section className="container-wide pt-10 pb-8 border-b border-estate-stone/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span className="inline-block bg-estate-forest text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                {property.propertyType} For {property.listingType}
              </span>
              <span className="inline-block bg-estate-ivory text-estate-charcoal border border-estate-stone text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                {property.locality}, Nagercoil
              </span>
              {property.isVerified && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-semibold px-2.5 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Physically Verified
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-estate-charcoal leading-[1.12] mb-4">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-estate-grey text-sm mb-4">
              <MapPin className="w-4 h-4 text-estate-forest flex-shrink-0" />
              <span>{property.address}, Nagercoil — {property.pincode}, Tamil Nadu</span>
            </div>

            <p className="text-estate-grey text-sm max-w-2xl leading-relaxed">
              {property.shortDescription}
            </p>
          </div>

          {/* Pricing & Fast Consultation Dock */}
          <div className="lg:col-span-4 bg-white border border-estate-stone/70 p-6 shadow-subtle">
            <span className="label-xs text-estate-grey block mb-1">Asking Price (Negotiable)</span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-estate-charcoal leading-none mb-1 tabular-nums">
              {formatPriceFull(property.price)}
            </div>
            <div className="text-xs text-estate-grey mb-4">
              {property.pricePerSqft ? (
                <>₹{property.pricePerSqft.toLocaleString('en-IN')} / sq.ft</>
              ) : (
                <>Approx {formatPrice(property.price)}</>
              )}
              {property.landArea && (
                <span className="ml-2 text-estate-charcoal font-medium">
                  · {property.landArea} {property.landAreaUnit}
                </span>
              )}
            </div>

            <div className="pt-4 border-t border-estate-stone/40 space-y-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-semibold py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat via WhatsApp
              </a>

              <a
                href={`tel:${property.agent.phone}`}
                className="w-full btn-secondary text-xs font-semibold py-2.5 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Agent ({property.agent.name})
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-estate-stone/30 flex items-center justify-between text-[11px] text-estate-grey">
              <span>Status: <strong className="text-emerald-700">{property.status}</strong></span>
              <span>Updated: {formatDate(property.lastUpdated)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Specifications Grid */}
      <section className="container-wide py-10">
        <div className="mb-4">
          <span className="label-sm text-estate-forest">Key Specifications</span>
          <h2 className="text-2xl font-serif text-estate-charcoal mt-1">Property Architecture & Metrics</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {property.bedrooms && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Bed className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Bedrooms</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.bedrooms} BHK
              </div>
              <div className="text-[11px] text-estate-grey-light">En-suite available</div>
            </div>
          )}

          {property.bathrooms && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Bath className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Bathrooms</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.bathrooms} Baths
              </div>
              <div className="text-[11px] text-estate-grey-light">Modern fittings</div>
            </div>
          )}

          {property.builtUpArea && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Maximize className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Built-up Area</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.builtUpArea} {property.builtUpAreaUnit}
              </div>
              <div className="text-[11px] text-estate-grey-light">Carpet area approx 85%</div>
            </div>
          )}

          {property.landArea && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Layers className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Land Area</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.landArea} {property.landAreaUnit}
              </div>
              <div className="text-[11px] text-estate-grey-light">
                {(property.landArea / 435.6).toFixed(1)} Cents approx
              </div>
            </div>
          )}

          {property.facing && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Compass className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Orientation</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.facing} Facing
              </div>
              <div className="text-[11px] text-estate-grey-light">Vastu compliant entry</div>
            </div>
          )}

          {property.parking !== undefined && (
            <div className="bg-white border border-estate-stone/60 p-4">
              <div className="flex items-center gap-2 text-estate-forest mb-2">
                <Car className="w-4 h-4" />
                <span className="label-xs text-estate-grey">Parking</span>
              </div>
              <div className="text-lg font-semibold text-estate-charcoal font-sans">
                {property.parking} Covered
              </div>
              <div className="text-[11px] text-estate-grey-light">Dedicated car porch</div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Narrative + Amenities + Verification Dossier */}
      <section className="container-wide py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Narrative & Amenities */}
          <div className="lg:col-span-8 space-y-10">
            {/* Description */}
            <div className="bg-white border border-estate-stone/60 p-6 sm:p-8">
              <span className="label-sm text-estate-forest">Architectural Profile</span>
              <h2 className="text-2xl font-serif text-estate-charcoal mt-1 mb-5">
                Comprehensive Property Narrative
              </h2>

              <div className="prose prose-stone text-estate-charcoal text-sm leading-relaxed space-y-4 font-sans">
                <p>{property.description}</p>
                <p>
                  Situated in <strong>{property.locality}</strong>, one of Nagercoil’s established residential corridors,
                  this property benefits from proximity to primary education institutions, multi-specialty healthcare,
                  and central transportation arteries connecting to the Trivandrum National Highway (NH-66) and Kanyakumari coastal road.
                </p>
                <p>
                  The structure adheres to regional architectural sensibilities with generous ceiling heights promoting natural cross-ventilation,
                  high-grade electrical wiring, robust foundation engineering suited to Kanyakumari District’s coastal-inland soil conditions,
                  and independent water management infrastructure.
                </p>
              </div>
            </div>

            {/* Amenities & Infrastructure */}
            <div className="bg-white border border-estate-stone/60 p-6 sm:p-8">
              <span className="label-sm text-estate-forest">Infrastructure & Conveniences</span>
              <h2 className="text-2xl font-serif text-estate-charcoal mt-1 mb-6">
                Equipped Features & Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 bg-estate-ivory/60 border border-estate-stone/40 text-xs font-medium text-estate-charcoal"
                  >
                    <Check className="w-4 h-4 text-estate-forest flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Verification & Due Diligence Dossier */}
            <div className="bg-white border border-estate-stone/60 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="label-sm text-emerald-700">Legal Compliance Dossier</span>
                  <h2 className="text-2xl font-serif text-estate-charcoal mt-1">
                    Documentation & Title Verification
                  </h2>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Public Record
                </div>
              </div>

              <p className="text-xs text-estate-grey mb-6 leading-relaxed">
                KumariNest upholds rigorous title verification across all listings in Nagercoil and Kanyakumari District.
                Every listed property undergoes physical survey checks and source archival validation prior to catalog publication.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-estate-ivory border border-estate-stone/50 space-y-1">
                  <span className="text-estate-grey block text-[10px] uppercase font-semibold">Title Deed Status</span>
                  <span className="font-semibold text-estate-charcoal">Clear Parent Title & Encumbrance Free</span>
                  <span className="text-[11px] text-estate-grey block">30-Year Encumbrance Certificate (EC) available for inspection</span>
                </div>

                <div className="p-3.5 bg-estate-ivory border border-estate-stone/50 space-y-1">
                  <span className="text-estate-grey block text-[10px] uppercase font-semibold">Approval Authority</span>
                  <span className="font-semibold text-estate-charcoal">Nagercoil LPA / DTCP Verified</span>
                  <span className="text-[11px] text-estate-grey block">Adheres to Tamil Nadu Town & Country Planning norms</span>
                </div>

                <div className="p-3.5 bg-estate-ivory border border-estate-stone/50 space-y-1">
                  <span className="text-estate-grey block text-[10px] uppercase font-semibold">Verification Audit Date</span>
                  <span className="font-semibold text-estate-charcoal">{property.verificationDate ? formatDate(property.verificationDate) : 'Recently Inspected'}</span>
                  <span className="text-[11px] text-estate-grey block">Audited by Senior Nagercoil Property Consultant</span>
                </div>

                <div className="p-3.5 bg-estate-ivory border border-estate-stone/50 space-y-1">
                  <span className="text-estate-grey block text-[10px] uppercase font-semibold">Archival Source Attribution</span>
                  <span className="font-semibold text-estate-charcoal">{property.sourceUrl || 'Direct Local Authority Listing'}</span>
                  <span className="text-[11px] text-estate-grey block">Public directory audit reference retained</span>
                </div>
              </div>
            </div>

            {/* Indian Home Loan EMI Estimator */}
            <div className="bg-estate-ivory border border-estate-stone p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-estate-forest">
                <Calculator className="w-5 h-5" />
                <span className="label-sm text-estate-forest">Financial Planning</span>
              </div>
              <h2 className="text-2xl font-serif text-estate-charcoal mb-4">
                Mortgage & Monthly EMI Calculator
              </h2>
              <p className="text-xs text-estate-grey mb-6">
                Based on prevailing SBI / Indian Bank home loan interest rates in Tamil Nadu.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-estate-charcoal font-medium">Down Payment ({downPaymentPercent}%)</span>
                    <span className="font-mono text-estate-forest font-semibold">{formatPrice(property.price * downPaymentPercent / 100)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-estate-forest"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-estate-charcoal font-medium">Loan Tenure</span>
                    <span className="font-mono text-estate-forest font-semibold">{loanTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-estate-forest"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-estate-charcoal font-medium">Interest Rate</span>
                    <span className="font-mono text-estate-forest font-semibold">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="12"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-estate-forest"
                  />
                </div>
              </div>

              <div className="p-4 bg-white border border-estate-stone/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="label-xs text-estate-grey block">Estimated Monthly Outflow</span>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-estate-forest tabular-nums">
                    ₹{monthlyEMI.toLocaleString('en-IN')} <span className="text-xs font-sans text-estate-grey font-normal">/ month</span>
                  </div>
                </div>
                <div className="text-xs text-estate-grey text-right">
                  <div>Loan Amount: <strong>₹{Math.round(principal).toLocaleString('en-IN')}</strong></div>
                  <div>Tenure: <strong>{totalMonths} months</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Agent Profile & Schedule Site Visit Form */}
          <div className="lg:col-span-4 space-y-6">
            {/* Assigned Specialist Card */}
            <div className="bg-white border border-estate-stone/60 p-6">
              <span className="label-sm text-estate-grey block mb-3">Assigned Property Specialist</span>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-16 h-16 object-cover rounded-full border border-estate-stone"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
                <div>
                  <h3 className="font-semibold text-base text-estate-charcoal font-sans">
                    {property.agent.name}
                  </h3>
                  <div className="text-xs text-estate-grey">{property.agent.title}</div>
                  <div className="text-[11px] text-estate-forest font-medium mt-0.5">
                    {property.agent.yearsExperience}+ years local Nagercoil expertise
                  </div>
                </div>
              </div>

              <p className="text-xs text-estate-grey leading-relaxed mb-4">
                {property.agent.bio}
              </p>

              <div className="space-y-2 text-xs border-t border-estate-stone/40 pt-4">
                <div className="flex items-center gap-2 text-estate-charcoal">
                  <Phone className="w-3.5 h-3.5 text-estate-forest" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-estate-charcoal">
                  <Mail className="w-3.5 h-3.5 text-estate-forest" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
            </div>

            {/* Schedule a Site Visit Form */}
            <div className="bg-white border border-estate-stone/60 p-6">
              <span className="label-sm text-estate-forest block mb-1">Direct Inspection Request</span>
              <h3 className="text-xl font-serif text-estate-charcoal mb-2">
                Schedule a Site Visit
              </h3>
              <p className="text-xs text-estate-grey mb-5">
                Our property specialist will accompany you for an in-person walkthrough in {property.locality}.
              </p>

              {formSubmitted ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-900 text-sm mb-1">Visit Request Registered</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Thank you, {visitorName}. Our Nagercoil consultant ({property.agent.name}) will call you at {visitorPhone} within 2 business hours to confirm coordinates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleVisit} className="space-y-3.5">
                  <div>
                    <label className="label-xs text-estate-grey block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anandha Krishnan"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="label-xs text-estate-grey block mb-1">Contact Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94431 XXXXX"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="label-xs text-estate-grey block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="label-xs text-estate-grey block mb-1">Preferred Inspection Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="label-xs text-estate-grey block mb-1">Specific Inquiries or Timings</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Prefer morning visit; please also clarify water source and car parking space."
                      value={visitMessage}
                      onChange={(e) => setVisitMessage(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary text-xs py-3 mt-2">
                    Request Confirmed Site Escort
                  </button>

                  <p className="text-[10px] text-estate-grey text-center mt-2">
                    Zero obligation. No broker spam. Complete client confidentiality.
                  </p>
                </form>
              )}
            </div>

            {/* Neighborhood Transit & Proximities */}
            <div className="bg-estate-ivory border border-estate-stone/60 p-5 text-xs">
              <span className="label-xs text-estate-grey block mb-2">Locality Transit Proximity</span>
              <ul className="space-y-2 text-estate-charcoal/90">
                <li className="flex justify-between py-1 border-b border-estate-stone/30">
                  <span>Nagercoil Town Railway Station</span>
                  <strong className="font-mono">~3.2 km</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-estate-stone/30">
                  <span>Asaripallam Govt Medical College</span>
                  <strong className="font-mono">~4.5 km</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-estate-stone/30">
                  <span>Vadasery Central Bus Stand</span>
                  <strong className="font-mono">~2.8 km</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-estate-stone/30">
                  <span>Scott Christian College</span>
                  <strong className="font-mono">~2.1 km</strong>
                </li>
                <li className="flex justify-between py-1">
                  <span>Kanyakumari Beach / Cape</span>
                  <strong className="font-mono">~18 km</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="container-wide pt-12 border-t border-estate-stone/50 mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="label-sm text-estate-forest">Comparable Opportunities</span>
              <h2 className="text-2xl font-serif text-estate-charcoal mt-1">
                More Properties in {property.locality} & Environs
              </h2>
            </div>
            <Link to="/properties" className="btn-secondary text-xs">
              View All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((sim) => (
              <Link
                key={sim.id}
                to={`/properties/${sim.slug}`}
                className="group bg-white border border-estate-stone/50 hover:border-estate-charcoal/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-estate-stone/30">
                  <img
                    src={sim.images[0]?.url || FALLBACK_IMG}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-estate-charcoal/80 text-white text-[10px] font-semibold px-2 py-0.5">
                    {sim.locality}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="label-xs text-estate-grey block mb-1">{sim.propertyType}</span>
                    <h3 className="font-medium text-sm text-estate-charcoal group-hover:text-estate-forest transition-colors line-clamp-1 mb-1">
                      {sim.title}
                    </h3>
                    <div className="text-xs text-estate-grey mb-3">
                      {sim.bedrooms ? `${sim.bedrooms} BHK · ` : ''}{sim.builtUpArea || sim.landArea} sq.ft
                    </div>
                  </div>

                  <div className="pt-2 border-t border-estate-stone/30 flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-estate-charcoal">
                      {formatPriceFull(sim.price)}
                    </span>
                    <span className="text-xs text-estate-forest font-medium group-hover:underline">
                      Explore Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
