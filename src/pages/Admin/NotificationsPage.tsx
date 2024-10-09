import Heading from "@/components/layouts/components/Heading";
import { AtSign, Bell, BellOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPage = () => {
  return (
    <>
      <Heading
        title="Notificaciones"
        description="Tu historial de notificaciones"
      />

       <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Publicados</TabsTrigger>
            <TabsTrigger value="password">Borradores</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <article className="flex gap-3">
              <img className="w-16 h-16 aspect-square rounded-full" src="https://ideogram.ai/api/images/direct/7BE9ke8cQCi1KsSHfNgTeA.jpg" alt="" />
              <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="text-xs">
                  <span className="font-medium">@make</span>{" "}
                  <span className="text-muted-foreground">replied on:</span>
                </div>
                <h4 className="italic text-sm font-medium">"The Brightest Stars in the Darkness Sky"</h4>
              </div>
              <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim.</p>
              </div>
              <div className="text-xs flex gap-3">
                <time>29 Sep</time>
                <button>Reply</button>
                <button>Delete</button>
              </div>
              </div>
            </article>
          </TabsContent>
          <TabsContent value="password"></TabsContent>
        </Tabs>
    </>
  );
};

export default NotificationsPage;
