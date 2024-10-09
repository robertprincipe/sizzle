import Logo from "@/assets/images/android-chrome-192x192.png";

import { siteConfig } from "@/config/site";

import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const AuthLayout = () => {
  return (
    <section className="container relative grid flex-col items-center justify-center h-screen md:max-w-none md:grid-cols-2 md:px-0">
      <div className="flex z-20 items-center inset-x-4 lg:inset-x-10 justify-between absolute top-4 lg:right-8 md:top-8">
        <Link
          to="/"
          className="z-20 flex items-center text-lg text-card md:text-light dark:text-light md:dark:text-card font-medium"
        >
          <img src={Logo} className="w-8 mr-1" /> Sizzle
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-base hover:bg-transparent focus:ring-0"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={24}
            className="w-[300px] overflow-scroll"
          >
            {/* <DropdownMenuSeparator /> */}
            {siteConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative flex-col hidden h-screen p-10 text-light bg-muted md:flex">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.midjourney.com/42013eec-09fb-40c5-b7e6-2b1a771ee9e7/0_1_640_N.webp)",
          }}
        />
        <div className="relative z-20 mt-auto">
          {/* <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before. Highly recommended!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote> */}
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
