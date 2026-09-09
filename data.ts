import {
  BlogPost, Event, GalleryItem, Leader, Sponsor, Project,
  SponsorTier, PerEventSponsorship, InKindOption
} from './types';

export const EVENTS: Event[] = [
  {
    slug: 'jsk-code-wars-edition-2',
    title: "JSK Code Wars Edition 2",
    date: '2026-11-07T14:00:00+03:00',
    time: '02:00 PM - 05:00 PM',
    venue: "Africa's Talking Office",
    address: 'Victoria Park, Block B, Kampala',
    city: 'Kampala',
    status: 'upcoming',
    format: 'Live 1v1 Knockout Cup (Single Elimination)',
    description: "East Africa's premier live 1v1 competitive programming tournament inspired by the HackSussex Coders' Cup. 8 elite coders clash head-to-head on the big screen in front of a live audience. Solve algorithmic challenges under extreme time pressure in any programming language of your choice. Strictly zero AI tools permitted.",
    tags: ['Competition', 'Live Tournament', 'Algorithms', 'No-AI', 'Polyglot'],
    ticketsUrl: 'https://www.ticketdaddy.io/',
    videoUrl: 'https://youtu.be/EJPkNt7HbZM',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070',
    rules: [
      {
        title: 'Polyglot Playground (Any Language)',
        highlight: 'Freedom of Choice',
        description: 'Competitors can write solutions in ANY programming language (TypeScript, JavaScript, Python, Go, Rust, C++, Java, etc.). You bring your language mastery; we provide the standard test harnesses.'
      },
      {
        title: 'Zero AI Usage Policy',
        highlight: 'Strictly Enforced',
        description: 'No GitHub Copilot, Cursor, ChatGPT, Claude, tab autocompletions, or generative assistants of any kind are permitted. All solutions must be reasoned and authored from pure human cognition.'
      },
      {
        title: '1v1 Head-to-Head Knockout',
        highlight: 'HackSussex Format',
        description: 'Live bracket single-elimination battles. Code editor feeds projected side-by-side with live test suite progress, live shoutcasters, and spectator hype.'
      },
      {
        title: 'Instant Automated Test Harness',
        highlight: 'Live Evaluation',
        description: 'Deterministic test cases run live on screen. The first competitor to pass 100% of test cases (or highest passing rate when the timer expires) advances to the next round.'
      }
    ],
    bracket: [
      { id: 'm1', round: 'Quarterfinal 1', player1: 'Seed 1', player2: 'Seed 8' },
      { id: 'm2', round: 'Quarterfinal 2', player1: 'Seed 4', player2: 'Seed 5' },
      { id: 'm3', round: 'Quarterfinal 3', player1: 'Seed 2', player2: 'Seed 7' },
      { id: 'm4', round: 'Quarterfinal 4', player1: 'Seed 3', player2: 'Seed 6' },
      { id: 'm5', round: 'Semifinal 1', player1: 'Winner QF 1', player2: 'Winner QF 2' },
      { id: 'm6', round: 'Semifinal 2', player1: 'Winner QF 3', player2: 'Winner QF 4' },
      { id: 'm7', round: 'Grand Final', player1: 'Winner SF 1', player2: 'Winner SF 2' }
    ],
    speakers: [
      {
        name: 'Tournament Cast & Commentary Team',
        role: "JS Kampala & Africa's Talking",
        topic: 'Live Match Casting, Play-by-Play & Edge-Case Analysis',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      {
        name: 'Arbitration & Benchmarking Jury',
        role: 'Technical Lead Judges',
        topic: 'Polyglot Test Runner & Strict Zero-AI Auditing',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      }
    ],
    agenda: [
      { time: '02:00 PM', title: 'Arrival, Environment Setup & Bracket Reveal' },
      { time: '02:25 PM', title: 'Opening Remarks & Code-of-Combat Rules Briefing' },
      { time: '02:35 PM', title: 'Quarterfinals: 1v1 Speed Rounds (4 Matches • 10m sprints)' },
      { time: '03:25 PM', title: "Halftime Break & Africa's Talking Tech Spotlight" },
      { time: '03:40 PM', title: 'Semifinals: Deep Algorithmic Duels (2 Matches • 15m deep dives)' },
      { time: '04:20 PM', title: 'Grand Final: The Championship Duel (20m Showdown)' },
      { time: '04:45 PM', title: 'Awards Ceremony, Trophy Presentation & Networking Mixer' }
    ]
  },
  {
    slug: 'js-kampala-summit-2025',
    title: 'JS Kampala Summit 2025: The Future of Web',
    date: '2025-10-24T09:00:00Z',
    time: '09:00 AM - 05:00 PM',
    venue: 'Kampala Serena Hotel',
    address: 'Kintu Road, Kampala',
    city: 'Kampala',
    status: 'past',
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
    status: 'past',
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
    url: 'https://www.andela.com/',
    description: 'Connecting talent.'
  },
  {
    id: '5',
    name: "Africa's Talking",
    tier: 'Gold',
    logo: 'https://africastalking.com/img/favicon.png',
    url: 'https://africastalking.com/',
    description: 'Powering communication & cloud infrastructure across Africa.'
  }
];

export const SPONSOR_CONTACT_EMAIL = 'javascriptkampala@gmail.com';

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Monthly Sponsor',
    level: 'LEVEL_01',
    emoji: '🥉',
    contributionUGX: 'UGX 75,000',
    contributionUSD: '~$20 USD',
    period: 'per month',
    tagline: 'Entry-level recurring support for individuals and emerging startups',
    benefits: [
      "Small logo on the JavaScript Community Uganda website's dedicated sponsors page",
      'Mention in a monthly "Thank You" social media post to all our Bronze Monthly Supporters',
      'Verbal acknowledgement as a Bronze Monthly Supporter during opening remarks at one community meetup per quarter',
      'Early access to information about upcoming community initiatives',
      '1 complimentary ticket to one paid community workshop or mini-conference every 6 months'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Monthly Sponsor',
    level: 'LEVEL_02',
    emoji: '🥈',
    contributionUGX: 'UGX 150,000',
    contributionUSD: '~$42 USD',
    period: 'per month',
    tagline: 'Growing visibility and quarterly speaking opportunity for engineering teams',
    benefits: [
      'All Bronze Monthly Supporter benefits included',
      "Logo (medium) on the JavaScript Community Uganda website's dedicated sponsors page and on event-specific pages for regular meetups",
      'Individual social media "Thank You" mention with company tag once per quarter',
      'Verbal acknowledgement as a Silver Monthly Backer during opening and closing remarks at one community meetup per month',
      'A 15-minute speaking slot (lightning talk) at one community meetup per quarter to share insights, company culture, or relevant tech (content mutually agreed upon)',
      'Opportunity to display a small pop-up banner (sponsor-provided) at one physical meetup per quarter',
      '1 complimentary ticket to one paid community workshop or mini-conference per quarter'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Monthly Sponsor',
    level: 'LEVEL_03',
    badge: 'Popular',
    emoji: '🥇',
    highlight: true,
    contributionUGX: 'UGX 350,000',
    contributionUSD: '~$100 USD',
    period: 'per month',
    tagline: 'Strategic partner visibility with hiring access, speaking slots, and homepage branding',
    benefits: [
      'All Silver Monthly Backer benefits included',
      'Logo (large) prominently displayed on the JavaScript Community Uganda website (homepage footer & sponsors page) and on standard event materials (digital & physical)',
      'Dedicated social media post highlighting your organization as a Gold Monthly Partner once per quarter',
      'Verbal acknowledgement as a Gold Monthly Partner at all major community events and meetups',
      'Opportunity to display a medium-sized banner (sponsor-provided) at all regular physical meetups',
      'A 30-60 minute speaking slot at one community meetup per quarter to share insights, company culture, or relevant tech (content mutually agreed upon)',
      'Option to distribute company-branded swag (sponsor-provided) at regular physical meetups',
      'Option to share up to 3 relevant job openings per month on community channels',
      '2 complimentary tickets to one paid community workshop or mini-conference per quarter',
      "Brief company profile featured on the sponsors' page of the website",
      'Priority consideration for partnership on special community initiatives'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Monthly Sponsor',
    level: 'LEVEL_04',
    badge: 'Title Partner',
    emoji: '💎',
    contributionUGX: 'UGX 700,000',
    contributionUSD: '~$200 USD',
    period: 'per month',
    tagline: 'Premier community partnership with title co-hosting, keynote slots, and newsletter reach',
    benefits: [
      'All Gold Monthly Partner benefits included',
      'Prominent logo placement on all JavaScript Community Uganda digital and physical assets (website homepage, event banners, presentations)',
      'Exclusive dedicated social media campaign highlighting your organization and its contributions once per quarter',
      'Opportunity to co-host or title sponsor one major community event (e.g., annual conference, hackathon) per year',
      'Guaranteed 60-120 minutes speaking slot (keynote or featured speaker) at one community meetup or special event per quarter',
      'Priority access and prominent display space for a dedicated booth or table at all major physical meetups and events',
      'Option to distribute significant company-branded swag and marketing materials at all regular physical meetups and major events',
      'Option to share up to 5 relevant job openings per month across all community channels, including a dedicated section in our monthly newsletter',
      '4 complimentary tickets to all paid community workshops or mini-conferences per quarter, and VIP access to major events',
      "Detailed company profile and interview featured on the sponsors' page of the website and in a dedicated blog post",
      'Primary consideration and active collaboration on major community initiatives, research projects, or educational programs',
      'Annual joint report highlighting the impact of your sponsorship on the community'
    ]
  }
];

export const PER_EVENT_SPONSORSHIP: PerEventSponsorship = {
  title: 'Per-Event Sponsorship',
  contributionUGX: 'Starting from UGX 250,000',
  contributionUSD: '~$70 USD',
  description: 'Ideal for organizations or individuals looking to make an impact around specific events, workshops, or conferences. Contribution is flexible based on event scale and desired visibility.',
  coreBenefits: [
    'Logo (medium) on all promotional materials for the sponsored event',
    'Social media mentions leading up to and during the sponsored event',
    'Verbal acknowledgement as an Event Champion during the sponsored event (opening and closing)',
    'Opportunity to display a banner (sponsor-provided) at the sponsored event',
    '2 complimentary tickets to the sponsored event',
    'Option to provide a brief (1-2 min) address at the event'
  ],
  enhancedBenefits: [
    'Larger logo placement, "Presented by" or "Headline Sponsor" recognition',
    'Dedicated social media posts spotlighting your support',
    'Dedicated booth/table space at the event venue',
    'Extended speaking opportunities (e.g., keynote, workshop session)',
    'Inclusion of branded materials in attendee swag bags (if applicable)',
    'More complimentary tickets / VIP access',
    'Opportunity to co-host or brand a specific segment of the event'
  ]
};

export const IN_KIND_SPONSORSHIPS: InKindOption[] = [
  {
    title: 'Venue Hosting',
    category: 'Spaces & Labs',
    description: 'Hosting meetups, workshops, hackathons, or study groups in accessible, equipped tech spaces.'
  },
  {
    title: 'Food & Beverages',
    category: 'Catering & Hospitality',
    description: 'Providing meals, snacks, water, and refreshments for community attendees and speakers.'
  },
  {
    title: 'Software Licenses & Tooling',
    category: 'Developer Resources',
    description: 'Sponsoring developer software licenses, cloud computing credits, or developer tools for community members.'
  },
  {
    title: 'Expert Speakers & Trainers',
    category: 'Technical Talent',
    description: 'Offering seasoned engineers and industry specialists to lead hands-on masterclasses and workshops.'
  },
  {
    title: 'Swag & Merchandise',
    category: 'Community Merch',
    description: 'Supplying T-shirts, stickers, notebooks, tote bags, and lanyards for community members.'
  },
  {
    title: 'Technical Infrastructure',
    category: 'Production & Cloud',
    description: 'Providing streaming equipment, recording services, audio-visual production, or web and cloud hosting.'
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
