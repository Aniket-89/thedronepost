import { Article, SiteSettings } from "./types";

// Mock data for development — replace with Sanity queries once CMS is connected
const placeholder = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/1a1a1a/9ca3af?text=${encodeURIComponent(label)}`;

export const mockArticles: Article[] = [
  {
    _id: "1",
    title: "India's New Drone Corridor Between Delhi and Gurugram Goes Live",
    slug: { current: "india-drone-corridor-delhi-gurugram" },
    category: "news",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-25T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Drone+Corridor") }, alt: "Drone corridor" },
    excerpt: "India's first commercial drone corridor connecting Delhi and Gurugram is now operational, marking a major milestone for urban air mobility.",
    featured: true,
    trending: true,
    readingTime: 5,
  },
  {
    _id: "2",
    title: "How to Build Your First FPV Drone Under ₹15,000",
    slug: { current: "build-fpv-drone-under-15000" },
    category: "guide",
    difficulty: "Beginner",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-23T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "FPV+Build") }, alt: "FPV drone build" },
    excerpt: "A complete step-by-step guide to building your first FPV racing drone on a budget, with Indian component suppliers.",
    trending: true,
    readingTime: 12,
  },
  {
    _id: "3",
    title: "DGCA Type Certification: What Drone Manufacturers Need to Know",
    slug: { current: "dgca-type-certification-guide" },
    category: "technical",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-22T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "DGCA+Cert") }, alt: "DGCA certification" },
    excerpt: "A deep dive into India's drone type certification process, requirements, testing standards, and timeline expectations.",
    trending: true,
    readingTime: 8,
  },
  {
    _id: "4",
    title: "IdeaForge Secures ₹250Cr Contract for Indian Army Surveillance Drones",
    slug: { current: "ideaforge-army-surveillance-contract" },
    category: "defense",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-21T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "IdeaForge") }, alt: "IdeaForge drones" },
    excerpt: "IdeaForge wins a major contract to supply high-altitude surveillance drones to the Indian Army, strengthening border security capabilities.",
    trending: true,
    readingTime: 4,
  },
  {
    _id: "5",
    title: "Garuda Aerospace: From Chennai Startup to India's Largest Drone Company",
    slug: { current: "garuda-aerospace-company-story" },
    category: "company-story",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-20T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Garuda") }, alt: "Garuda Aerospace" },
    excerpt: "How Garuda Aerospace scaled from a small Chennai startup to operating the largest drone fleet in India, serving agriculture, defense, and enterprise.",
    readingTime: 7,
  },
  {
    _id: "6",
    title: "Understanding LiPo Battery Chemistry for Drone Applications",
    slug: { current: "lipo-battery-chemistry-drones" },
    category: "technical",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-19T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "LiPo+Battery") }, alt: "LiPo batteries" },
    excerpt: "Everything you need to know about lithium polymer batteries — cell chemistry, discharge rates, safety, and choosing the right pack for your drone.",
    readingTime: 10,
  },
  {
    _id: "7",
    title: "India's Agriculture Drone Subsidy: Complete Application Guide",
    slug: { current: "agriculture-drone-subsidy-guide" },
    category: "guide",
    difficulty: "Beginner",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-18T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Agri+Drone") }, alt: "Agriculture drone" },
    excerpt: "Step-by-step guide to applying for the government's agriculture drone subsidy scheme, including eligibility, documents, and tips.",
    readingTime: 6,
  },
  {
    _id: "8",
    title: "PX4 vs ArduPilot: Choosing the Right Flight Controller Firmware",
    slug: { current: "px4-vs-ardupilot-comparison" },
    category: "technical",
    difficulty: "Intermediate",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-17T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "FC+Firmware") }, alt: "Flight controller" },
    excerpt: "An in-depth comparison of PX4 and ArduPilot — features, ecosystem, hardware support, and which one is right for your project.",
    readingTime: 9,
  },
  {
    _id: "9",
    title: "Drone Regulations in India 2025: The Complete Guide",
    slug: { current: "drone-regulations-india-2025" },
    category: "guide",
    difficulty: "Beginner",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-16T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Regulations") }, alt: "Drone regulations" },
    excerpt: "Everything about India's current drone rules — registration, licensing, no-fly zones, and compliance requirements for hobbyists and businesses.",
    readingTime: 8,
  },
  {
    _id: "10",
    title: "Throttle Dynamics: Motor and Propeller Matching for Maximum Efficiency",
    slug: { current: "motor-propeller-matching-efficiency" },
    category: "technical",
    difficulty: "Advanced",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-15T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Motor+Props") }, alt: "Motor propeller matching" },
    excerpt: "Advanced guide to matching motors and propellers for optimal thrust-to-weight ratios, flight time, and efficiency.",
    readingTime: 11,
  },
  {
    _id: "11",
    title: "Asteria Aerospace Launches AI-Powered Surveillance Platform",
    slug: { current: "asteria-aerospace-ai-surveillance" },
    category: "company-story",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-14T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "Asteria") }, alt: "Asteria Aerospace" },
    excerpt: "Asteria Aerospace unveils their new AI-integrated surveillance drone platform designed for smart city and defense applications.",
    readingTime: 5,
  },
  {
    _id: "12",
    title: "Building a Custom Ground Control Station with Node.js and MAVLink",
    slug: { current: "custom-gcs-nodejs-mavlink" },
    category: "technical",
    difficulty: "Advanced",
    author: { name: "The Drone Post", role: "Editor" },
    publishedAt: "2025-03-13T10:00:00Z",
    featuredImage: { asset: { url: placeholder(800, 450, "GCS+Build") }, alt: "Ground control station" },
    excerpt: "Build your own ground control station using Node.js, MAVLink protocol, and web technologies — complete with telemetry and mission planning.",
    readingTime: 15,
  },
];

export const mockSettings: SiteSettings = {
  showBreakingTicker: true,
  breakingHeadlines: [
    "BREAKING: India approves drone delivery corridors in 10 cities",
    "IdeaForge Q4 results exceed expectations — stock surges 12%",
    "New DGCA guidelines for drone pilot licensing effective April 2025",
    "Garuda Aerospace partners with Walmart for last-mile delivery trials",
  ],
  subscriberCount: 3000,
};

// Helper functions to filter mock data
export function getFeaturedArticle(): Article | undefined {
  return mockArticles.find((a) => a.featured);
}

export function getSecondaryArticles(count = 3): Article[] {
  return mockArticles.filter((a) => !a.featured).slice(0, count);
}

export function getLatestArticles(count = 6): Article[] {
  return mockArticles.slice(0, count);
}

export function getTrendingArticles(count = 4): Article[] {
  return mockArticles.filter((a) => a.trending).slice(0, count);
}

export function getTechnicalArticles(count = 4): Article[] {
  return mockArticles.filter((a) => a.category === "technical").slice(0, count);
}

export function getCompanyArticles(count = 2): Article[] {
  return mockArticles.filter((a) => a.category === "company-story").slice(0, count);
}

export function getGuideArticles(): { beginner: Article[]; advanced: Article[] } {
  const guides = mockArticles.filter((a) => a.category === "guide" || a.category === "technical");
  return {
    beginner: guides.filter((a) => a.difficulty === "Beginner").slice(0, 3),
    advanced: guides.filter((a) => a.difficulty === "Advanced" || a.difficulty === "Intermediate").slice(0, 3),
  };
}
