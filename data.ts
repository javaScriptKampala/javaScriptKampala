import { BlogPost, Event, GalleryItem, Leader, Sponsor, Project } from './types';

export const EVENTS: Event[] = [
  {
    slug: 'js-kampala-summit-2025',
    title: 'JS Kampala Summit 2025: The Future of Web',
    date: '2025-10-24T09:00:00Z',
    time: '09:00 AM - 05:00 PM',
    venue: 'Kampala Serena Hotel',
    address: 'Kintu Road, Kampala',
    city: 'Kampala',
    status: 'upcoming',
    description: 'The premier engineering conference in East Africa. Join 500+ developers for a full day of deep dives into React Server Components, AI Engineering, and Cloud Architecture.',
    tags: ['Conference', 'Architecture', 'AI'],
    ticketsUrl: 'https://eventbrite.com',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070',
    speakers: [
      {
        name: 'Sarah Namukwaya',
        role: 'Principal Engineer',
        topic: 'Scaling Node.js Monoliths',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      },
      {
        name: 'David Opio',
        role: 'Solutions Architect',
        topic: 'The Edge Computing Era',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      }
    ],
    agenda: [
      { time: '09:00 AM', title: 'Keynote: The State of Engineering' },
      { time: '10:30 AM', title: 'Breakout: AI-Driven Development' },
      { time: '02:00 PM', title: 'Workshop: Advanced Next.js Patterns' },
      { time: '04:00 PM', title: 'Networking Mixer' }
    ]
  },
  {
    slug: 'workshop-system-design',
    title: 'System Design Masterclass',
    date: '2025-11-15T10:00:00Z',
    time: '10:00 AM - 02:00 PM',
    venue: 'Innovation Village',
    address: 'Ntinda Complex',
    city: 'Kampala',
    status: 'upcoming',
    description: 'A deep dive into designing scalable distributed systems. Perfect for Senior Engineers looking to level up.',
    tags: ['System Design', 'Backend', 'Workshop'],
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
    speakers: [
      {
        name: 'Michael O.',
        role: 'Staff Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
      }
    ]
  },
  {
    slug: 'meetup-q3-recap',
    title: 'Q3 Community Showcase',
    date: '2025-08-15T16:00:00Z',
    time: '4:00 PM - 8:00 PM',
    venue: 'Outbox Hub',
    address: 'Soliz House',
    city: 'Kampala',
    status: 'past',
    description: 'Celebrating the projects built by our community members in the third quarter.',
    tags: ['Community', 'Social'],
    coverImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000',
    speakers: []
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'future-of-frontend-2025',
    title: 'The Future of Frontend Engineering in 2025',
    date: '2025-09-01',
    authorName: 'Editorial Team',
    readingTime: '6 min read',
    tags: ['Trends', 'Frontend'],
    excerpt: 'From AI-generated UI to the return of monoliths, here is what to expect next year.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000'
  },
  {
    slug: 'why-typescript',
    title: 'Why we mandated TypeScript for all community repos',
    date: '2025-08-10',
    authorName: 'Tech Lead',
    readingTime: '8 min read',
    tags: ['TypeScript', 'Engineering'],
    excerpt: 'Type safety has saved us countless hours of debugging. Here is our story.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2000'
  },
  {
    slug: 'career-growth',
    title: 'Engineering Career Ladders Explained',
    date: '2025-07-22',
    authorName: 'Mentorship Circle',
    readingTime: '10 min read',
    tags: ['Career', 'Growth'],
    excerpt: 'Understanding the difference between Staff, Principal, and Distinguished Engineer roles.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000'
  }
];

export const SPONSORS: Sponsor[] = [
  {
    id: '1',
    name: 'Vercel',
    tier: 'Gold',
    logo: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
    url: 'https://vercel.com',
    description: 'Develop. Preview. Ship.'
  },
  {
    id: '2',
    name: 'Google',
    tier: 'Gold',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    url: 'https://google.com',
    description: 'Build for everyone.'
  },
  {
    id: '3',
    name: 'Microsoft',
    tier: 'Silver',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    url: 'https://microsoft.com',
    description: 'Empowering every developer.'
  },
  {
    id: '4',
    name: 'Andela',
    tier: 'Bronze',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Andela_logo.png',
    url: '#',
    description: 'Connecting talent.'
  }
];

export const LEADERS: Leader[] = [
  {
    name: 'Alex Mukasa',
    role: 'Lead Organizer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    twitter: '#'
  },
  {
    name: 'Patricia N.',
    role: 'Co-Organizer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    linkedin: '#'
  },
  {
    name: 'David Opio',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    twitter: '#'
  }
];

export const GALLERY: GalleryItem[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200', caption: 'Summit 2024 Keynote' },
  { id: '2', src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200', caption: 'Women in Tech Panel' },
  { id: '3', src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=1200', caption: 'Networking Session' },
  { id: '4', src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200', caption: 'Workshop in action' },
  { id: '5', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200', caption: 'Hackathon Winners' },
  { id: '6', src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200', caption: 'Team Building' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Kampala Traffic Viz',
    description: 'Real-time visualization of traffic data in Kampala using Mapbox and Node.js.',
    technologies: ['React', 'Mapbox', 'Node'],
    githubUrl: '#',
    demoUrl: '#',
    author: 'JS Kampala',
    stars: 124
  },
  {
    id: '2',
    title: 'Matatu Pay SDK',
    description: 'Enterprise-grade payment integration library for local mobile money providers.',
    technologies: ['TypeScript', 'Jest'],
    githubUrl: '#',
    author: 'David O.',
    stars: 89
  },
  {
    id: '3',
    title: 'DevJobs.ug',
    description: 'The definitive job board for tech roles in Uganda. Built with modern stack.',
    technologies: ['Next.js', 'PostgreSQL'],
    githubUrl: '#',
    demoUrl: '#',
    author: 'Sarah N.',
    stars: 56
  },
  {
    id: '4',
    title: 'Luganda NLP Model',
    description: 'Open source natural language processing tools for local languages.',
    technologies: ['Python', 'TensorFlow'],
    githubUrl: '#',
    author: 'Research',
    stars: 200
  }
];
