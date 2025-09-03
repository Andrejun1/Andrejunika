import { CalendarIcon, Code2Icon, HomeIcon, LinkIcon, MailIcon, User2Icon } from "lucide-react";
import { Icons } from "@/components/icons";

export const siteConfig = {
  navbar: [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Profile",
      href: "/About",
      icon: User2Icon,
    },
    {
      label: "Projects",
      href: "/Project",
      icon: Code2Icon,
    },
    
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Andrejun1/",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "Link.id",
        url: "https://lynk.id/andrejun/",
        icon: LinkIcon,
      },
    },
  },
} as const;
