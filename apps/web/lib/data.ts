/**
 * CMS data layer with graceful fallback to static data.
 *
 * Each function tries the CMS first. If it's unreachable or the request fails,
 * the static arrays from `data.ts` are used instead. This allows the site to
 * work during local development even when the CMS server is not running.
 *
 * The returned shapes match the existing web-app types defined in `types.ts`,
 * so page rendering code requires minimal changes.
 */

import type {
  Event,
  BlogPost,
  Sponsor,
  GalleryItem,
  Leader,
  Project,
} from '../types';

import {
  getPosts as cmsPosts,
  getPostBySlug as cmsPostBySlug,
  getEvents as cmsEvents,
  getEventBySlug as cmsEventBySlug,
  getSponsors as cmsSponsors,
  getLeaders as cmsLeaders,
  getGallery as cmsGallery,
} from './cms';

import {
  EVENTS,
  BLOG_POSTS,
  SPONSORS,
  LEADERS,
  GALLERY,
  PROJECTS,
} from '../data';

// ────────────────────────────────────────────────────────────────────────────
// Posts / Blog
// ────────────────────────────────────────────────────────────────────────────

export async function fetchBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const posts = await cmsPosts(limit);
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.publishedDate ?? '',
      authorName: p.author?.name ?? 'Unknown',
      excerpt: p.excerpt,
      content: '',
      coverImage: p.featuredImage?.url ?? undefined,
      tags: p.tags,
      readingTime: '5 min read',
    })) satisfies BlogPost[];
  } catch {
    const data = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
    return data;
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const p = await cmsPostBySlug(slug);
    if (!p) return null;
    return {
      slug: p.slug,
      title: p.title,
      date: p.publishedDate ?? '',
      authorName: p.author?.name ?? 'Unknown',
      excerpt: p.excerpt,
      content: p.content as string,
      coverImage: p.featuredImage?.url ?? undefined,
      tags: p.tags,
      readingTime: '5 min read',
    };
  } catch {
    return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

/** If the post content is Lexical rich text (object), return it for RichText renderer. */
export function isRichTextContent(content: unknown): boolean {
  return typeof content === 'object' && content !== null && 'root' in (content as Record<string, unknown>);
}

// ────────────────────────────────────────────────────────────────────────────
// Events
// ────────────────────────────────────────────────────────────────────────────

export async function fetchEvents(status?: 'upcoming' | 'past'): Promise<Event[]> {
  try {
    const events = await cmsEvents(status);
    return events.map((e) => ({
      slug: e.slug,
      title: e.title,
      date: e.date,
      time: e.time ?? '',
      venue: e.venue,
      address: e.address ?? '',
      city: e.city,
      speakers: [],
      agenda: [],
      ticketsUrl: e.registrationLink ?? undefined,
      coverImage: e.coverImage?.url ?? undefined,
      tags: e.tags,
      status: e.status,
      description: e.description,
    })) satisfies Event[];
  } catch {
    const all = status ? EVENTS.filter((e) => e.status === status) : EVENTS;
    return all;
  }
}

export async function fetchEvent(slug: string): Promise<Event | null> {
  try {
    const detail = await cmsEventBySlug(slug);
    if (!detail) return null;
    return {
      slug: detail.slug,
      title: detail.title,
      date: detail.date,
      time: detail.time ?? '',
      venue: detail.venue,
      address: detail.address ?? '',
      city: detail.city,
      speakers: detail.speakers.map((s) => ({
        name: s.name,
        role: s.role ?? undefined,
        topic: s.topic ?? undefined,
        avatar: s.avatar?.url ?? undefined,
        twitter: s.twitter ?? undefined,
        linkedin: s.linkedin ?? undefined,
      })),
      agenda: detail.agenda.map((a) => ({
        time: a.time,
        title: a.title,
        speaker: a.speaker ?? undefined,
      })),
      ticketsUrl: detail.registrationLink ?? undefined,
      coverImage: detail.coverImage?.url ?? undefined,
      tags: detail.tags,
      status: detail.status,
      description: detail.description,
    };
  } catch {
    return EVENTS.find((e) => e.slug === slug) ?? null;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Sponsors
// ────────────────────────────────────────────────────────────────────────────

export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const sponsors = await cmsSponsors();
    return sponsors.map((s) => ({
      id: s.id,
      name: s.name,
      tier: (s.tier.charAt(0).toUpperCase() + s.tier.slice(1)) as Sponsor['tier'],
      logo: s.logo.url,
      url: s.url,
      description: s.description ?? '',
    }));
  } catch {
    return SPONSORS;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Leaders
// ────────────────────────────────────────────────────────────────────────────

export async function fetchLeaders(): Promise<Leader[]> {
  try {
    const leaders = await cmsLeaders();
    return leaders.map((l) => ({
      name: l.name,
      role: l.role,
      image: l.image.url,
      twitter: l.twitter ?? undefined,
      linkedin: l.linkedin ?? undefined,
    }));
  } catch {
    return LEADERS;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────────────────────────────────────

export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const items = await cmsGallery();
    return items.map((g) => ({
      id: g.id,
      src: g.image.url,
      caption: g.caption,
    }));
  } catch {
    return GALLERY;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Projects (no CMS collection yet — always static)
// ────────────────────────────────────────────────────────────────────────────

export function fetchProjects(): Project[] {
  return PROJECTS;
}
