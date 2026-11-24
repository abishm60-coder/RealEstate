// ============================================================
// KumariNest — AdminLayout
// Serious commercial business management application interface
// ============================================================

import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';

export default function AdminLayout() {
  const location = useLocation();
  const { stats } = useProperties();

  // Navigation items
  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Operational Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/admin/properties',
      end: false,
      label: 'Property Inventory',
      icon: Building2,
      badge: stats.activeListings,
    },
    {
      to: '/admin/properties/new',
      end: true,
      label: 'Add New Listing',
      icon: PlusCircle,
      badge: null,
    },
    {
      to: '/admin/enquiries',
      end: true,
      label: 'Client Enquiries & Visits',
      icon: MessageSquare,
      badge: stats.newEnquiries > 0 ? stats.newEnquiries : null,
    },
  ];

  // Dynamic header title helper
  function getPageTitle() {
    const path = location.pathname;
    if (path === '/admin') return 'Regional Executive Dashboard';
    if (path === '/admin/properties') return 'Property Inventory Management';
    if (path === '/admin/properties/new') return 'New Listing Dossier Form';
    if (path.includes('/edit')) return 'Update Listing Specifications';
    if (path === '/admin/enquiries') return 'Lead Management & Site Escort Log';
    return 'Admin Management Console';
  }

  return (
    <div className="min-h-screen bg-[#F4F4F1] flex flex-col md:flex-row text-estate-charcoal font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-estate-stone/70 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-estate-stone/50 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" title="Back to KumariNest homepage">
              <img src="/logo.png" alt="KumariNest" className="h-7 w-auto" />
              <span className="font-serif text-lg font-bold tracking-tight text-estate-charcoal">
                KumariNest
              </span>
            </Link>
            <span className="text-[10px] font-mono uppercase bg-estate-ivory border border-estate-stone px-1.5 py-0.5 text-estate-grey font-semibold">
              Admin
            </span>
          </div>

          {/* Region identifier */}
          <div className="px-6 py-3 bg-estate-ivory/50 border-b border-estate-stone/40 flex items-center gap-2 text-[11px] text-estate-grey font-medium">
            <MapPin className="w-3.5 h-3.5 text-estate-forest" />
            <span>Nagercoil Operations Hub</span>
          </div>

          {/* Nav links */}
          <nav className="p-3 space-y-1">
            <span className="label-xs text-estate-grey-light px-3 py-2 block">Management</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-estate-ivory text-estate-forest border-l-2 border-estate-forest font-semibold'
                        : 'text-estate-charcoal/80 hover:bg-estate-ivory/60 hover:text-estate-charcoal'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className="text-[10px] font-mono bg-estate-stone/50 text-estate-charcoal px-1.5 py-0.2 rounded-sm font-semibold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info & link back */}
        <div className="p-4 border-t border-estate-stone/50 bg-estate-ivory/40 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-estate-grey">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>TN RERA Registered Desk</span>
          </div>
          <Link
            to="/"
            className="flex items-center justify-between p-2 text-xs text-estate-charcoal hover:bg-estate-stone/30 transition-colors font-medium"
          >
            <span>View Public Platform</span>
            <ExternalLink className="w-3.5 h-3.5 text-estate-grey" />
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Control Bar */}
        <header className="h-16 bg-white border-b border-estate-stone/60 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-base font-semibold text-estate-charcoal">
              {getPageTitle()}
            </h1>
            <p className="text-[11px] text-estate-grey font-sans">
              Kanyakumari District Property Registry & Audit Engine
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/properties/new"
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Listing</span>
            </Link>
          </div>
        </header>

        {/* Page View Body */}
        <main className="p-6 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
