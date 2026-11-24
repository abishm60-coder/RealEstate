// ============================================================
// KumariNest — ContactPage
// Nagercoil Advisory & Property Help Desk
// ============================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  Send,
  HelpCircle
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';

const FAQS = [
  {
    q: 'How do I verify DTCP/LPA approval for plots in Nagercoil?',
    a: 'Every plot listed on KumariNest includes verified DTCP / Local Planning Authority (LPA) approval numbers. Our legal team cross-checks records directly with the District Town and Country Planning office on Collectorate Road.',
  },
  {
    q: 'What is the guideline value vs market value in Nagercoil?',
    a: 'Guideline value is the government-mandated minimum valuation set by the Tamil Nadu Registration Department, whereas market value reflects current transaction rates. We provide transparent estimates for both so you can plan stamp duty and registration expenses accurately.',
  },
  {
    q: 'Can NRIs purchase residential properties in Kanyakumari District?',
    a: 'Yes. Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely buy residential and commercial properties in Tamil Nadu under RBI regulations. Our legal advisors assist with NRE/NRO banking and Power of Attorney (PoA) registration.',
  },
  {
    q: 'What are the typical water sources in Nagercoil neighbourhoods?',
    a: 'Most independent houses in areas like N.G.O Colony, Vetturnimadam, and Vadasery enjoy continuous bore well water alongside Mukkadal Dam municipality connections. Every property dossier on KumariNest explicitly documents available water connections.',
  },
];

