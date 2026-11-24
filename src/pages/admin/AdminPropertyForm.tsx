// ============================================================
// KumariNest — AdminPropertyForm
// Comprehensive property creation and edit dossier suite
// ============================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatPrice, slugify } from '@/lib/utils';
import {
  LOCALITIES,
  PROPERTY_TYPES,
  agents,
  type Property,
  type PropertyType,
  type ListingType,
  type PropertyStatus,
  type PropertyImage
} from '@/data/properties';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  ShieldCheck,
  MapPin,
  Check
} from 'lucide-react';

const COMMON_AMENITIES = [
  'Bore Well',
  'Covered Parking',
  'Garden',
  'Modular Kitchen',
  'Power Backup',
  'Rain Water Harvesting',
  'Solar Water Heater',
  'CCTV',
  'Lift',
  'Swimming Pool',
  'Gymnasium',
  "Children's Play Area",
  '24/7 Security',
  'Compound Wall',
  'Terrace',
  'Intercom',
  'Vitrified Tiles',
  'Italian Marble Flooring',
  'Car Porch',
  '3-Phase EB Connection',
  'Pechiparai Dam Water Line',
  'Mukkadal Drinking Water'
];

export default function AdminPropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { getProperty, addProperty, updateProperty } = useProperties();

  // Form Fields
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('House');
  const [listingType, setListingType] = useState<ListingType>('Buy');
  const [status, setStatus] = useState<PropertyStatus>('Active');
  const [price, setPrice] = useState<number>(3500000);
  const [pricePerSqft, setPricePerSqft] = useState<number | undefined>(3684);
  const [locality, setLocality] = useState<string>(LOCALITIES[0]);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('629001');

  // Specs
  const [bedrooms, setBedrooms] = useState<number | undefined>(3);
  const [bathrooms, setBathrooms] = useState<number | undefined>(2);
  const [builtUpArea, setBuiltUpArea] = useState<number | undefined>(1500);
  const [landArea, setLandArea] = useState<number | undefined>(1800);
  const [facing, setFacing] = useState('East');
  const [floors, setFloors] = useState<number | undefined>(2);
  const [parking, setParking] = useState<number | undefined>(1);
  const [yearBuilt, setYearBuilt] = useState<number | undefined>(2024);

  // Narrative & Amenities
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Bore Well',
    'Covered Parking',
    'Rain Water Harvesting',
    'Compound Wall'
  ]);

  // Images
  const [images, setImages] = useState<PropertyImage[]>([
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      alt: 'Exterior facade'
    }
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  // Agent & Legal
  const [agentId, setAgentId] = useState(agents[0].id);
  const [isVerified, setIsVerified] = useState(true);
  const [sourceUrl, setSourceUrl] = useState('Verified Local Listing');
  const [isFeatured, setIsFeatured] = useState(false);

  // Load existing property data if editing
  useEffect(() => {
    if (isEditing && id) {
      const existing = getProperty(id);
      if (existing) {
        setTitle(existing.title);
        setPropertyType(existing.propertyType);
        setListingType(existing.listingType);
        setStatus(existing.status);
        setPrice(existing.price);
        setPricePerSqft(existing.pricePerSqft);
        setLocality(existing.locality);
        setAddress(existing.address);
        setPincode(existing.pincode);
        setBedrooms(existing.bedrooms);
        setBathrooms(existing.bathrooms);
        setBuiltUpArea(existing.builtUpArea);
        setLandArea(existing.landArea);
        setFacing(existing.facing || 'East');
        setFloors(existing.floors);
        setParking(existing.parking);
        setYearBuilt(existing.yearBuilt);
        setShortDescription(existing.shortDescription);
        setDescription(existing.description);
        setSelectedAmenities(existing.amenities);
        setImages(existing.images);
        setAgentId(existing.agent.id);
        setIsVerified(existing.isVerified);
        setSourceUrl(existing.sourceUrl || '');
        setIsFeatured(existing.isFeatured);
      }
    }
  }, [isEditing, id, getProperty]);

  // Auto calculate price per sq.ft helper
  useEffect(() => {
    if (price && builtUpArea && builtUpArea > 0) {
      setPricePerSqft(Math.round(price / builtUpArea));
    }
  }, [price, builtUpArea]);

  function handleAddImage() {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [
      ...prev,
      {
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || 'Property photo'
      }
    ]);
    setNewImageUrl('');
    setNewImageAlt('');
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !locality || !price) {
      alert('Please fill out all required fields: Title, Locality, and Price.');
      return;
    }

    const assignedAgent = agents.find((a) => a.id === agentId) || agents[0];
    const slug = slugify(title);
    const today = new Date().toISOString().split('T')[0];

    const propertyData: Property = {
      id: isEditing && id ? id : `prop-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      slug: isEditing && id ? getProperty(id)?.slug || slug : slug,
      propertyType,
      listingType,
      status,
      price,
      pricePerSqft,
      locality,
      address: address.trim() || `${locality}, Nagercoil`,
      city: 'Nagercoil',
      district: 'Kanyakumari',
      state: 'Tamil Nadu',
      pincode: pincode.trim() || '629001',
      bedrooms: propertyType === 'Plot' ? undefined : bedrooms,
      bathrooms: propertyType === 'Plot' ? undefined : bathrooms,
      builtUpArea: propertyType === 'Plot' ? undefined : builtUpArea,
      builtUpAreaUnit: 'sq.ft',
      landArea,
      landAreaUnit: 'sq.ft',
      facing,
      floors: propertyType === 'Plot' ? undefined : floors,
      parking: propertyType === 'Plot' ? undefined : parking,
      yearBuilt: propertyType === 'Plot' ? undefined : yearBuilt,
      shortDescription: shortDescription.trim() || `${propertyType} located in ${locality}, Nagercoil.`,
      description:
        description.trim() ||
        `Well-positioned ${propertyType.toLowerCase()} situated in ${locality}, Nagercoil. Features clear title deeds, approved planning documentation, and easy access to transportation hubs.`,
      amenities: selectedAmenities,
      images: images.length > 0 ? images : [
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
          alt: 'Exterior'
        }
      ],
      agent: assignedAgent,
      isFeatured,
      isVerified,
      verificationDate: isVerified ? today : undefined,
      sourceUrl: sourceUrl.trim() || 'Direct Listing',
      listedDate: isEditing && id ? getProperty(id)?.listedDate || today : today,
      lastUpdated: today
    };

    if (isEditing && id) {
      updateProperty(id, propertyData);
    } else {
      addProperty(propertyData);
    }

    navigate('/admin/properties');
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/properties"
            className="p-2 bg-white border border-estate-stone/70 hover:bg-estate-ivory transition-colors text-estate-grey"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl font-serif font-bold text-estate-charcoal">
              {isEditing ? `Edit Listing Dossier: ${title || 'Property'}` : 'Register New Nagercoil Property'}
            </h2>
            <p className="text-xs text-estate-grey">
              All properties are stored in the local Nagercoil verified directory.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Save Revisions' : 'Publish to Registry'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Core Identity & Locality */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">01. Primary Identification</span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <label className="label-xs text-estate-grey block mb-1">
                Property Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 3 BHK Contemporary Duplex in N.G.O Colony"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field text-sm"
              />
            </div>

            <div className="md:col-span-4">
              <label className="label-xs text-estate-grey block mb-1">
                Locality (Nagercoil Core) *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="select-field text-xs"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="label-xs text-estate-grey block mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="select-field text-xs"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="label-xs text-estate-grey block mb-1">Transaction Category</label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
                className="select-field text-xs"
              >
                <option value="Buy">For Sale (Buy)</option>
                <option value="Rent">For Lease / Rent</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="label-xs text-estate-grey block mb-1">Publication Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="select-field text-xs"
              >
                <option value="Active">Published & Visible</option>
                <option value="Unpublished">Unpublished / Internal Draft</option>
                <option value="Pending">Pending Audit Verification</option>
                <option value="Sold">Sold / Off-market</option>
              </select>
            </div>

            <div className="md:col-span-8">
              <label className="label-xs text-estate-grey block mb-1">Specific Address / Landmark</label>
              <input
                type="text"
                placeholder="e.g. 4th Cross Street, Near Anna Statue, N.G.O Colony"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-field text-xs"
              />
            </div>

            <div className="md:col-span-4">
              <label className="label-xs text-estate-grey block mb-1">Pincode</label>
              <input
                type="text"
                placeholder="629001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input-field text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. Financials & Land Metrics */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">02. Financial Valuation & Dimensions</span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="label-xs text-estate-grey block mb-1">
                Asking Selling Price (₹ INR) *
              </label>
              <input
                type="number"
                required
                step="50000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input-field text-sm font-semibold tabular-nums"
              />
              <span className="text-[11px] text-estate-forest font-medium mt-1 block">
                Reading: {formatPrice(price)}
              </span>
            </div>

            <div>
              <label className="label-xs text-estate-grey block mb-1">Price per sq.ft (Calculated)</label>
              <input
                type="number"
                value={pricePerSqft || ''}
                onChange={(e) => setPricePerSqft(Number(e.target.value))}
                className="input-field text-sm tabular-nums"
              />
              <span className="text-[11px] text-estate-grey mt-1 block">
                Approx rate in {locality}
              </span>
            </div>

            <div>
              <label className="label-xs text-estate-grey block mb-1">Land Area (sq.ft)</label>
              <input
                type="number"
                value={landArea || ''}
                onChange={(e) => setLandArea(Number(e.target.value))}
                className="input-field text-sm tabular-nums"
              />
              <span className="text-[11px] text-estate-grey mt-1 block">
                ~{landArea ? (landArea / 435.6).toFixed(1) : 0} Cents
              </span>
            </div>

            <div>
              <label className="label-xs text-estate-grey block mb-1">Built-up Area (sq.ft)</label>
              <input
                type="number"
                disabled={propertyType === 'Plot'}
                value={builtUpArea || ''}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="input-field text-sm tabular-nums disabled:bg-estate-stone/20"
              />
              <span className="text-[11px] text-estate-grey mt-1 block">
                Gross construction area
              </span>
            </div>
          </div>
        </div>

        {/* 3. Architectural Specifications */}
        {propertyType !== 'Plot' && (
          <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
            <span className="label-sm text-estate-forest block mb-1">03. Physical Architecture</span>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <label className="label-xs text-estate-grey block mb-1">Bedrooms</label>
                <select
                  value={bedrooms || 3}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="select-field text-xs"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} BHK
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-xs text-estate-grey block mb-1">Bathrooms</label>
                <select
                  value={bathrooms || 2}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="select-field text-xs"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-xs text-estate-grey block mb-1">Orientation (Vastu)</label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                  className="select-field text-xs"
                >
                  <option value="East">East Facing</option>
                  <option value="North">North Facing</option>
                  <option value="West">West Facing</option>
                  <option value="South">South Facing</option>
                </select>
              </div>

              <div>
                <label className="label-xs text-estate-grey block mb-1">Total Floors</label>
                <select
                  value={floors || 1}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="select-field text-xs"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Floor{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-xs text-estate-grey block mb-1">Car Parking Slots</label>
                <select
                  value={parking || 1}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="select-field text-xs"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} Covered
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-xs text-estate-grey block mb-1">Year Built</label>
                <input
                  type="number"
                  value={yearBuilt || 2024}
                  onChange={(e) => setYearBuilt(Number(e.target.value))}
                  className="input-field text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Editorial Descriptions & Narrative */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">04. Narrative & Content Dossier</span>

          <div>
            <label className="label-xs text-estate-grey block mb-1">Summary Excerpt</label>
            <input
              type="text"
              placeholder="e.g. Spacious 3 BHK double-storey house on 1800 sq.ft plot with north-facing entrance."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="input-field text-xs"
            />
          </div>

          <div>
            <label className="label-xs text-estate-grey block mb-1">Complete Architectural Narrative</label>
            <textarea
              rows={5}
              placeholder="Provide a detailed, genuine description of the property, its construction quality, neighborhood benefits in Nagercoil, water availability, and access roads."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* 5. Amenities Checklist */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">05. Amenities & Regional Infrastructure</span>
          <p className="text-xs text-estate-grey">
            Select all verified infrastructure provisions present on the premises.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {COMMON_AMENITIES.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 p-2.5 text-xs text-left border transition-colors ${
                    isChecked
                      ? 'bg-estate-forest text-white border-estate-forest'
                      : 'bg-estate-ivory/60 text-estate-charcoal border-estate-stone/50 hover:bg-estate-stone/30'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center ${
                      isChecked ? 'border-white bg-white/20' : 'border-estate-stone-dark'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Photography & Image Gallery */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">06. Property Photography</span>
          <p className="text-xs text-estate-grey">
            Add authentic high-resolution architectural photography. Avoid low-resolution or generic AI assets.
          </p>

          {/* New Image Add Row */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="Enter Image URL (e.g. Unsplash or hosted photo link)"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Caption (e.g. Living Hall View)"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              className="input-field text-xs sm:w-48"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="btn-secondary text-xs py-2 px-4 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Photo
            </button>
          </div>

          {/* Current Gallery Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative group aspect-[4/3] bg-estate-stone/30 border border-estate-stone overflow-hidden"
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <span className="text-[10px] text-white truncate">{img.alt}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="self-end p-1 bg-red-600 text-white rounded-sm hover:bg-red-700"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {idx === 0 && (
                  <span className="absolute top-1 left-1 bg-estate-charcoal text-white text-[9px] font-semibold px-1.5 py-0.5">
                    Primary Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7. Verification & Audit Dossier */}
        <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
          <span className="label-sm text-estate-forest block mb-1">07. Verification & Audit Compliance</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="p-4 bg-estate-ivory border border-estate-stone/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-estate-charcoal block">
                  Mark as Physically Verified
                </span>
                <span className="text-[11px] text-estate-grey">
                  Confirmed on ground by KumariNest agent
                </span>
              </div>
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 accent-estate-forest cursor-pointer"
              />
            </div>

            <div className="p-4 bg-estate-ivory border border-estate-stone/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-estate-charcoal block">
                  Feature on Homepage Grid
                </span>
                <span className="text-[11px] text-estate-grey">
                  Curated editorial placement
                </span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-estate-forest cursor-pointer"
              />
            </div>

            <div>
              <label className="label-xs text-estate-grey block mb-1">Assigned Property Advisor</label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="select-field text-xs"
              >
                {agents.map((ag) => (
                  <option key={ag.id} value={ag.id}>
                    {ag.name} ({ag.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label-xs text-estate-grey block mb-1">
              Source Attribution & Verification Archive Reference
            </label>
            <input
              type="text"
              placeholder="e.g. MagicBricks Public Archival Record / Direct Owner Verified"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="input-field text-xs"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <Link to="/admin/properties" className="btn-secondary text-xs py-2.5 px-6">
            Cancel
          </Link>
          <button type="submit" className="btn-primary text-xs py-2.5 px-8 flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Revisions' : 'Register Listing in Nagercoil Database'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
