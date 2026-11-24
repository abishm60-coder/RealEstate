// ============================================================
// KumariNest — Footer
// Understated luxury, authoritative commercial real estate footer
// ============================================================

import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

const propertyLinks = [
  { label: 'Independent Houses', to: '/properties?type=House' },
  { label: 'Luxury Villas', to: '/properties?type=Villa' },
  { label: 'Apartments & Flats', to: '/properties?type=Apartment' },
  { label: 'Residential Plots', to: '/properties?type=Plot' },
  { label: 'Commercial Spaces', to: '/properties?type=Commercial' },
];

const localityLinks = [
  { label: 'N.G.O Colony', to: '/properties?locality=N.G.O+Colony' },
  { label: 'Vetturnimadam', to: '/properties?locality=Vetturnimadam' },
  { label: 'Vadasery', to: '/properties?locality=Vadasery' },
  { label: 'Weavers Colony', to: '/properties?locality=Weavers+Colony' },
  { label: 'Nesamony Nagar', to: '/properties?locality=Nesamony+Nagar' },
];

export default function Footer() {
  return (
    <footer className="bg-estate-charcoal text-white">
      {/* Main Footer Body */}
      <div className="container-full py-16 md:py-20 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1 — Brand Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img src="/logo.png" alt="KumariNest" className="h-8 w-auto" />
              <span className="font-serif text-2xl tracking-tight text-white">
                KumariNest
              </span>
            </Link>

            <p className="text-estate-stone/70 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              KumariNest is a specialized commercial and residential advisory serving Nagercoil,
              Kottar, Vadasery, and the wider Kanyakumari District. We represent verified title-deed
              properties with transparent pricing and local conveyancing assistance.
            </p>

            <div className="space-y-1.5 text-xs text-estate-stone/60 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-estate-gold flex-shrink-0" />
                <span>Court Road / K.P. Road, Nagercoil 629001, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>TN RERA Registered Advisory Desk</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Categorized Properties (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="label-sm text-estate-stone/50 mb-4 tracking-[0.16em]">
              Property Classifications
            </h4>
            <ul className="space-y-2.5">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Key Localities & Pages (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="label-sm text-estate-stone/50 mb-4 tracking-[0.16em]">
              Nagercoil Localities
            </h4>
            <ul className="space-y-2.5">
              {localityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/about"
                  className="text-xs text-estate-gold hover:text-estate-gold-light transition-colors font-medium block"
                >
                  About KumariNest
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xs text-estate-gold hover:text-estate-gold-light transition-colors font-medium block"
                >
                  Contact & Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact & Admin Console (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="label-sm text-estate-stone/50 mb-4 tracking-[0.16em]">
              Direct Assistance
            </h4>

            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="tel:+919443100000"
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-estate-forest-light" />
                  <span>+91 94431 00000 (Central Desk)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@kumarinest.in"
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-estate-forest-light" />
                  <span>contact@kumarinest.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919443100000?text=Hi%2C%20I%20am%20looking%20for%20property%20in%20Nagercoil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp Property Desk</span>
                </a>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/10">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-estate-gold hover:text-estate-gold-light transition-colors font-semibold uppercase tracking-wider"
              >
                <span>Enterprise Admin Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-full py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-estate-stone/40 font-mono">
        <div>
          © 2026 KumariNest Real Estate Platform · All rights reserved. Nagercoil, TN.
        </div>
        <div className="flex items-center gap-6 text-[11px]">
          <span>DTCP / LPA Compliant</span>
          <span>·</span>
          <span>Verified Titles Only</span>
          <span>·</span>
          <span>Encumbrance Audited</span>
        </div>
      </div>
    </footer>
  );
}
