import type { ServiceIconName } from "@/public/icons";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: ServiceIconName;
  image: string;
  eyebrow: string;
  summary: string;
  description: string;
  challenge: string;
  deliverables: readonly string[];
  outcomes: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    icon: "web",
    image: "/images/services/website-development.jpg",
    eyebrow: "Your digital storefront",
    summary: "Fast, credible websites designed to turn attention into meaningful business opportunities.",
    description: "We combine business positioning, user experience, content hierarchy, and modern engineering to create websites that explain your value clearly and move visitors toward action.",
    challenge: "An outdated, confusing, or slow website can weaken trust before a customer ever speaks to your team. We identify where the journey loses clarity and rebuild it around the decisions your audience needs to make.",
    deliverables: ["Digital strategy and page architecture", "UX/UI design and responsive development", "CMS and business-tool integrations", "Performance, accessibility, and launch QA"],
    outcomes: ["A stronger first impression", "Clearer customer journeys", "More qualified enquiries", "A platform ready to evolve"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile apps",
    icon: "mobile",
    image: "/images/services/mobile-app-development.jpg",
    eyebrow: "Useful experiences, always within reach",
    summary: "Intuitive mobile products that make your service easier to access, use, and return to.",
    description: "From the first product flow to launch-ready builds, we create mobile experiences shaped around real user behavior and the commercial goals behind the product.",
    challenge: "A mobile app only creates value when it earns a place in someone’s routine. We study the job users need to complete, remove unnecessary steps, and design a product that feels natural from day one.",
    deliverables: ["Product discovery and feature prioritization", "User flows, prototypes, and interface design", "iOS and Android development", "Testing, deployment, and iteration support"],
    outcomes: ["Faster access to your service", "Stronger customer engagement", "Reduced process friction", "A scalable mobile foundation"],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    shortTitle: "Web applications",
    icon: "stack",
    image: "/images/services/full-stack-development.jpg",
    eyebrow: "Systems shaped around your business",
    summary: "Connected web applications that simplify complex workflows and grow with your operations.",
    description: "We design and engineer the complete product, from clear interfaces to reliable APIs, databases, integrations, and deployment infrastructure.",
    challenge: "When spreadsheets and disconnected tools start controlling the workflow, growth becomes harder to manage. We map the process, find the handoff gaps, and build one connected system around the way the business should operate.",
    deliverables: ["Workflow and technical architecture", "Front-end and back-end development", "APIs, databases, and third-party integrations", "Security, testing, deployment, and monitoring"],
    outcomes: ["More efficient operations", "One reliable source of truth", "Better team visibility", "Architecture that can scale"],
  },
  {
    slug: "ai-integration-automation",
    title: "AI Integration & Automation",
    shortTitle: "AI & automation",
    icon: "ai",
    image: "/images/services/ai-automation.jpg",
    eyebrow: "Intelligence applied where it matters",
    summary: "Practical AI and automation that reduce repetitive work and help teams move faster.",
    description: "We identify high-value use cases, connect AI with your existing tools, and build controlled workflows that improve speed without losing human oversight.",
    challenge: "AI should solve a real operational bottleneck, not become another disconnected experiment. We find the repetitive decisions, information gaps, and manual handoffs where intelligent automation can produce measurable value.",
    deliverables: ["AI opportunity and workflow audit", "Knowledge assistants and intelligent search", "Process automation and system integrations", "Human approvals, monitoring, and refinement"],
    outcomes: ["Less repetitive work", "Faster access to knowledge", "More consistent processes", "Greater value from existing systems"],
  },
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    shortTitle: "SEO",
    icon: "seo",
    image: "/images/services/seo-services.jpg",
    eyebrow: "Be visible when intent is highest",
    summary: "A stronger search foundation that helps the right customers discover your business.",
    description: "We connect technical health, content structure, search intent, and performance measurement into a practical SEO system built for sustainable visibility.",
    challenge: "A good website cannot contribute to growth if search engines and customers struggle to understand it. We uncover technical barriers, weak topic coverage, and missed intent, then prioritize the improvements that matter most.",
    deliverables: ["Technical and on-page SEO audit", "Keyword, competitor, and intent research", "Content architecture and optimization", "Measurement, reporting, and improvement roadmap"],
    outcomes: ["More relevant organic traffic", "Stronger topical authority", "Better-performing content", "A compounding acquisition channel"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortTitle: "Social growth",
    icon: "social",
    image: "/images/services/social-media-marketing.jpg",
    eyebrow: "A brand presence people remember",
    summary: "Focused content and campaigns that build attention, credibility, and demand.",
    description: "We turn your positioning into a consistent social system, from content direction and creative production to campaign execution and performance learning.",
    challenge: "Posting without a clear purpose creates activity, not momentum. We clarify the audience, message, content pillars, and conversion path so every campaign supports a real business objective.",
    deliverables: ["Audience and channel strategy", "Content pillars and creative direction", "Campaign planning and production", "Performance reporting and optimization"],
    outcomes: ["A more consistent brand", "Stronger audience engagement", "Better campaign learning", "More qualified demand"],
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

