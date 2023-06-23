import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import { useClickAway } from "react-use";
import { ThemeToggle } from "../theme-toggle";
import AvatarNav from "../atoms/AvatarNav";
import { siteConfig } from "@/config/site";
import Logo from "@/assets/images/android-chrome-192x192.png";

const AdminLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);
  useClickAway(sidebarRef, () => setIsOpenSidebar(false));
  // useRouteChange(() => setIsOpenSidebar(!true));

  return (
    <>
      <header className="w-full shadow-lg border-b-slate-200 bg-light dark:bg-dark dark:border-b-dark">
        <div className="container flex flex-col justify-center h-24">
          <div className="flex items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-6 md:gap-10">
              <Link to="/" className="items-center space-x-2 md:flex">
                <img src={Logo} className="w-8" />
                <span className="hidden font-bold sm:inline-block">
                  {siteConfig.name}
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-end flex-1 space-x-4">
              <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <AvatarNav />
              </nav>
            </div>
          </div>
          <div className="flex items-center mt-2">
            {/* <TeamSwitcher /> */}
            <nav className={"flex items-center space-x-4 lg:space-x-6"}>
              <Link
                to="/admin/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Overview
              </Link>
              <Link
                to="/admin/posts"
                className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
              >
                Publicaciones
              </Link>
              <Link
                to="/admin/notifications"
                className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
              >
                Notificaciones
              </Link>
              <Link
                to="/admin/config"
                className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
              >
                Configuracion de aplicacion
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="min-h-full">
        {/* <div className="sticky inset-x-0 top-0 flex px-4 border-y sm:px-6 md:px-8 lg:hidden dark:bg-dark dark:border-dark">
          <div className="flex items-center py-4">
            <button
              type="button"
              className="text-muted hover:text-dark"
              onClick={() => setIsOpenSidebar(true)}
            >
              <Menu />
            </button>
          </div>
          <Breadcrumb />
        </div> */}

        <div className="container relative mx-auto lg:flex">
          {/* <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          ref={sidebarRef}
        /> */}
          <div className="w-full min-h-screen mx-auto my-5 space-y-5 lg:container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
