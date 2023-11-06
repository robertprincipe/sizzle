"use client";

import Dropimage from "@/components/organisms/Dropimage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { removeImageProfileUser, updateUser } from "@/services/user";
import { toast } from "sonner";
// import Feedback from "@/components/atoms/Feedback";
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
    onSuccess: () => {
      toast("Información actualizada.");
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
      toast(data.message);
    } catch (error) {
      toastError(error);
    }
  };

  const removeBannerProfile = async () => {
    try {
      const { data } = await removeImageProfileUser(user?.id || "", "banner");
      toast(data.message);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      {/* <div className="grid w-full gap-4 md:gap-10">
        <div className="container flex items-center justify-center w-full mx-auto mt-5">
          <Card className="p-0 rounded-lg">
            <CardHeader>
              <CardTitle>Actualizar Información del perfil.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative mb-24">
                <Dropimage
                  imageUrl={banner}
                  setImageFile={setBanner}
                  onRemoveImageUrl={removeBannerProfile}
                />
                <div className="absolute rounded-full shadow -bottom-1/2 left-4 dark:shadow-muted">
                  <Dropimage
                    imageUrl={picture}
                    isCircle
                    setImageFile={setPicture}
                    onRemoveImageUrl={removePictureProfile}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2"></CardFooter>
          </Card>
        </div>
      </div> */}

      <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[800px]">
          <div className="bg-white shadow rounded-xl dark:bg-dark">
            <div className="relative h-40 rounded-t-xl bg-[url('https://cdn.midjourney.com/6fcdb019-5fbe-468f-8537-f1f65e364465/0_3_640_N.webp')] bg-no-repeat bg-cover bg-center">
              <div className="absolute top-0 right-0 p-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-dark align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-dark dark:hover:bg-dark dark:border-dark dark:text-muted dark:hover:text-light dark:focus:ring-offset-dark"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  Upload header
                </button>
              </div>
            </div>

            <div className="p-4 pt-0 sm:pt-0 sm:p-7">
              <div className="space-y-1 sm:space-y-3">
                <div>
                  <label className="sr-only">Product photo</label>

                  <div className="grid sm:flex sm:items-center sm:gap-x-5">
                    <img
                      className="relative z-10 inline-block w-24 h-24 mx-auto -mt-8 rounded-full sm:mx-0 ring-4 ring-white dark:ring-dark"
                      src="https://cdn.midjourney.com/6fcdb019-5fbe-468f-8537-f1f65e364465/0_3_640_N.webp"
                      alt="Image Description"
                    />

                    <div className="mt-4 sm:mt-auto sm:mb-1.5 flex justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-dark align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-dark dark:hover:bg-dark dark:border-dark dark:text-muted dark:hover:text-light dark:focus:ring-offset-dark"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                        Upload logo
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-dark dark:hover:bg-dark dark:border-dark dark:text-red-400 dark:hover:text-light dark:focus:ring-offset-dark"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Nombre de usuario</Label>
                  <Input
                    id="subject"
                    placeholder="AdAstra"
                    {...register("username")}
                  />
                  {/* <Feedback field={errors.username} /> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Correo electrónico</Label>
                  <Input
                    id="subject"
                    placeholder="ad.astra@hotmail"
                    {...register("email")}
                  />
                  {/* <Feedback field={errors.email} /> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Información del perfil</Label>
                  <Textarea
                    id="description"
                    placeholder="Soy de huanuco peru"
                    {...register("profile_info")}
                  />
                  {/* <Feedback field={errors.profile_info} /> */}
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-x-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ConfigProfilePage;
