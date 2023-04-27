"use client";

import Dropimage from "@/components/organisms/Dropimage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ConfigProfilePage = () => {
  const [picture, setPicture] = useState<Blob>();
  return (
    <div className="grid w-full gap-4 md:gap-10">
      <div className="container flex items-center justify-center w-full mx-auto mt-5">
        <div className="lg:w-[800px]">
          <Card className="p-0 rounded-lg">
            <CardHeader>
              <CardTitle>Actualizar Información del perfil.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative mb-24">
                <Dropimage setImageFile={setPicture} previewHeight={52} />
                <div className="absolute -bottom-1/2 left-4 shadow dark:shadow-gray-400 rounded-full">
                  <Dropimage isCircle setImageFile={setPicture} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Nombre de usuario</Label>
                <Input id="subject" placeholder="AdAstra" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Correo electrónico</Label>
                <Input id="subject" placeholder="ad.astra@hotmail" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Información del perfil</Label>
                <Textarea id="description" placeholder="Soy de huanuco peru" />
              </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfigProfilePage;
