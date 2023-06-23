import { Megaphone } from "lucide-react";
import { FileBadge, Gauge } from "lucide-react";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = forwardRef<
  HTMLElement,
  { isOpenSidebar: boolean; setIsOpenSidebar: (isOpenSidebar: boolean) => void }
>(({ isOpenSidebar, setIsOpenSidebar }, ref) => {
  return (
    <aside
      className={`fixed left-0 bottom-0 ${
        isOpenSidebar ? "" : "-translate-x-full"
      } lg:w-64 pt-4 pb-10 overflow-y-auto left-0 dark:bg-indigo-500 transition-all duration-300 transform border-r border-muted lg:static hs-overlay hs-overlay-open:translate-x-0 top-16 scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:border-dark`}
      ref={ref}
    >
      <nav className="flex flex-col flex-wrap w-full px-6">
        <ul className="space-y-1.5">
          <li>
            <NavLink
              to="/dashboard/"
              className={({ isActive }) =>
                `${
                  isActive ? "dark:text-light" : "dark:text-slate-400"
                }  flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-dark rounded-md dark:hover:text-slate-300`
              }
              onClick={() => setIsOpenSidebar(false)}
            >
              <Gauge className="w-5" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/posts"
              className={({ isActive }) =>
                `${
                  isActive ? "dark:text-light" : "dark:text-slate-400"
                }  flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-dark rounded-md dark:hover:text-slate-300`
              }
              onClick={() => setIsOpenSidebar(false)}
            >
              <FileBadge className="w-5" />
              Publicaciones
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/notifications"
              className={({ isActive }) =>
                `${
                  isActive ? "dark:text-light" : "dark:text-slate-400"
                }  flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-dark rounded-md dark:hover:text-slate-300`
              }
              onClick={() => setIsOpenSidebar(false)}
            >
              <Megaphone className="w-5" />
              Notificaciones
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
});

export default Sidebar;
