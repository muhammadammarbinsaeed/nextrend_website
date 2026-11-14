export type IndustryImage = { src: string; alt: string; tags: readonly string[] };

export type Industry = {
  title: string;
  description: string;
  link: { href: string; label: string };
  images: readonly [IndustryImage, IndustryImage];
};

export const industries: readonly Industry[] = [
  {
    title: "Healthcare",
    description: "Secure, patient-friendly websites, booking apps, and workflow automation that reduce admin load and make care easier to access for patients and providers alike.",
    link: { href: "/services/mobile-app-development", label: "See our mobile app development service" },
    images: [
      { src: "/images/industries/healthcare-1.jpg", alt: "Doctor using a smartphone to manage patient appointments", tags: ["Patient Booking", "Accessibility", "Reminders"] },
      { src: "/images/industries/healthcare-2.jpg", alt: "Stethoscope on a clean clinic desk", tags: ["Secure Portals", "Clinic Websites", "Local SEO"] },
    ],
  },
  {
    title: "Fintech",
    description: "From payment apps to investment dashboards, we turn dense financial data into clear, secure, and trust-building experiences on dependable full-stack foundations.",
    link: { href: "/services/full-stack-development", label: "See our full-stack development service" },
    images: [
      { src: "/images/industries/fintech-1.jpg", alt: "Customer making a secure online card payment on a laptop", tags: ["Secure UX", "Live Balances", "API Integrations"] },
      { src: "/images/industries/fintech-2.jpg", alt: "Live market chart on a trading screen", tags: ["Dashboards", "Data Clarity", "Performance"] },
    ],
  },
  {
    title: "E-commerce & Retail",
    description: "Fast storefronts, frictionless checkout, and search and social growth that turn browsing into buying and first-time buyers into repeat customers.",
    link: { href: "/services/website-development", label: "See our website development service" },
    images: [
      { src: "/images/industries/ecommerce-1.jpg", alt: "Shop owner taking a contactless payment at the counter", tags: ["Conversion UX", "Checkout Flow", "Product Discovery"] },
      { src: "/images/industries/ecommerce-2.jpg", alt: "Customer paying with a phone at a retail checkout", tags: ["Storefront SEO", "Social Growth", "Retention"] },
    ],
  },
  {
    title: "Logistics & Operations",
    description: "AI automation and custom systems that connect scattered tools, track work in real time, and remove the repetitive tasks slowing your team down.",
    link: { href: "/services/ai-integration-automation", label: "See our AI automation service" },
    images: [
      { src: "/images/industries/logistics-1.jpg", alt: "Large warehouse with stocked shelves and parcels", tags: ["Live Tracking", "Driver Apps", "Smart Dispatch"] },
      { src: "/images/industries/logistics-2.jpg", alt: "Aerial view of a busy container port", tags: ["Workflow Automation", "Integrations", "Reporting"] },
    ],
  },
  {
    title: "Startups & SaaS",
    description: "From MVP to scalable product, we combine product thinking, engineering, and launch growth so founders can ship quickly and keep improving with confidence.",
    link: { href: "/services/full-stack-development", label: "See how we build products" },
    images: [
      { src: "/images/industries/saas-1.jpg", alt: "Startup team building a product together on laptops", tags: ["MVP Build", "Onboarding", "Product UX"] },
      { src: "/images/industries/saas-2.jpg", alt: "Laptop showing a product analytics dashboard", tags: ["Scalable Stack", "Analytics", "Launch Growth"] },
    ],
  },
];
