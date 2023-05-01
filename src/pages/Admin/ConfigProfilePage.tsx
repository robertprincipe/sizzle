"use client";

import Dropimage from "@/components/organisms/Dropimage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { removeImageProfileUser, updateUser } from "@/services/user";
import { useToast } from "@/hooks/use-toast";
import Feedback from "@/components/atoms/Feedback";
import { toastError } from "@/lib/errors";

const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(128),
  email: z.string().email(),
  profile_info: z.string().optional(),
});

type userData = z.infer<typeof userSchema>;

const ConfigProfilePage = () => {
  const [picture, setPicture] = useState<Blob | string>();
  const [banner, setBanner] = useState<Blob | string>();
  const user = useAuthStore((state) => state.user);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userData>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(updateUser, {
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          description: Object.values(error.response?.data)
            .map((msg) => msg)
            .join("\n"),
          variant: "destructive",
        });
      } else {
        toast({
          description: "Algo salio mal, intente más tarde",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Publicación guardada.",
      });
    },
  });

  useEffect(() => {
    if (user) {
      setPicture(user?.picture);
      setBanner(user?.banner);
      reset(user);
    }
  }, [user]);

  const onSubmit = (user: userData) => {
    mutate({ ...user, picture, banner });
  };

  const removePictureProfile = async () => {
    try {
      const { data } = await removeImageProfileUser(user?.id || "", "picture");
      toast({ description: data.message });
    } catch (error) {
      toastError(error);
    }
  };

  const removeBannerProfile = async () => {
    try {
      const { data } = await removeImageProfileUser(user?.id || "", "banner");
      toast({ description: data.message });
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="grid w-full gap-4 md:gap-10">
      <div className="container flex items-center justify-center w-full mx-auto mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[800px]">
          <Card className="p-0 rounded-lg">
            <CardHeader>
              <CardTitle>Actualizar Información del perfil.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative mb-24">
                <Dropimage
                  imageUrl={banner}
                  setImageFile={setBanner}
                  previewHeight={52}
                  onRemoveImageUrl={removeBannerProfile}
                />
                <div className="absolute rounded-full shadow -bottom-1/2 left-4 dark:shadow-gray-400">
                  <Dropimage
                    imageUrl={picture}
                    isCircle
                    setImageFile={setPicture}
                    onRemoveImageUrl={removePictureProfile}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Nombre de usuario</Label>
                <Input
                  id="subject"
                  placeholder="AdAstra"
                  {...register("username")}
                />
                <Feedback field={errors.username} />
              </div>
              <input type="text" {...register("id")} hidden />
              <div className="grid gap-2">
                <Label htmlFor="subject">Correo electrónico</Label>
                <Input
                  id="subject"
                  placeholder="ad.astra@hotmail"
                  {...register("email")}
                />
                <Feedback field={errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Información del perfil</Label>
                <Textarea
                  id="description"
                  placeholder="Soy de huanuco peru"
                  {...register("profile_info")}
                />
                <Feedback field={errors.profile_info} />
              </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ConfigProfilePage;
