// ============================================================
// KumariNest — PropertiesPage
// Architectural Property Discovery Engine
// Single Source of Truth: URL Search Parameters
// ============================================================

import { useMemo, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import {
  Bed,
  Bath,
  Maximize,
  SlidersHorizontal,
  X,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { formatPrice, formatArea, getRelativeTime, cn } from '@/lib/utils';
import { LOCALITIES, PROPERTY_TYPES, BUDGET_RANGES, BEDROOM_OPTIONS } from '@/data/properties';
import type { PropertyType, ListingType, Property } from '@/data/properties';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'area-desc';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Area: Largest' },
];

export default function PropertiesPage() {
  const { getActiveProperties } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ============================================================
  // DERIVED FILTER STATE DIRECTLY FROM URL SEARCH PARAMS
  // 100% synchronized, zero lag, zero stale state
  // ============================================================

  const listingType: ListingType =
    (searchParams.get('listing') as ListingType) === 'Rent' ? 'Rent' : 'Buy';

  const selectedTypes: PropertyType[] = useMemo(() => {
    const param = searchParams.get('type');
    if (!param) return [];
    const tokens = param.toLowerCase().split(',');
    return PROPERTY_TYPES.filter((pt) => tokens.includes(pt.toLowerCase()));
  }, [searchParams]);

  const selectedLocalities: string[] = useMemo(() => {
    const param = searchParams.get('locality');
    if (!param) return [];
    return param.split(',').filter(Boolean);
  }, [searchParams]);

  const budgetIndex: number = useMemo(() => {
    const param = searchParams.get('budget');
    if (param === null || param === '') return -1;
    const parsed = parseInt(param, 10);
    return isNaN(parsed) ? -1 : parsed;
  }, [searchParams]);

  const selectedBedrooms: number | null = useMemo(() => {
    const param = searchParams.get('bedrooms');
    if (param === null || param === '') return null;
    const parsed = parseInt(param, 10);
    return isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  // ============================================================
  // URL MUTATORS
  // ============================================================

  const updateFilters = useCallback(
    (updates: {
      listing?: ListingType;
      types?: PropertyType[];
      localities?: string[];
      budget?: number;
      bedrooms?: number | null;
    }) => {
      const nextListing = updates.listing !== undefined ? updates.listing : listingType;
      const nextTypes = updates.types !== undefined ? updates.types : selectedTypes;
      const nextLocalities = updates.localities !== undefined ? updates.localities : selectedLocalities;
      const nextBudget = updates.budget !== undefined ? updates.budget : budgetIndex;
      const nextBedrooms = updates.bedrooms !== undefined ? updates.bedrooms : selectedBedrooms;

      const params = new URLSearchParams();
      if (nextListing !== 'Buy') params.set('listing', nextListing);
      if (nextTypes.length > 0) params.set('type', nextTypes.join(','));
      if (nextLocalities.length > 0) params.set('locality', nextLocalities.join(','));
      if (nextBudget >= 0) params.set('budget', String(nextBudget));
      if (nextBedrooms !== null) params.set('bedrooms', String(nextBedrooms));

      setSearchParams(params);
    },
    [listingType, selectedTypes, selectedLocalities, budgetIndex, selectedBedrooms, setSearchParams]
  );

  const toggleType = useCallback(
    (type: PropertyType) => {
      const next = selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type];
      updateFilters({ types: next });
    },
    [selectedTypes, updateFilters]
  );

  const toggleLocality = useCallback(
    (loc: string) => {
      const next = selectedLocalities.includes(loc)
        ? selectedLocalities.filter((l) => l !== loc)
        : [...selectedLocalities, loc];
      updateFilters({ localities: next });
    },
    [selectedLocalities, updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const hasActiveFilters =
    listingType !== 'Buy' ||
    selectedTypes.length > 0 ||
    selectedLocalities.length > 0 ||
    budgetIndex >= 0 ||
    selectedBedrooms !== null;

  // ============================================================
  // FILTERED PROPERTIES LIST
  // ============================================================

  const filteredProperties = useMemo(() => {
    let list = getActiveProperties().filter((p) => p.listingType === listingType);

    if (selectedTypes.length > 0) {
      list = list.filter((p) => selectedTypes.includes(p.propertyType));
    }

    if (selectedLocalities.length > 0) {
      list = list.filter((p) => selectedLocalities.includes(p.locality));
    }

    if (budgetIndex >= 0 && budgetIndex < BUDGET_RANGES.length) {
      const range = BUDGET_RANGES[budgetIndex];
      list = list.filter((p) => p.price >= range.min && p.price < range.max);
    }

    if (selectedBedrooms !== null) {
      list = list.filter((p) =>
        selectedBedrooms >= 5 ? (p.bedrooms ?? 0) >= 5 : p.bedrooms === selectedBedrooms
      );
    }

    // Sort
    switch (sortKey) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        list = [...list].sort(
          (a, b) => (b.builtUpArea ?? b.landArea ?? 0) - (a.builtUpArea ?? a.landArea ?? 0)
        );
        break;
      case 'newest':
      default:
        list = [...list].sort(
          (a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
        );
    }

    return list;
  }, [
    getActiveProperties,
    listingType,
    selectedTypes,
    selectedLocalities,
    budgetIndex,
    selectedBedrooms,
    sortKey,
  ]);

  // ============================================================
  // RENDER FILTER SIDEBAR CONTENT
  // ============================================================

  const renderFilterContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-estate-stone/50">
        <span className="text-sm font-semibold text-estate-charcoal tracking-tight">Filters</span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[11px] font-medium text-estate-forest hover:underline focus:outline-none"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Listing Type Toggle */}
      <div className="mb-6">
        <span className="label-sm mb-3 block">Transaction Type</span>
        <div className="flex border border-estate-stone/60">
          {(['Buy', 'Rent'] as ListingType[]).map((type) => (
            <button
              key={type}
              onClick={() => updateFilters({ listing: type })}
              className={cn(
                'flex-1 py-2 text-[13px] font-medium transition-colors duration-200 focus:outline-none',
                listingType === type
                  ? 'bg-estate-forest text-white font-semibold'
                  : 'bg-white text-estate-charcoal hover:bg-estate-ivory'
              )}
            >
              {type === 'Buy' ? 'For Sale (Buy)' : 'For Rent'}
            </button>
          ))}
        </div>
      </div>

      <div className="divider mb-6" />

      {/* Property Type Checkboxes */}
      <div className="mb-6">
        <span className="label-sm mb-3 block">Property Classification</span>
        <div className="space-y-2.5">
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-3.5 h-3.5 border-estate-stone accent-estate-forest cursor-pointer"
              />
              <span className="text-sm text-estate-charcoal/80 group-hover:text-estate-charcoal transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="divider mb-6" />

      {/* Nagercoil Localities */}
      <div className="mb-6">
        <span className="label-sm mb-3 block">Locality (Nagercoil Core)</span>
        <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
          {LOCALITIES.map((locality) => (
            <label key={locality} className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={selectedLocalities.includes(locality)}
                onChange={() => toggleLocality(locality)}
                className="w-3.5 h-3.5 border-estate-stone accent-estate-forest cursor-pointer"
              />
              <span className="text-sm text-estate-charcoal/80 group-hover:text-estate-charcoal transition-colors">
                {locality}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="divider mb-6" />

      {/* Budget Selector */}
      <div className="mb-6">
        <span className="label-sm mb-3 block">Budget Range</span>
        <select
          value={budgetIndex}
          onChange={(e) => updateFilters({ budget: parseInt(e.target.value, 10) })}
          className="select-field text-sm"
        >
          <option value={-1}>Any Budget</option>
          {BUDGET_RANGES.map((range, idx) => (
            <option key={idx} value={idx}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="divider mb-6" />

      {/* Bedroom Count */}
      <div>
        <span className="label-sm mb-3 block">Bedrooms (BHK)</span>
        <div className="flex gap-1.5">
          {BEDROOM_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => updateFilters({ bedrooms: selectedBedrooms === n ? null : n })}
              className={cn(
                'flex-1 py-2 text-[13px] font-medium border transition-colors duration-200 focus:outline-none',
                selectedBedrooms === n
                  ? 'bg-estate-forest text-white border-estate-forest font-semibold'
                  : 'bg-white text-estate-charcoal border-estate-stone/60 hover:border-estate-stone'
              )}
            >
              {n >= 5 ? '5+' : n}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-estate-offwhite">
      {/* Editorial Page Header */}
      <section className="bg-estate-charcoal text-white pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-estate-stone/60 mb-4 font-sans">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Properties</span>
          </nav>

          <h1 className="text-3xl md:text-5xl text-white mb-3">
            Properties in Nagercoil
          </h1>
          <p className="text-estate-stone/70 text-base max-w-xl font-sans">
            Explore verified residential houses, luxury villas, apartments and plots across
            Kanyakumari District.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-full py-10 md:py-14">
        <div className="flex gap-8 lg:gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-28 bg-white border border-estate-stone/50 p-6">
              {renderFilterContent()}
            </div>
          </aside>

          {/* Listings Column */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-estate-stone/40">
              {/* Left: count + mobile filter button */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-sans text-estate-charcoal">
                  <strong className="font-semibold text-estate-forest">{filteredProperties.length}</strong>{' '}
                  {filteredProperties.length === 1 ? 'property' : 'properties'} found in Nagercoil
                </span>

                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3.5 py-1.5 border border-estate-charcoal/20 text-xs font-medium text-estate-charcoal hover:border-estate-charcoal transition-colors focus:outline-none"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-1.5 h-1.5 rounded-full bg-estate-forest" />
                  )}
                </button>
              </div>

              {/* Right: sort dropdown */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-estate-grey font-sans">Sort by:</span>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="px-3 py-1.5 border border-estate-stone/80 text-xs bg-white text-estate-charcoal focus:outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-estate-grey mr-1">Active Filters:</span>

                {listingType !== 'Buy' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-estate-ivory border border-estate-stone/60 text-xs text-estate-charcoal">
                    For {listingType}
                    <button
                      onClick={() => updateFilters({ listing: 'Buy' })}
                      className="hover:text-estate-forest"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-estate-ivory border border-estate-stone/60 text-xs text-estate-charcoal"
                  >
                    {type}
                    <button
                      onClick={() => toggleType(type)}
                      className="hover:text-estate-forest"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {selectedLocalities.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-estate-ivory border border-estate-stone/60 text-xs text-estate-charcoal"
                  >
                    {loc}
                    <button
                      onClick={() => toggleLocality(loc)}
                      className="hover:text-estate-forest"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {budgetIndex >= 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-estate-ivory border border-estate-stone/60 text-xs text-estate-charcoal">
                    {BUDGET_RANGES[budgetIndex]?.label}
                    <button
                      onClick={() => updateFilters({ budget: -1 })}
                      className="hover:text-estate-forest"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedBedrooms !== null && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-estate-ivory border border-estate-stone/60 text-xs text-estate-charcoal">
                    {selectedBedrooms >= 5 ? '5+ BHK' : `${selectedBedrooms} BHK`}
                    <button
                      onClick={() => updateFilters({ bedrooms: null })}
                      className="hover:text-estate-forest"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  className="text-xs text-estate-forest hover:underline ml-2"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-white border border-estate-stone/40 px-6">
                <Search size={36} className="mx-auto text-estate-grey/50 mb-4" />
                <h3 className="text-xl text-estate-charcoal mb-2">
                  No properties match this filter combination
                </h3>
                <p className="text-sm text-estate-grey max-w-md mx-auto mb-6">
                  Try clearing specific filters to see other listings in Nagercoil.
                </p>
                <button onClick={clearFilters} className="btn-secondary text-xs">
                  View All Nagercoil Properties
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Mobile Filters Slide-over */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-sm bg-white p-6 overflow-y-auto shadow-elevated flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-estate-stone/40">
                  <span className="text-base font-semibold text-estate-charcoal font-sans">
                    Filters
                  </span>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-estate-grey hover:text-estate-charcoal focus:outline-none"
                  >
                    <X size={20} />
                  </button>
                </div>
                {renderFilterContent()}
              </div>

              {/* Bottom apply button */}
              <div className="pt-6 mt-6 border-t border-estate-stone/40">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full btn-primary text-xs py-3"
                >
                  Show {filteredProperties.length} Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Property Card
// ============================================================

function PropertyCard({ property }: { property: Property }) {
  const primaryImage = property.images[0];

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group block bg-white border border-estate-stone/40 hover:border-estate-charcoal/40 transition-all duration-300 focus:outline-none"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-[42%] flex-shrink-0 relative img-zoom bg-estate-stone/20">
          <div className="aspect-[16/11]">
            <img
              src={primaryImage?.url || FALLBACK_IMG}
              alt={primaryImage?.alt ?? property.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
          </div>
          {property.isVerified && (
            <span className="absolute top-3 left-3 bg-estate-forest text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
          {/* Top row */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="label-xs">{property.propertyType}</span>
              <span className="text-xs text-estate-grey-light font-mono">
                {getRelativeTime(property.listedDate)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-sans font-medium text-base text-estate-charcoal leading-snug mb-1 group-hover:text-estate-forest transition-colors line-clamp-2">
              {property.title}
            </h3>

            {/* Location */}
            <p className="text-sm text-estate-grey mb-3">
              {property.locality}, Nagercoil
            </p>

            {/* Price */}
            <div className="mb-3">
              <span className="price-display text-lg">
                {formatPrice(property.price)}
              </span>
              {property.pricePerSqft && (
                <span className="text-xs text-estate-grey ml-2">
                  ₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft
                </span>
              )}
            </div>
          </div>

          {/* Specs bar */}
          <div className="pt-3 border-t border-estate-stone/30 flex items-center justify-between text-xs text-estate-grey">
            <div className="flex items-center gap-3">
              {property.bedrooms !== undefined && (
                <>
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5" />
                    {property.bedrooms} BHK
                  </span>
                  <span className="w-px h-3 bg-estate-stone/60" />
                </>
              )}
              {property.bathrooms !== undefined && (
                <>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5" />
                    {property.bathrooms} Bath
                  </span>
                  <span className="w-px h-3 bg-estate-stone/60" />
                </>
              )}
              <span className="flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5" />
                {formatArea(
                  property.builtUpArea ?? property.landArea ?? 0,
                  property.builtUpAreaUnit || property.landAreaUnit || 'sq.ft'
                )}
              </span>
            </div>

            {/* Agent */}
            <p className="text-xs text-estate-grey hidden sm:block truncate max-w-[90px]">
              {property.agent.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
