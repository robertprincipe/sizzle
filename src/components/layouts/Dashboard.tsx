import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link, Outlet } from "react-router-dom";
import { Input } from "../ui/input";
import { UserNav } from "@/pages/Admin/components/user-nav";
import TeamSwitcher from "@/pages/Admin/components/team-switcher";

export default function DashboardLayout() {
  return (
    <>
      <div className="container flex flex-col mx-auto">
        <div className="flex-1 space-y-4 md:p-8 md:pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <Link to="/dashboard">
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </Link>
              <Link to="/dashboard/posts">
                <TabsTrigger value="posts">Publicaciones</TabsTrigger>
              </Link>
              <Link to="/dashboard/notifications">
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              </Link>
            </TabsList>

            <Outlet />
          </Tabs>
        </div>
      </div>
    </>
  );
}
