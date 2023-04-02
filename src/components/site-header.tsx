import { Search } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-b-slate-200 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.search className="w-5 h-5" />
                  <span className="sr-only">Buscar</span>
                </button>
              </SheetTrigger>
              <SheetContent position={"top"} size="content">
                <div className="flex items-center">
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

            <a href={siteConfig.links.signup} rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.user className="w-5 h-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
