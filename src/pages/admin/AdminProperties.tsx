// ============================================================
// KumariNest — AdminProperties
// Professional real estate inventory data table for Nagercoil
// ============================================================

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatPrice, formatPriceFull, formatDate } from '@/lib/utils';
import { LOCALITIES, PROPERTY_TYPES, type PropertyStatus } from '@/data/properties';
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  ShieldCheck,
  Check,
  X,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function AdminProperties() {
  const navigate = useNavigate();
  const { properties, togglePropertyStatus, updateProperty, deleteProperty } = useProperties();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocality = !selectedLocality || p.locality === selectedLocality;
      const matchesType = !selectedType || p.propertyType === selectedType;
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Active' && p.status === 'Active') ||
        (selectedStatus === 'Unpublished' && p.status === 'Unpublished') ||
        (selectedStatus === 'Verified' && p.isVerified);

      return matchesSearch && matchesLocality && matchesType && matchesStatus;
    });
  }, [properties, searchQuery, selectedLocality, selectedType, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / pageSize) || 1;
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, currentPage]);

  function handleDelete(id: string, title: string) {
    if (window.confirm(`Are you sure you want to remove "${title}" from the Nagercoil registry?`)) {
      deleteProperty(id);
    }
  }

  function togglePublish(id: string, currentStatus: PropertyStatus) {
    const nextStatus = currentStatus === 'Active' ? 'Unpublished' : 'Active';
    togglePropertyStatus(id, nextStatus);
  }

  function toggleVerification(id: string, currentVerified: boolean) {
    updateProperty(id, {
      isVerified: !currentVerified,
      verificationDate: !currentVerified ? new Date().toISOString().split('T')[0] : undefined,
    });
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Controls Bar */}
      <div className="bg-white border border-estate-stone/70 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-estate-grey" />
            <input
              type="text"
              placeholder="Search by title, locality, street address or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-estate-stone/80 text-xs font-sans focus:outline-none focus:border-estate-forest"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Locality */}
            <select
              value={selectedLocality}
              onChange={(e) => {
                setSelectedLocality(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-estate-stone/80 text-xs bg-white text-estate-charcoal focus:outline-none"
            >
              <option value="">All Localities ({LOCALITIES.length})</option>
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-estate-stone/80 text-xs bg-white text-estate-charcoal focus:outline-none"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-estate-stone/80 text-xs bg-white text-estate-charcoal focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Published / Active</option>
              <option value="Unpublished">Unpublished / Draft</option>
              <option value="Verified">Physically Verified Only</option>
            </select>

            {/* Reset */}
            {(searchQuery || selectedLocality || selectedType || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocality('');
                  setSelectedType('');
                  setSelectedStatus('All');
                  setCurrentPage(1);
                }}
                className="text-xs text-estate-grey hover:text-estate-charcoal underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-estate-stone/70 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-estate-ivory border-b border-estate-stone/60 text-[10px] uppercase font-semibold text-estate-grey tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Visual</th>
                <th className="py-3.5 px-4 font-semibold">Property Title & Address</th>
                <th className="py-3.5 px-4 font-semibold">Locality</th>
                <th className="py-3.5 px-4 font-semibold">Classification</th>
                <th className="py-3.5 px-4 font-semibold">Asking Price</th>
                <th className="py-3.5 px-4 font-semibold">Audit Status</th>
                <th className="py-3.5 px-4 font-semibold">Publish State</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-stone/30">
              {paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-estate-grey">
                    <p className="text-sm font-medium mb-1">No property listings match current criteria</p>
                    <p className="text-xs text-estate-grey-light">
                      Adjust your search query or reset locality filters.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((p) => (
                  <tr key={p.id} className="table-row-hover">
                    {/* Visual */}
                    <td className="py-3 px-4">
                      <div className="w-14 h-11 bg-estate-stone/30 overflow-hidden border border-estate-stone/40">
                        <img
                          src={p.images[0]?.url}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-estate-charcoal truncate">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-estate-grey truncate font-sans">
                        {p.address}
                      </div>
                      <span className="text-[10px] font-mono text-estate-grey-light">
                        ID: {p.id}
                      </span>
                    </td>

                    {/* Locality */}
                    <td className="py-3 px-4 font-medium text-estate-charcoal whitespace-nowrap">
                      {p.locality}
                    </td>

                    {/* Type & Specs */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-medium text-estate-charcoal">{p.propertyType}</div>
                      <div className="text-[11px] text-estate-grey">
                        {p.bedrooms ? `${p.bedrooms} BHK · ` : ''}{p.builtUpArea || p.landArea} {p.builtUpAreaUnit || p.landAreaUnit}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-estate-charcoal tabular-nums">
                        {formatPriceFull(p.price)}
                      </div>
                      <div className="text-[10px] text-estate-grey">
                        {p.pricePerSqft ? `₹${p.pricePerSqft.toLocaleString('en-IN')}/sq.ft` : formatPrice(p.price)}
                      </div>
                    </td>

                    {/* Verification Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleVerification(p.id, p.isVerified)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border transition-colors ${
                          p.isVerified
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-estate-ivory text-estate-grey border-estate-stone hover:bg-estate-stone/40'
                        }`}
                        title="Click to toggle verification status"
                      >
                        <ShieldCheck className={`w-3 h-3 ${p.isVerified ? 'text-emerald-600' : 'text-estate-grey'}`} />
                        <span>{p.isVerified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublish(p.id, p.status)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-sm border transition-colors ${
                          p.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-amber-50 hover:text-amber-700'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                        title="Click to toggle publish state"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span>{p.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/properties/${p.slug}`}
                          target="_blank"
                          className="p-1 text-estate-grey hover:text-estate-charcoal transition-colors"
                          title="View on Public Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          to={`/admin/properties/${p.id}/edit`}
                          className="p-1 text-estate-grey hover:text-estate-forest transition-colors"
                          title="Edit Listing Dossier"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1 text-estate-grey hover:text-red-600 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-estate-stone/50 bg-estate-ivory/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-estate-grey">
          <div>
            Showing <strong className="text-estate-charcoal">{paginatedProperties.length}</strong> of{' '}
            <strong className="text-estate-charcoal">{filteredProperties.length}</strong> total records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-estate-stone bg-white disabled:opacity-40 text-estate-charcoal hover:bg-estate-ivory"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-estate-charcoal px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-estate-stone bg-white disabled:opacity-40 text-estate-charcoal hover:bg-estate-ivory"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
