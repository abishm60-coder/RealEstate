// ============================================================
// KumariNest — Property Context (simple state management)
// ============================================================

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { properties as initialProperties, enquiries as initialEnquiries, type Property, type Enquiry, type PropertyStatus } from '@/data/properties';

interface PropertyContextType {
  properties: Property[];
  enquiries: Enquiry[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePropertyStatus: (id: string, status: PropertyStatus) => void;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & Partial<Pick<Enquiry, 'id' | 'createdAt' | 'status'>>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  getProperty: (idOrSlug: string) => Property | undefined;
  getFeaturedProperties: () => Property[];
  getActiveProperties: () => Property[];
  stats: {
    totalProperties: number;
    activeListings: number;
    totalEnquiries: number;
    newEnquiries: number;
    totalValue: number;
  };
}

const PropertyContext = createContext<PropertyContextType | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);

  const addProperty = useCallback((property: Property) => {
    setProperties(prev => [property, ...prev]);
  }, []);

  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  }, []);

  const togglePropertyStatus = useCallback((id: string, status: PropertyStatus) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }, []);

  const addEnquiry = useCallback((enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & Partial<Pick<Enquiry, 'id' | 'createdAt' | 'status'>>) => {
    const newEnquiry: Enquiry = {
      id: enquiryData.id || `enq-${Date.now()}`,
      propertyId: enquiryData.propertyId,
      propertyTitle: enquiryData.propertyTitle,
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone,
      message: enquiryData.message,
      type: enquiryData.type || 'General',
      status: enquiryData.status || 'New',
      createdAt: enquiryData.createdAt || new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  }, []);

  const updateEnquiryStatus = useCallback((id: string, status: Enquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  }, []);

  const getProperty = useCallback((idOrSlug: string) => {
    return properties.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }, [properties]);

  const getFeaturedProperties = useCallback(() => {
    return properties.filter(p => p.isFeatured && p.status === 'Active');
  }, [properties]);

  const getActiveProperties = useCallback(() => {
    return properties.filter(p => p.status === 'Active');
  }, [properties]);

  const stats = {
    totalProperties: properties.length,
    activeListings: properties.filter(p => p.status === 'Active').length,
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter(e => e.status === 'New').length,
    totalValue: properties.filter(p => p.status === 'Active').reduce((sum, p) => sum + p.price, 0),
  };

  return (
    <PropertyContext.Provider value={{
      properties, enquiries,
      addProperty, updateProperty, deleteProperty,
      togglePropertyStatus, addEnquiry, updateEnquiryStatus,
      getProperty, getFeaturedProperties, getActiveProperties,
      stats,
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperties must be used within PropertyProvider');
  return context;
}
