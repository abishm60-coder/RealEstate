# KumariNest — Premium Real Estate Platform (Nagercoil, Tamil Nadu)

An art-directed, commercial real estate platform built specifically for **Nagercoil and Kanyakumari District, Tamil Nadu, India**. Built with modern web architecture (React 18, TypeScript, Tailwind CSS, Vite) featuring editorial typography, bespoke micro-interactions, responsive filters, and an enterprise admin console.

![KumariNest Logo](public/logo.png)

---

## ✨ Features & Capabilities

### 🏡 Localized for Nagercoil & Kanyakumari District
- **15 Regional Localities:** N.G.O Colony, Vetturnimadam, Vadasery, Kottar, Weavers Colony, Nesamony Nagar, Asaripallam, Simon Nagar, Parvathipuram, Therakalputhoor, Chunkankadai, Manavilai, Ozhuginasery, Ramanputhur, and Puthukudierupu.
- **Indian Pricing Conventions:** Formatted with Indian Lakhs and Crores (e.g. ₹35,00,000, ₹1.05 Cr) and price-per-sq.ft metrics.
- **Regional Real Estate Dossiers:** Explicit tracking of DTCP / LPA planning approvals, TN RERA compliance status, Patta / Chitta documentation, water sources (Bore well / Mukkadal Dam), and Sub-Registrar Office proximity.
- **Landmarks & Connectivity:** Travel distance to Padmanabhapuram Palace, Kanyakumari Cape, Vivekananda Rock, Trivandrum International Airport (TRV), Nagercoil Junction, and local medical/educational institutions.

### 🔍 Discovery & Property Filtering
- **Zero-lag URL Synchronized Filters:** Filter by Transaction Type (Buy / Rent), Classification (Houses, Luxury Villas, Apartments, Plots, Commercial), Locality, Budget range, and Bedrooms (BHK).
- **Sorting Modes:** Newest First, Price (Low to High / High to Low), and Area (Largest).
- **Asymmetric Editorial Layouts:** High-end architectural photography, custom aspect ratios, and badge verification indicators.

### 📑 Property Editorial Dossier
- Comprehensive image galleries with responsive thumbnails and fallback handlers.
- Integrated **Tamil Nadu Home Loan & EMI Calculator** (Principal, Interest rate, Tenure).
- Dedicated legal verification badge, transit milestones, agent contact cards, and instant WhatsApp inquiry dispatch.

### 🛡️ Enterprise Admin Console
- **Executive Dashboard:** Live inventory counts, total portfolio valuation (Crores), pipeline leads, locality distribution, and property type breakdown.
- **Full Inventory Management (CRUD):** Add, update, view, and toggle active/verified status across listings with custom image URLs and amenity tags.
- **Lead & Site Visit CRM:** Status tracking pipeline (New, Contacted, Scheduled, Closed) with one-click direct WhatsApp integration and phone dialing.

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 6
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS with custom editorial design tokens (Warm Ivory, Deep Charcoal, Forest Green, Muted Stone)
- **Typography:** Playfair Display (Serif) & Plus Jakarta Sans
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <your-github-repo-url>
cd "real Estate"

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Preview
```bash
# Compile TypeScript and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
real Estate/
├── public/
│   ├── favicon.svg
│   ├── logo.png             # KumariNest brand identity mark
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Header with transparency scroll & mobile drawer
│   │   └── Footer.tsx       # Regional footer with quick links & RERA badge
│   ├── context/
│   │   └── PropertyContext.tsx # Central reactive state & CRUD operations
│   ├── data/
│   │   └── properties.ts    # Nagercoil property inventory, agents, and landmarks
│   ├── layouts/
│   │   ├── PublicLayout.tsx # Main consumer layout wrapper
│   │   └── AdminLayout.tsx  # Executive admin dashboard layout
│   ├── lib/
│   │   └── utils.ts         # Currency formatting, date math, area converters
│   ├── pages/
│   │   ├── HomePage.tsx     # Editorial hero, asymmetric showcase, landmarks
│   │   ├── PropertiesPage.tsx # Advanced faceted search & discovery
│   │   ├── PropertyDetailPage.tsx # Editorial dossier & EMI calculator
│   │   ├── AboutPage.tsx    # Nagercoil market heritage & company story
│   │   ├── ContactPage.tsx  # Office desk info, FAQs & advisory form
│   │   └── admin/
│   │       ├── AdminDashboard.tsx   # Visual metrics & recent inquiries
│   │       ├── AdminProperties.tsx  # Inventory management table
│   │       ├── AdminPropertyForm.tsx# Comprehensive listing creator
│   │       └── AdminEnquiries.tsx   # Lead pipeline manager
│   ├── App.tsx              # Application routing table
│   ├── main.tsx             # Application bootstrap
│   └── index.css            # Base styles & custom utility classes
├── index.html               # Document root with Google Webfonts
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📜 License & Compliance

© 2026 KumariNest Real Estate Platform. All rights reserved. Nagercoil, Kanyakumari District, Tamil Nadu.
Compliant with Tamil Nadu Real Estate Regulatory Authority (TNRERA) disclosure standards.