export default function ContactPage() {
  const { addEnquiry } = useProperties();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'All Localities',
    propertyType: 'House',
    budget: '₹40–70 Lakh',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      propertyId: 'general',
      propertyTitle: `General Enquiry (${formData.propertyType} in ${formData.locality})`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `Preferred Locality: ${formData.locality} | Budget: ${formData.budget}\n\n${formData.message}`,
      type: 'General',
    });
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-estate-offwhite">
      {/* Header */}
      <section className="bg-estate-charcoal text-white pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-full">
          <nav className="flex items-center gap-2 text-xs text-estate-stone/60 mb-4 font-sans">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact & Advisory</span>
          </nav>
          <h1 className="text-3xl md:text-5xl text-white mb-3">
            Contact KumariNest Advisory
          </h1>
          <p className="text-estate-stone/70 text-base max-w-xl font-sans">
            Have questions about buying, renting or listing a property in Nagercoil?
            Our local advisory team is here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="container-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Office Contacts & Desk Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="label-sm mb-2 block">CENTRAL OPERATIONS</span>
              <h2 className="text-2xl md:text-3xl text-estate-charcoal mb-4">
                Nagercoil Advisory Desk
              </h2>
              <p className="text-sm text-estate-grey leading-relaxed">
                Visit our office or reach out directly to speak with an experienced
                property consultant specializing in Kanyakumari District real estate.
              </p>
            </div>

            {/* Quick Cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white border border-estate-stone/50 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-estate-forest flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-estate-charcoal mb-1">Office Address</h4>
                  <p className="text-estate-grey leading-relaxed text-xs sm:text-sm">
                    2nd Floor, Royal Heritage Complex,<br />
                    Near Court Road / K.P. Road Junction,<br />
                    Nagercoil 629001, Kanyakumari District, Tamil Nadu.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-estate-stone/50 flex items-start gap-4">
                <Phone className="w-5 h-5 text-estate-forest flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-estate-charcoal mb-1">Direct Calling</h4>
                  <p className="text-estate-grey text-xs sm:text-sm mb-1">
                    Central Advisory: <a href="tel:+919443100000" className="text-estate-forest font-medium hover:underline">+91 94431 00000</a>
                  </p>
                  <p className="text-estate-grey text-xs sm:text-sm">
                    Documentation Cell: <a href="tel:+919842100000" className="text-estate-forest font-medium hover:underline">+91 98421 00000</a>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-estate-stone/50 flex items-start gap-4">
                <Mail className="w-5 h-5 text-estate-forest flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-estate-charcoal mb-1">Email Queries</h4>
                  <p className="text-estate-grey text-xs sm:text-sm">
                    General Inquiries: <a href="mailto:contact@kumarinest.in" className="text-estate-forest font-medium hover:underline">contact@kumarinest.in</a>
                  </p>
                  <p className="text-estate-grey text-xs sm:text-sm">
                    Legal & Verification: <a href="mailto:legal@kumarinest.in" className="text-estate-forest font-medium hover:underline">legal@kumarinest.in</a>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-estate-stone/50 flex items-start gap-4">
                <Clock className="w-5 h-5 text-estate-forest flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-estate-charcoal mb-1">Consulting Hours</h4>
                  <p className="text-estate-grey text-xs sm:text-sm">
                    Monday – Saturday: 9:00 AM – 7:30 PM IST<br />
                    Sunday: By Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 bg-estate-forest text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                <h4 className="font-sans font-semibold text-base">Instant WhatsApp Desk</h4>
              </div>
              <p className="text-xs text-estate-stone/80 mb-4 leading-relaxed">
                Connect with our duty advisor right now on WhatsApp for instant property
                brochures, location pins and video walk-throughs.
              </p>
              <a
                href="https://wa.me/919443100000?text=Hi%20KumariNest%2C%20I%20am%20looking%20for%20property%20in%20Nagercoil"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark w-full text-center inline-block text-xs uppercase tracking-wider py-2.5 font-semibold"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right: Interactive Consultation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-estate-stone/50 p-8 sm:p-10 shadow-subtle">
              <span className="label-sm mb-2 block">PROPERTY INQUIRY</span>
              <h3 className="text-2xl text-estate-charcoal mb-2 font-serif">
                Request a Consultation
              </h3>
              <p className="text-sm text-estate-grey mb-8">
                Tell us about your requirements. One of our dedicated Nagercoil property specialists will respond within 4 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-estate-ivory border border-estate-forest/30 text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-estate-forest mx-auto mb-4" />
                  <h4 className="text-xl font-serif text-estate-charcoal mb-2">
                    Enquiry Dispatched Successfully
                  </h4>
                  <p className="text-sm text-estate-grey max-w-md mx-auto mb-6">
                    Thank you, {formData.name}. Our senior advisor for {formData.locality} has received your request and will call you at {formData.phone}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        locality: 'All Localities',
                        propertyType: 'House',
                        budget: '₹40–70 Lakh',
                        message: '',
                      });
                    }}
                    className="btn-secondary text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label-xs block mb-2">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Kumar"
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-2">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 94431 XXXXX"
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-xs block mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anand@example.com"
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="label-xs block mb-2">Property Type</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="select-field text-sm"
                      >
                        <option value="House">Independent House</option>
                        <option value="Villa">Luxury Villa</option>
                        <option value="Apartment">Apartment / Flat</option>
                        <option value="Plot">Residential Plot</option>
                        <option value="Commercial">Commercial Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="label-xs block mb-2">Preferred Locality</label>
                      <select
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        className="select-field text-sm"
                      >
                        <option value="All Localities">Any Locality</option>
                        <option value="N.G.O Colony">N.G.O Colony</option>
                        <option value="Vetturnimadam">Vetturnimadam</option>
                        <option value="Vadasery">Vadasery</option>
                        <option value="Kottar">Kottar</option>
                        <option value="Weavers Colony">Weavers Colony</option>
                        <option value="Nesamony Nagar">Nesamony Nagar</option>
                        <option value="Asaripallam">Asaripallam</option>
                        <option value="Parvathipuram">Parvathipuram</option>
                        <option value="Manavilai">Manavilai</option>
                        <option value="Therakalputhoor">Therakalputhoor</option>
                      </select>
                    </div>

                    <div>
                      <label className="label-xs block mb-2">Budget Target</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="select-field text-sm"
                      >
                        <option value="Under ₹20 Lakh">Under ₹20 Lakh</option>
                        <option value="₹20–40 Lakh">₹20–40 Lakh</option>
                        <option value="₹40–70 Lakh">₹40–70 Lakh</option>
                        <option value="₹70 Lakh – ₹1 Cr">₹70 Lakh – ₹1 Cr</option>
                        <option value="₹1–2 Cr">₹1–2 Cr</option>
                        <option value="Above ₹2 Cr">Above ₹2 Cr</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-xs block mb-2">Specific Requirements / Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your preferred road width, possession date, or request a weekend site escort..."
                      className="input-field text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                      <Send size={15} />
                      <span>Transmit Advisory Request</span>
                    </button>
                    <p className="text-[11px] text-estate-grey text-center mt-3">
                      Your contact details are strictly confidential and shared only with our assigned Nagercoil advisor.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-estate-ivory py-16 md:py-20 border-t border-estate-stone/40">
        <div className="container-full">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-sm mb-2 block">FREQUENT INQUIRIES</span>
              <h2 className="text-2xl md:text-3xl text-estate-charcoal font-serif">
                Buying Real Estate in Nagercoil: FAQ
              </h2>
            </div>

            <div className="space-y-6">
              {FAQS.map((item, index) => (
                <div key={index} className="bg-white p-6 border border-estate-stone/40">
                  <h4 className="text-base font-semibold text-estate-charcoal mb-2 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-estate-forest flex-shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-sm text-estate-grey pl-7 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
