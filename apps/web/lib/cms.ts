import type {
  PayloadListResponse,
  PayloadPost,
  PayloadEvent,
  PayloadPage,
  PayloadSponsor,
  PayloadLeader,
  PayloadGalleryItem,
  PayloadHome,
  PayloadNavigation,
  PayloadFooter,
  PayloadSiteSettings,
} from '@jskla/types';
import type {
  PostCard,
  PostDetail,
  EventCard,
  EventDetail,
  SponsorCard,
  LeaderCard,
  GalleryItemCard,
  NavigationData,
  FooterData,
  SiteSettingsData,
  HomePageData,
} from '@jskla/types';

// ────────────────────────────────────────────────────────────────────────────
// Base fetch
// ────────────────────────────────────────────────────────────────────────────

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002';

async function cmsGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${CMS_URL}/api${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText} – ${path}`);
  }
  return res.json() as Promise<T>;
}

async function cmsGetGlobal<T>(slug: string): Promise<T> {
  return cmsGet<T>(`/globals/${slug}`);
}

// ────────────────────────────────────────────────────────────────────────────
// Media helper
// ────────────────────────────────────────────────────────────────────────────

function resolveMedia(
  media: unknown,
): { url: string; alt: string } | null {
  if (!media || typeof media === 'string') return null;
  const m = media as { url?: string; alt?: string; filename?: string };
  const url = m.url || (m.filename ? `${CMS_URL}/media/${m.filename}` : '');
  if (!url) return null;
  return { url, alt: m.alt || '' };
}

function resolveTags(tags?: Array<{ tag: string }> | null): string[] {
  return tags?.map((t) => t.tag) ?? [];
}

// ────────────────────────────────────────────────────────────────────────────
// Posts
// ────────────────────────────────────────────────────────────────────────────

export async function getPosts(
  limit = 20,
  status: 'published' | 'draft' = 'published',
): Promise<PostCard[]> {
  const data = await cmsGet<PayloadListResponse<PayloadPost>>('/posts', {
    limit: String(limit),
    'where[status][equals]': status,
    sort: '-publishedDate',
    depth: '1',
  });
  return data.docs.map(toPostCard);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const data = await cmsGet<PayloadListResponse<PayloadPost>>('/posts', {
    'where[slug][equals]': slug,
    depth: '1',
    limit: '1',
  });
  const doc = data.docs[0];
  if (!doc) return null;
  return { ...toPostCard(doc), content: doc.content };
}

function toPostCard(doc: PayloadPost): PostCard {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    tags: resolveTags(doc.tags),
    publishedDate: doc.publishedDate ?? null,
    featuredImage: resolveMedia(doc.featuredImage),
    author:
      doc.author && typeof doc.author !== 'string'
        ? { name: doc.author.name }
        : null,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Events
// ────────────────────────────────────────────────────────────────────────────

export async function getEvents(status?: 'upcoming' | 'past'): Promise<EventCard[]> {
  const params: Record<string, string> = {
    limit: '50',
    depth: '1',
    sort: '-date',
  };
  if (status) params['where[status][equals]'] = status;
  const data = await cmsGet<PayloadListResponse<PayloadEvent>>('/events', params);
  return data.docs.map(toEventCard);
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const data = await cmsGet<PayloadListResponse<PayloadEvent>>('/events', {
    'where[slug][equals]': slug,
    depth: '2',
    limit: '1',
  });
  const doc = data.docs[0];
  if (!doc) return null;
  return {
    ...toEventCard(doc),
    speakers:
      doc.speakers?.map((s) => ({
        name: s.name,
        role: s.role ?? null,
        topic: s.topic ?? null,
        avatar: resolveMedia(s.avatar),
        twitter: s.twitter ?? null,
        linkedin: s.linkedin ?? null,
      })) ?? [],
    agenda:
      doc.agenda?.map((a) => ({
        time: a.time,
        title: a.title,
        speaker: a.speaker ?? null,
      })) ?? [],
    richDescription: doc.description,
  };
}

function toEventCard(doc: PayloadEvent): EventCard {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: typeof doc.description === 'string' ? doc.description : '',
    date: doc.date,
    time: doc.time ?? null,
    venue: doc.location.venue,
    address: doc.location.address ?? null,
    city: doc.location.city,
    coverImage: resolveMedia(doc.coverImage),
    tags: resolveTags(doc.tags),
    registrationLink: doc.registrationLink ?? null,
    status: doc.status,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Sponsors
// ────────────────────────────────────────────────────────────────────────────

export async function getSponsors(): Promise<SponsorCard[]> {
  const data = await cmsGet<PayloadListResponse<PayloadSponsor>>('/sponsors', {
    limit: '50',
    depth: '1',
  });
  return data.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    tier: doc.tier,
    logo: resolveMedia(doc.logo) ?? { url: '', alt: doc.name },
    url: doc.url,
    description: doc.description ?? null,
  }));
}

// ────────────────────────────────────────────────────────────────────────────
// Leaders
// ────────────────────────────────────────────────────────────────────────────

export async function getLeaders(): Promise<LeaderCard[]> {
  const data = await cmsGet<PayloadListResponse<PayloadLeader>>('/leaders', {
    limit: '50',
    depth: '1',
    sort: 'sortOrder',
  });
  return data.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    role: doc.role,
    image: resolveMedia(doc.image) ?? { url: '', alt: doc.name },
    bio: doc.bio ?? null,
    twitter: doc.twitter ?? null,
    linkedin: doc.linkedin ?? null,
    github: doc.github ?? null,
  }));
}

// ────────────────────────────────────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryItemCard[]> {
  const data = await cmsGet<PayloadListResponse<PayloadGalleryItem>>('/gallery-items', {
    limit: '100',
    depth: '1',
    sort: 'sortOrder',
  });
  return data.docs.map((doc) => ({
    id: doc.id,
    image: resolveMedia(doc.image) ?? { url: '', alt: doc.caption },
    caption: doc.caption,
  }));
}

// ────────────────────────────────────────────────────────────────────────────
// Pages
// ────────────────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string) {
  const data = await cmsGet<PayloadListResponse<PayloadPage>>('/pages', {
    'where[slug][equals]': slug,
    depth: '2',
    limit: '1',
  });
  return data.docs[0] ?? null;
}

// ────────────────────────────────────────────────────────────────────────────
// Globals
// ────────────────────────────────────────────────────────────────────────────

export async function getHomeData(): Promise<HomePageData> {
  const data = await cmsGetGlobal<PayloadHome>('home');
  return {
    hero: {
      heading: data.hero.heading,
      subheading: data.hero.subheading ?? null,
      primaryCTA: data.hero.primaryCTA?.label
        ? { label: data.hero.primaryCTA.label, url: data.hero.primaryCTA.url || '#' }
        : null,
      secondaryCTA: data.hero.secondaryCTA?.label
        ? { label: data.hero.secondaryCTA.label, url: data.hero.secondaryCTA.url || '#' }
        : null,
      backgroundVideo: resolveMedia(data.hero.backgroundVideo)
        ? { url: resolveMedia(data.hero.backgroundVideo)!.url }
        : null,
    },
    stats: data.stats?.map((s) => ({ label: s.label, value: s.value })) ?? [],
    featuredProjectsHeading: data.featuredProjectsHeading ?? null,
    sponsorsHeading: data.sponsorsHeading ?? null,
    blogHeading: data.blogHeading ?? null,
  };
}

export async function getNavigation(): Promise<NavigationData> {
  const data = await cmsGetGlobal<PayloadNavigation>('navigation');
  return {
    items: data.items?.map((i) => ({ label: i.label, url: i.url })) ?? [],
    ctaButton: data.ctaButton?.label
      ? { label: data.ctaButton.label, url: data.ctaButton.url || '#' }
      : null,
  };
}

export async function getFooter(): Promise<FooterData> {
  const data = await cmsGetGlobal<PayloadFooter>('footer');
  return {
    columns:
      data.columns?.map((c) => ({
        heading: c.heading,
        links: c.links?.map((l) => ({ label: l.label, url: l.url })) ?? [],
      })) ?? [],
    socialLinks:
      data.socialLinks?.map((s) => ({ platform: s.platform, url: s.url })) ?? [],
    nextEventCallout: data.nextEventCallout
      ? {
          enabled: data.nextEventCallout.enabled ?? false,
          heading: data.nextEventCallout.heading ?? null,
          description: data.nextEventCallout.description ?? null,
        }
      : null,
    copyright: data.copyright ?? null,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const data = await cmsGetGlobal<PayloadSiteSettings>('site-settings');
  return {
    siteName: data.siteName,
    siteDescription: data.siteDescription ?? null,
    siteUrl: data.siteUrl ?? null,
    defaultSEO: {
      title: data.defaultSEO?.title ?? null,
      description: data.defaultSEO?.description ?? null,
      ogImage: resolveMedia(data.defaultSEO?.ogImage),
    },
    contactEmail: data.contactEmail ?? null,
    newsletterEndpoint: data.newsletterEndpoint ?? null,
  };
}
