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
        <div className="flex items-center space-x-4 rounded-md p-2 dark:hover:bg-gray-900 hover:bg-gray-400 dark:hover:text-gray-50 hover:text-gray-800">
          <Bell className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Everything</p>
            <p className="text-sm text-muted-foreground">
              Email digest, mentions & all activity.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-gray-400 dark:bg-gray-900 p-2 text-gray-800 dark:text-gray-50">
          <AtSign className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Available</p>
            <p className="text-sm text-muted-foreground">
              Only mentions and comments.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md p-2 dark:hover:bg-gray-900 hover:bg-gray-400 dark:hover:text-gray-50 hover:text-gray-800">
          <BellOff className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Ignoring</p>
            <p className="text-sm text-muted-foreground">
              Turn off all notifications.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
