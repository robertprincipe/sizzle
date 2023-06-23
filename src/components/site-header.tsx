import { Search } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import AvatarNav from "./atoms/AvatarNav";

export function SiteHeader() {
  // const location = useLocation();
  // ?backTo=${location.pathname}
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="sticky top-0 z-40 w-full shadow bg-light dark:bg-dark">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <Icons.search className="w-5 h-5" />
                  <span className="sr-only">Buscar</span>
                </button>
              </SheetTrigger>
              <SheetContent position={"top"} size="content">
                <div className="flex items-center px-10">
                  <Input
                    id="username"
                    placeholder="Buscar..."
                    className="col-span-3"
                  />
                  <Button>
                    <Search />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            {!isAuthenticated ? (
              <Link
                to={`/auth/signup`}
                className={buttonVariants({ variant: "primary" })}
              >
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
