// ============================================================
// KumariNest — AdminDashboard
// Serious, data-centric commercial real estate operational overview
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { formatPrice, formatPriceFull, formatDate, getRelativeTime } from '@/lib/utils';
import {
  Building2,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const { properties, enquiries, stats } = useProperties();

  // Aggregate stats
  const totalVolume = properties.reduce((acc, p) => acc + p.price, 0);
  const avgSqftPrice = Math.round(
    properties.filter((p) => p.pricePerSqft).reduce((acc, p) => acc + (p.pricePerSqft || 0), 0) /
    (properties.filter((p) => p.pricePerSqft).length || 1)
  );

  // Property types breakdown
  const typeCounts = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
    return acc;
  }, {});

  // Locality inventory breakdown
  const localityCounts = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.locality] = (acc[p.locality] || 0) + 1;
    return acc;
  }, {});

  const topLocalities = Object.entries(localityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Operational Metrics */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <span className="label-sm text-estate-grey">Nagercoil Registry Metrics</span>
          <span className="text-[11px] text-estate-grey">Refreshed Live</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-estate-stone/70 p-5">
            <div className="flex items-center justify-between text-estate-grey mb-2">
              <span className="label-xs">Active Catalog Listings</span>
              <Building2 className="w-4 h-4 text-estate-forest" />
            </div>
            <div className="text-3xl font-serif font-bold text-estate-charcoal tabular-nums">
              {stats.activeListings}
            </div>
            <div className="text-[11px] text-estate-grey mt-1">
              {properties.filter((p) => p.isVerified).length} physically verified
            </div>
          </div>

          <div className="bg-white border border-estate-stone/70 p-5">
            <div className="flex items-center justify-between text-estate-grey mb-2">
              <span className="label-xs">Total Portfolio Asking Value</span>
              <TrendingUp className="w-4 h-4 text-estate-forest" />
            </div>
            <div className="text-3xl font-serif font-bold text-estate-charcoal tabular-nums">
              {formatPrice(totalVolume)}
            </div>
            <div className="text-[11px] text-estate-grey mt-1">
              Across 15 Nagercoil localities
            </div>
          </div>

          <div className="bg-white border border-estate-stone/70 p-5">
            <div className="flex items-center justify-between text-estate-grey mb-2">
              <span className="label-xs">Avg. Asking Price / sq.ft</span>
              <MapPin className="w-4 h-4 text-estate-forest" />
            </div>
            <div className="text-3xl font-serif font-bold text-estate-charcoal tabular-nums">
              ₹{avgSqftPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-estate-grey mt-1">
              Benchmark for Kanyakumari urban core
            </div>
          </div>

          <div className="bg-white border border-estate-stone/70 p-5">
            <div className="flex items-center justify-between text-estate-grey mb-2">
              <span className="label-xs">New Client Site Visits</span>
              <MessageSquare className="w-4 h-4 text-estate-forest" />
            </div>
            <div className="text-3xl font-serif font-bold text-estate-charcoal tabular-nums">
              {stats.newEnquiries}
            </div>
            <div className="text-[11px] text-estate-grey mt-1">
              {stats.totalEnquiries} lifetime records logged
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Recent Enquiries vs Locality Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-8 bg-white border border-estate-stone/70 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-estate-stone/50 mb-5">
            <div>
              <span className="label-sm text-estate-forest">Direct Lead Register</span>
              <h2 className="text-lg font-serif font-bold text-estate-charcoal mt-0.5">
                Recent Client Enquiries & Scheduled Site Visits
              </h2>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs text-estate-forest hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Manage All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-estate-stone/50 text-[10px] uppercase font-semibold text-estate-grey tracking-wider">
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Interested Property</th>
                  <th className="pb-3 font-semibold">Service Type</th>
                  <th className="pb-3 font-semibold">Lead Status</th>
                  <th className="pb-3 font-semibold text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-stone/30">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="table-row-hover">
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-estate-charcoal">{enq.name}</div>
                      <div className="text-[11px] text-estate-grey font-mono">{enq.phone}</div>
                    </td>
                    <td className="py-3.5 pr-3 max-w-[200px]">
                      <div className="truncate text-estate-charcoal font-medium">
                        {enq.propertyTitle}
                      </div>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="inline-block bg-estate-ivory border border-estate-stone/60 text-[10px] font-medium px-2 py-0.5 text-estate-charcoal">
                        {enq.type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : enq.status === 'Scheduled'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-estate-grey font-mono text-[11px]">
                      {getRelativeTime(enq.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Inventory Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          {/* Property Category Concentration */}
          <div className="bg-white border border-estate-stone/70 p-6">
            <span className="label-sm text-estate-forest block mb-1">Asset Allocation</span>
            <h3 className="text-base font-serif font-bold text-estate-charcoal mb-4">
              Inventory by Property Type
            </h3>

            <div className="space-y-3">
              {Object.entries(typeCounts).map(([type, count]) => {
                const percentage = Math.round((count / properties.length) * 100);
                return (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-estate-charcoal font-medium">{type}</span>
                      <span className="text-estate-grey font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-estate-stone/40 overflow-hidden">
                      <div
                        className="h-full bg-estate-forest"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Nagercoil Micro-Markets */}
          <div className="bg-white border border-estate-stone/70 p-6">
            <span className="label-sm text-estate-forest block mb-1">Geographic Density</span>
            <h3 className="text-base font-serif font-bold text-estate-charcoal mb-4">
              Top Active Localities
            </h3>

            <div className="space-y-2.5 text-xs">
              {topLocalities.map(([locality, count]) => (
                <div
                  key={locality}
                  className="flex items-center justify-between p-2.5 bg-estate-ivory border border-estate-stone/50"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-estate-forest" />
                    <span className="font-medium text-estate-charcoal">{locality}</span>
                  </div>
                  <span className="font-mono text-estate-grey font-semibold">
                    {count} listing{count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-estate-stone/40 text-center">
              <Link
                to="/admin/properties"
                className="text-xs text-estate-forest hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>View Full 15-Locality Registry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
