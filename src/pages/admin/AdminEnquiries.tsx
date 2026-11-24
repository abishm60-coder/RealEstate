// ============================================================
// KumariNest — AdminEnquiries
// Lead management & scheduled site visit operations console
// ============================================================

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatDate, getRelativeTime } from '@/lib/utils';
import type { Enquiry } from '@/data/properties';
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  Filter,
  UserCheck
} from 'lucide-react';

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, properties } = useProperties();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchesType = typeFilter === 'All' || e.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [enquiries, statusFilter, typeFilter]);

  const statusCounts = useMemo(() => {
    return {
      All: enquiries.length,
      New: enquiries.filter((e) => e.status === 'New').length,
      Contacted: enquiries.filter((e) => e.status === 'Contacted').length,
      Scheduled: enquiries.filter((e) => e.status === 'Scheduled').length,
      Closed: enquiries.filter((e) => e.status === 'Closed').length,
    };
  }, [enquiries]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header & Filter Tabs */}
      <div className="bg-white border border-estate-stone/70 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-estate-charcoal">
              Client Enquiries & Site Visit Log
            </h2>
            <p className="text-xs text-estate-grey">
              Manage prospective buyers and schedule on-ground inspections in Nagercoil.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-estate-grey font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-estate-stone/80 text-xs bg-white text-estate-charcoal"
            >
              <option value="All">All Inquiries</option>
              <option value="Site Visit">Site Visits Only</option>
              <option value="Price Negotiation">Price Negotiations</option>
              <option value="General">General Inquiries</option>
            </select>
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-estate-stone/40">
          {(['All', 'New', 'Contacted', 'Scheduled', 'Closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                statusFilter === st
                  ? 'bg-estate-forest text-white border-estate-forest font-semibold'
                  : 'bg-estate-ivory text-estate-charcoal border-estate-stone/60 hover:bg-estate-stone/40'
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] font-mono px-1 py-0.2 rounded-sm ${
                  statusFilter === st ? 'bg-white/20 text-white' : 'bg-estate-stone/50 text-estate-grey'
                }`}
              >
                {statusCounts[st]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white border border-estate-stone/70 p-12 text-center text-estate-grey">
            <MessageSquare className="w-8 h-8 text-estate-stone-dark mx-auto mb-2" />
            <h3 className="font-semibold text-estate-charcoal text-sm mb-1">
              No inquiries match this filter
            </h3>
            <p className="text-xs text-estate-grey-light">
              Try switching status tabs to view all client communications.
            </p>
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const property = properties.find((p) => p.id === enq.propertyId);
            const whatsappNumber = enq.phone.replace(/[^0-9]/g, '');
            const whatsappChatUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hello ${enq.name}, regarding your enquiry for "${enq.propertyTitle}" on KumariNest Nagercoil:`
            )}`;

            return (
              <div
                key={enq.id}
                className="bg-white border border-estate-stone/70 p-5 sm:p-6 transition-all duration-200 hover:border-estate-charcoal/40 shadow-subtle"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left: Lead Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-base text-estate-charcoal font-sans">
                        {enq.name}
                      </span>
                      <span className="inline-block bg-estate-ivory border border-estate-stone/60 text-[10px] font-semibold uppercase px-2 py-0.5 text-estate-charcoal">
                        {enq.type}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 border ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : enq.status === 'Scheduled'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : enq.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>

                    {/* Property Link */}
                    <div className="text-xs flex items-center gap-1.5 text-estate-grey">
                      <span>Listing:</span>
                      {property ? (
                        <Link
                          to={`/properties/${property.slug}`}
                          target="_blank"
                          className="font-medium text-estate-forest hover:underline inline-flex items-center gap-1"
                        >
                          <span>{enq.propertyTitle}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="font-medium text-estate-charcoal">{enq.propertyTitle}</span>
                      )}
                    </div>

                    {/* Inquiry Message */}
                    <div className="p-3 bg-estate-ivory/60 border border-estate-stone/40 text-xs text-estate-charcoal leading-relaxed font-sans mt-2">
                      "{enq.message}"
                    </div>

                    {/* Metadata & Timestamps */}
                    <div className="flex items-center gap-4 text-[11px] text-estate-grey pt-1 font-mono">
                      <span>Registered: {formatDate(enq.createdAt)}</span>
                      <span>·</span>
                      <span>{getRelativeTime(enq.createdAt)}</span>
                    </div>
                  </div>

                  {/* Right: Direct Actions & Status Controller */}
                  <div className="lg:w-72 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-estate-stone/40 pt-4 lg:pt-0 lg:pl-6">
                    <div>
                      <span className="label-xs text-estate-grey block mb-1.5">Direct Client Contact</span>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-estate-charcoal font-medium font-mono">
                          <Phone className="w-3.5 h-3.5 text-estate-forest" />
                          <span>{enq.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-estate-grey truncate text-[11px]">
                          <Mail className="w-3.5 h-3.5 text-estate-grey" />
                          <span>{enq.email}</span>
                        </div>
                      </div>

                      {/* Instant Action buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        <a
                          href={whatsappChatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn bg-[#25D366] text-white hover:bg-[#1EBE5D] text-[11px] font-semibold py-1.5 px-3 flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${enq.phone}`}
                          className="flex-1 btn-secondary text-[11px] font-semibold py-1.5 px-3 flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>

                    {/* Status updater */}
                    <div className="pt-3 border-t border-estate-stone/30">
                      <label className="label-xs text-estate-grey block mb-1">Update Lead Pipeline Status</label>
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])
                        }
                        className="select-field text-xs py-1.5"
                      >
                        <option value="New">New (Unattended)</option>
                        <option value="Contacted">Contacted via Call / WhatsApp</option>
                        <option value="Scheduled">Site Visit Scheduled</option>
                        <option value="Closed">Closed / Concluded</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
