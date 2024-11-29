// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  domain: string;
  plan: SubscriptionPlan;
  settings: OrganizationSettings;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio?: string;
  avatar?: string;
  company: string;
  companyLogo?: string;
  theme: Theme;
  social: SocialLinks;
  contact: ContactInfo;
  createdAt: string;
  updatedAt: string;
}

// Settings & Configuration
export interface Settings {
  id: string;
  userId: string;
  theme: Theme;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSettings {
  allowMemberInvites: boolean;
  requireAdminApproval: boolean;
  customDomain?: string;
  brandingEnabled: boolean;
  analyticsEnabled: boolean;
}

export interface Theme {
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  cardViews: boolean;
  leadCapture: boolean;
}

export interface PrivacySettings {
  showEmail: boolean;
  showPhone: boolean;
  allowLeadCapture: boolean;
  publicProfile: boolean;
}

// Contact & Social
export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
  address?: Address;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// Analytics & Tracking
export interface Analytics {
  views: number;
  saves: number;
  clicks: number;
  leads: number;
  lastViewed?: string;
  locations: Location[];
  events: AnalyticsEvent[];
}

export interface Location {
  city: string;
  country: string;
  timestamp: string;
  count: number;
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  metadata: Record<string, any>;
  timestamp: string;
}

// Lead Management
export interface Lead {
  id: string;
  cardId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

// Enums
export type UserRole = 'admin' | 'member';
export type SubscriptionPlan = 'basic' | 'pro' | 'enterprise';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';