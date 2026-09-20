import type { ReactNode } from "react";
import {
  BookOpen,
  Church,
  ClipboardList,
  DollarSign,
  FileText,
  GraduationCap,
  Heart,
  Smartphone,
  Users,
  Calendar,
  Shield,
  TrendingUp,
  Wallet,
  UserCheck,
} from "lucide-react";

const iconClass = "size-5";

export const aboutHubIcons: Record<string, ReactNode> = {
  "Values & special character": <Church className={iconClass} aria-hidden />,
  "Parent information": <ClipboardList className={iconClass} aria-hidden />,
  "Parent handbook": <BookOpen className={iconClass} aria-hidden />,
  "School fees": <DollarSign className={iconClass} aria-hidden />,
  "Our learning": <GraduationCap className={iconClass} aria-hidden />,
  "School app": <Smartphone className={iconClass} aria-hidden />,
};

export const communityHubIcons: Record<string, ReactNode> = {
  Staff: <Users className={iconClass} aria-hidden />,
  PTFA: <Heart className={iconClass} aria-hidden />,
  "School board": <Shield className={iconClass} aria-hidden />,
  "Attendance plan": <UserCheck className={iconClass} aria-hidden />,
  "Strategic plan": <TrendingUp className={iconClass} aria-hidden />,
  "Financial statements": <Wallet className={iconClass} aria-hidden />,
};

export const enrolmentHubIcons: Record<string, ReactNode> = {
  "How to enrol": <FileText className={iconClass} aria-hidden />,
  "School visits": <Calendar className={iconClass} aria-hidden />,
  "Fee information": <DollarSign className={iconClass} aria-hidden />,
};

export function hubIcon(
  map: Record<string, ReactNode>,
  title: string,
): ReactNode | undefined {
  return map[title];
}
