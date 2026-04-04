export const NAV_LINKS = [
  { label: "News", href: "/articles?category=news" },
  { label: "Guides", href: "/articles?category=guide" },
  { label: "Technical", href: "/articles?category=technical" },
  { label: "Companies", href: "/articles?category=company-story" },
  { label: "Tools", href: "/tools" },
  { label: "Directory", href: "/directory" },
  { label: "Services", href: "/services" },
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  defense: "bg-cat-defense",
  technology: "bg-cat-technology",
  news: "bg-cat-news",
  industry: "bg-cat-news",
  guide: "bg-cat-guide",
  "company-story": "bg-cat-company",
  technical: "bg-cat-technical",
};

export const CATEGORY_TEXT_COLORS: Record<string, string> = {
  defense: "text-cat-defense",
  technology: "text-cat-technology",
  news: "text-cat-news",
  industry: "text-cat-news",
  guide: "text-cat-guide",
  "company-story": "text-cat-company",
  technical: "text-cat-technical",
};

export const CATEGORY_LABELS: Record<string, string> = {
  defense: "Defense",
  technology: "Technology",
  news: "News",
  industry: "Industry",
  guide: "Guide",
  "company-story": "Company Story",
  technical: "Technical",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-cat-guide text-white",
  intermediate: "bg-accent text-white",
  advanced: "bg-cat-defense text-white",
};

export const SERVICES = [
  {
    title: "Media Partnerships",
    description: "Brand stories, sponsored content, and media coverage for drone companies",
    icon: "Megaphone",
  },
  {
    title: "Consultancy",
    description: "Strategic guidance for drone startups and enterprises",
    icon: "Lightbulb",
  },
  {
    title: "CAD Design",
    description: "Professional drone frame and component design services",
    icon: "PenTool",
  },
  {
    title: "Custom Software",
    description: "GCS, flight planning, and drone management solutions",
    icon: "Code",
  },
] as const;

export const TOOLS = [
  {
    title: "Flight Time Calculator",
    description: "Estimate flight duration based on battery and motor specs",
    href: "/tools/flight-time-calculator",
    icon: "Clock",
    available: true,
  },
  {
    title: "Payload Calculator",
    description: "Calculate max payload capacity for your drone setup",
    href: "/tools/payload-calculator",
    icon: "Weight",
    available: false,
  },
  {
    title: "Battery Comparison",
    description: "Compare LiPo batteries across brands and specifications",
    href: "/tools/battery-comparison",
    icon: "Battery",
    available: false,
  },
] as const;
