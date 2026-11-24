// ============================================================
// KumariNest — Utility Functions
// ============================================================

/**
 * Format price in Indian Rupee notation (₹35,00,000)
 */
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const crores = price / 10000000;
    if (Number.isInteger(crores)) return `₹${crores} Cr`;
    return `₹${crores.toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    const lakhs = price / 100000;
    if (Number.isInteger(lakhs)) return `₹${lakhs} Lakh`;
    return `₹${lakhs.toFixed(1)} Lakh`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Format full price with Indian number system
 */
export function formatPriceFull(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Format area with unit
 */
export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString('en-IN')} ${unit}`;
}

/**
 * Generate property specs summary
 */
export function getPropertySpecs(property: {
  bedrooms?: number;
  bathrooms?: number;
  builtUpArea?: number;
  builtUpAreaUnit?: string;
  landArea?: number;
  landAreaUnit?: string;
}): string {
  const parts: string[] = [];
  if (property.bedrooms) parts.push(`${property.bedrooms} BHK`);
  if (property.builtUpArea) parts.push(`${property.builtUpArea} ${property.builtUpAreaUnit}`);
  else if (property.landArea) parts.push(`${property.landArea} ${property.landAreaUnit}`);
  return parts.join(' · ');
}

/**
 * Slugify text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Relative time string
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * cn utility for conditional classnames
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
