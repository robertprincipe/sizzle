import Heading from "@/components/layouts/components/Heading";
import { AtSign, Bell, BellOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotificationsPage = () => {
  return (
    <>
      <Heading
        title="Notificaciones"
        description="Tu historial de notificaciones"
      />

      <div className="grid gap-1 p-1.5 bg-gray-50 shadow dark:bg-black rounded-lg">
        <div className="flex items-center space-x-4 rounded-md p-2 dark:hover:bg-indigo-500 hover:bg-muted dark:hover:text-gray-50 hover:text-dark">
          <Bell className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Everything</p>
            <p className="text-sm text-muted">
              Email digest, mentions & all activity.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-muted dark:bg-indigo-500 p-2 text-dark dark:text-gray-50">
          <AtSign className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Available</p>
            <p className="text-sm text-muted">Only mentions and comments.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md p-2 dark:hover:bg-indigo-500 hover:bg-muted dark:hover:text-gray-50 hover:text-dark">
          <BellOff className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Ignoring</p>
            <p className="text-sm text-muted">Turn off all notifications.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
