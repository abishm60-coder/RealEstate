// ============================================================
// KumariNest — Navbar
// Editorial, luxury real estate navigation bar
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparentOnDark = isHome && !scrolled;

  // Active navigation queries
  const isAllListings =
    location.pathname === '/properties' &&
    (!location.search || location.search === '' || location.search === '?');
  const isHouses =
    location.pathname === '/properties' &&
    location.search.toLowerCase().includes('type=house');
  const isApartments =
    location.pathname === '/properties' &&
    location.search.toLowerCase().includes('type=apartment');
  const isPlots =
    location.pathname === '/properties' &&
    location.search.toLowerCase().includes('type=plot');
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentOnDark
          ? 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
          : 'bg-estate-ivory/95 backdrop-blur-md border-b border-estate-stone/50 py-3.5 shadow-subtle text-estate-charcoal'
      }`}
    >
      <nav className="container-full flex items-center justify-between">
        {/* Left: Logo treatment */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <img src="/logo.png" alt="KumariNest" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl tracking-tight leading-none ${
                isTransparentOnDark ? 'text-white' : 'text-estate-charcoal'
              }`}
            >
              KumariNest
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.2em] font-sans font-semibold mt-0.5 ${
                isTransparentOnDark ? 'text-white/60' : 'text-estate-grey'
              }`}
            >
              Nagercoil · Kanyakumari
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/properties"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isAllListings
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            All Listings
          </Link>

          <Link
            to="/properties?type=House,Villa"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isHouses
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            Houses & Villas
          </Link>

          <Link
            to="/properties?type=Apartment"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isApartments
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            Apartments
          </Link>

          <Link
            to="/properties?type=Plot"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isPlots
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            Residential Plots
          </Link>

          <Link
            to="/about"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isAbout
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none ${
              isContact
                ? 'text-estate-forest font-bold border-b border-estate-forest pb-0.5'
                : isTransparentOnDark
                ? 'font-medium text-white/80 hover:text-white'
                : 'font-medium text-estate-charcoal/80 hover:text-estate-charcoal'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right: Admin Console + Primary Action */}
        <div className="flex items-center gap-3">
          {/* Admin link */}
          <Link
            to="/admin"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors focus:outline-none ${
              isTransparentOnDark
                ? 'border-white/30 text-white/90 hover:bg-white/10'
                : 'border-estate-stone text-estate-charcoal hover:bg-estate-stone/30'
            }`}
            title="Open Admin Management Console"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Admin Portal</span>
          </Link>

          {/* List Property */}
          <Link
            to="/admin/properties/new"
            className={`btn text-xs font-semibold py-2 px-4 transition-all duration-200 focus:outline-none ${
              isTransparentOnDark
                ? 'bg-estate-forest text-white hover:bg-estate-forest-dark'
                : 'btn-primary'
            }`}
          >
            List Property
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors focus:outline-none ${
              isTransparentOnDark ? 'text-white' : 'text-estate-charcoal'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-full pb-6 pt-4 flex flex-col gap-1 bg-estate-ivory border-t border-estate-stone/40 text-estate-charcoal shadow-elevated">
          <Link
            to="/properties"
            className="py-2.5 text-xs font-sans font-semibold uppercase tracking-widest border-b border-estate-stone/20"
          >
            Browse All Properties
          </Link>
          <Link
            to="/properties?type=House,Villa"
            className="py-2.5 text-xs font-sans font-medium uppercase tracking-widest border-b border-estate-stone/20"
          >
            Independent Houses & Villas
          </Link>
          <Link
            to="/properties?type=Apartment"
            className="py-2.5 text-xs font-sans font-medium uppercase tracking-widest border-b border-estate-stone/20"
          >
            Apartments & Flats
          </Link>
          <Link
            to="/properties?type=Plot"
            className="py-2.5 text-xs font-sans font-medium uppercase tracking-widest border-b border-estate-stone/20"
          >
            Residential Land & Plots
          </Link>
          <Link
            to="/about"
            className="py-2.5 text-xs font-sans font-medium uppercase tracking-widest border-b border-estate-stone/20"
          >
            About KumariNest
          </Link>
          <Link
            to="/contact"
            className="py-2.5 text-xs font-sans font-medium uppercase tracking-widest border-b border-estate-stone/20"
          >
            Contact & Advisory
          </Link>
          <Link
            to="/admin"
            className="py-2.5 text-xs font-sans font-semibold text-estate-forest uppercase tracking-widest flex items-center justify-between"
          >
            <span>Admin Management Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
