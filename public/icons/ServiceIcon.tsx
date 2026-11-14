import AiAutomationIcon from "@/public/icons/AiAutomationIcon";
import FullStackIcon from "@/public/icons/FullStackIcon";
import MobileAppIcon from "@/public/icons/MobileAppIcon";
import SeoIcon from "@/public/icons/SeoIcon";
import SocialMediaIcon from "@/public/icons/SocialMediaIcon";
import WebsiteIcon from "@/public/icons/WebsiteIcon";

const icons = { web: WebsiteIcon, mobile: MobileAppIcon, stack: FullStackIcon, ai: AiAutomationIcon, seo: SeoIcon, social: SocialMediaIcon };

export type ServiceIconName = keyof typeof icons;

export function ServiceIcon({ name, className = "" }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
