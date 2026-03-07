/**
 * Frontend-safe collection types for the web app.
 *
 * These map CMS data to the shapes needed by UI components,
 * normalizing relationships and media references.
 */

// ────────────────────────────────────────────────────────────────────────────
// Posts (blog)
// ────────────────────────────────────────────────────────────────────────────

export interface PostCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedDate: string | null;
  featuredImage: { url: string; alt: string } | null;
  author: { name: string } | null;
}

export interface PostDetail extends PostCard {
  content: unknown; // Lexical rich text JSON
}

// ────────────────────────────────────────────────────────────────────────────
// Events
// ────────────────────────────────────────────────────────────────────────────

export interface EventCard {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string | null;
  venue: string;
  address: string | null;
  city: string;
  coverImage: { url: string; alt: string } | null;
  tags: string[];
  registrationLink: string | null;
  status: 'upcoming' | 'past';
}

export interface EventDetail extends EventCard {
  speakers: Array<{
    name: string;
    role: string | null;
    topic: string | null;
    avatar: { url: string; alt: string } | null;
    twitter: string | null;
    linkedin: string | null;
  }>;
  agenda: Array<{
    time: string;
    title: string;
    speaker: string | null;
  }>;
  richDescription: unknown; // Lexical rich text JSON
}

// ────────────────────────────────────────────────────────────────────────────
// Sponsors
// ────────────────────────────────────────────────────────────────────────────

export interface SponsorCard {
  id: string;
  name: string;
  tier: 'gold' | 'silver' | 'bronze' | 'partner';
  logo: { url: string; alt: string };
  url: string;
  description: string | null;
}

// ────────────────────────────────────────────────────────────────────────────
// Leaders
// ────────────────────────────────────────────────────────────────────────────

export interface LeaderCard {
  id: string;
  name: string;
  role: string;
  image: { url: string; alt: string };
  bio: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
}

// ────────────────────────────────────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────────────────────────────────────

export interface GalleryItemCard {
  id: string;
  image: { url: string; alt: string };
  caption: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Navigation & Layout
// ────────────────────────────────────────────────────────────────────────────

export interface NavigationData {
  items: Array<{ label: string; url: string }>;
  ctaButton: { label: string; url: string } | null;
}

export interface FooterData {
  columns: Array<{
    heading: string;
    links: Array<{ label: string; url: string }>;
  }>;
  socialLinks: Array<{
    platform: 'twitter' | 'github' | 'linkedin' | 'youtube' | 'discord';
    url: string;
  }>;
  nextEventCallout: {
    enabled: boolean;
    heading: string | null;
    description: string | null;
  } | null;
  copyright: string | null;
}

export interface SiteSettingsData {
  siteName: string;
  siteDescription: string | null;
  siteUrl: string | null;
  defaultSEO: {
    title: string | null;
    description: string | null;
    ogImage: { url: string; alt: string } | null;
  };
  contactEmail: string | null;
  newsletterEndpoint: string | null;
}

// ────────────────────────────────────────────────────────────────────────────
// Home page
// ────────────────────────────────────────────────────────────────────────────

export interface HomePageData {
  hero: {
    heading: string;
    subheading: string | null;
    primaryCTA: { label: string; url: string } | null;
    secondaryCTA: { label: string; url: string } | null;
    backgroundVideo: { url: string } | null;
  };
  stats: Array<{ label: string; value: string }>;
  featuredProjectsHeading: string | null;
  sponsorsHeading: string | null;
  blogHeading: string | null;
}
