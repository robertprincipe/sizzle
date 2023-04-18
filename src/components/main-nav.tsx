import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="items-center hidden space-x-2 md:flex">
        <img src="/apple-touch-icon.png" className="w-8" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </a>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <img src="/apple-touch-icon.png" className="w-8 mr-2" /> <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[300px] overflow-scroll"
        >
          <DropdownMenuLabel>
            <a href="/" className="flex items-center">
              <img src="/apple-touch-icon.png" className="w-8 mr-2" />{" "}
              {siteConfig.name}
            </a>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={index} asChild>
                  <a href={item.href}>{item.title}</a>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
