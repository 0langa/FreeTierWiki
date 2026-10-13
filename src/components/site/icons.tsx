import {
  Activity,
  Box,
  Boxes,
  Bug,
  ChartNoAxesColumn,
  ClipboardList,
  Clock,
  Cpu,
  Database,
  FileText,
  Flag,
  GitBranch,
  Globe,
  GraduationCap,
  HardDrive,
  KeyRound,
  Languages,
  Layers,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  PenTool,
  Pickaxe,
  Plug,
  Radio,
  ScrollText,
  Server,
  ShieldCheck,
  SignalHigh,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { Domain } from "@/types/content";

// Rendered from server components only, so the icons land in the HTML and never in the client bundle.
const DOMAIN_ICONS: Record<Domain, LucideIcon> = {
  hosting: Server,
  compute: Cpu,
  database: Database,
  storage: HardDrive,
  auth: KeyRound,
  messaging: MessageSquare,
  observability: Activity,
  ai: Sparkles,
  devops: GitBranch,
  security: ShieldCheck,
  networking: Network,
  collaboration: Users,
  forms: ClipboardList,
  localization: Languages,
  documents: FileText,
  apis: Plug,
  scraping: Pickaxe,
  automation: Workflow,
  learning: GraduationCap,
  design: PenTool,
  analytics: ChartNoAxesColumn,
  other: Box,
};

// Keyed by comparison slug (content/comparisons.json). Unknown slugs fall back to a grid.
const JOB_ICONS: Record<string, LucideIcon> = {
  "postgres-hosting": Database,
  "serverless-functions": Zap,
  "email-sending": Mail,
  "object-storage": HardDrive,
  auth: KeyRound,
  "uptime-monitoring": Activity,
  "static-site-hosting": Globe,
  "error-tracking": Bug,
  "llm-apis": Sparkles,
  "ip-geolocation": MapPin,
  "form-backends": ClipboardList,
  cdn: Network,
  "background-jobs": Clock,
  "vector-databases": Boxes,
  "status-pages": SignalHigh,
  "feature-flags": Flag,
  "web-scraping": Pickaxe,
  "log-management": ScrollText,
  "realtime-messaging": Radio,
  "message-queues": Layers,
  "pdf-generation": FileText,
  localization: Languages,
};

export function DomainIcon({ domain, className }: { domain: Domain; className?: string }) {
  const Icon = DOMAIN_ICONS[domain] ?? Box;
  return <Icon className={className} aria-hidden />;
}

export function JobIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = JOB_ICONS[slug] ?? LayoutGrid;
  return <Icon className={className} aria-hidden />;
}
