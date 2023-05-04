import useClickOutside from "@/hooks/useClickOutside";
import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import useRouteChange from "@/hooks/useRouteChange";
import { useClickAway } from "react-use";

const AdminLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // const asideRef = useClickOutside(() => {
  //   console.log("asideRef");
  //   setIsOpenSidebar(false);
  // });
  const sidebarRef = useRef(null);
  useClickAway(sidebarRef, () => setIsOpenSidebar(false));
  // useRouteChange(() => setIsOpenSidebar(!true));

  return (
    <div className="min-h-full">
      <div className="sticky inset-x-0 top-0 flex px-4 bg-white border-y sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center py-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            onClick={() => setIsOpenSidebar(true)}
          >
            <Menu />
          </button>
        </div>
        <Breadcrumb />
      </div>

      <div className="container relative mx-auto lg:flex">
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          ref={sidebarRef}
        />
        <div className="w-full min-h-screen mx-auto my-5 space-y-5 lg:container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
