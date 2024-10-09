import * as React from "react";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import AvatarNav from "./atoms/AvatarNav";

export function SiteHeader() {
  const location = useLocation();
  // ?backTo=${location.pathname}
  const [navbarVisible, setNavbarVisible] = React.useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Comprobar si el scroll es mayor a 164px
      if (currentScrollY > 64 && currentScrollY > lastScrollY) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background border-b-border transition-transform duration-500 ${
        navbarVisible || location.pathname.startsWith('/admin') ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            {!isAuthenticated ? (
              <Link to={`/auth/signup`} className={buttonVariants()}>
                Registrarse
              </Link>
            ) : (
              <AvatarNav />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
