import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    signup: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Wariv",
  description:
    "Encuentra las mejores aplicaciones de IA",
  mainNav: [
    {
      title: 'Blog',
      href: "/blog"
    },
    {
      title: 'Precios',
      href: "/pricing"
    },
    {
      title: "Contacto",
      href: "/contact",
    },
  ],
  links: {
    signup: "/signup",
  },
}
