export interface Speaker {
  name: string;
  role?: string;
  topic?: string;
  avatar?: string;
  twitter?: string;
  linkedin?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface Event {
  slug: string;
  title: string;
  date: string; // ISO string
  time: string;
  venue: string;
  address: string;
  city: string;
  speakers: Speaker[];
  agenda?: AgendaItem[];
  ticketsUrl?: string;
  coverImage?: string;
  tags: string[];
  status: 'upcoming' | 'past';
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  authorName: string;
  authorHandle?: string;
  excerpt: string;
  content: string; // MDX simulation
  coverImage?: string;
  tags: string[];
  readingTime: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Partner';
  logo: string;
  url: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

export interface Leader {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  author: string;
  stars?: number;
}
