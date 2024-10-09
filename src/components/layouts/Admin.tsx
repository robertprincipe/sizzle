import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import { useClickAway } from "react-use";
import { ThemeToggle } from "../theme-toggle";
import AvatarNav from "../atoms/AvatarNav";
import { siteConfig } from "@/config/site";
import Logo from "@/assets/images/android-chrome-192x192.png";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../shared/site-footer";
import { DashIcon } from "@radix-ui/react-icons";
import { LayoutDashboardIcon } from "lucide-react";
import { NewspaperIcon } from "lucide-react";
import { BellIcon } from "lucide-react";
import { UserCogIcon } from "lucide-react";

const AdminLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);
  useClickAway(sidebarRef, () => setIsOpenSidebar(false));
  // useRouteChange(() => setIsOpenSidebar(!true));

  return (
    <>
      <SiteHeader />
      <div className="container grid grid-cols-7 gap-5">
        <div className="sticky h-screen top-16">
          <aside className="flex flex-col h-full gap-3 py-10 border-r border-r-border">
            <NavLink
              className={({ isActive }) =>
                `px-3 flex gap-2 items-center py-2 text-sm border-l-4 ${
                  isActive
                    ? "border-l-muted-foreground bg-muted"
                    : "border-l-transparent"
                }`
              }
              to="/admin/"
            >
              <LayoutDashboardIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 flex gap-2 items-center py-2 text-sm border-l-4 ${
                  isActive
                    ? "border-l-muted-foreground bg-muted"
                    : "border-l-transparent"
                }`
              }
              to="/admin/posts"
            >
              <NewspaperIcon className="w-4 h-4" />
              <span>Blog</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 flex gap-2 items-center py-2 text-sm border-l-4 ${
                  isActive
                    ? "border-l-muted-foreground bg-muted"
                    : "border-l-transparent"
                }`
              }
              to="/admin/notifications/"
            >
              <BellIcon className="w-4 h-4" />
              <span>Notifications</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 flex gap-2 items-center py-2 text-sm border-l-4 ${
                  isActive
                    ? "border-l-muted-foreground bg-muted"
                    : "border-l-transparent"
                }`
              }
              to="/admin/account/"
            >
              <UserCogIcon className="w-4 h-4" />
              <span>Account</span>
            </NavLink>
          </aside>
        </div>
        <main className="col-span-6 my-10 space-y-4">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </>
  );
};

export default AdminLayout;
