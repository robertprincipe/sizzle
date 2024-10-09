"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { updateUser } from "@/services/user";
import { toast } from "sonner";
// import Feedback from "@/components/atoms/Feedback";
import { IUser } from "@/types/iuser";

const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(128),
  email: z.string().email(),
  profile_info: z.string().optional(),
});

type userData = z.infer<typeof userSchema>;

type UpdateAccountFormProps = {
  user: IUser;
};

const UpdateAccountForm = ({ user }: UpdateAccountFormProps) => {
  const form = useForm<userData>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: user,
  });

  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast("Información actualizada.");
    },
  });

  const onSubmit = (user: userData) => {
    mutate({ ...user });
  };

  return (
    <>
      <div className="">
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-6">
            <div>
              <label className="sr-only">Product photo</label>

              <div className="grid flex-col justify-center sm:flex sm:items-center sm:gap-5">
                <img
                  className="relative z-10 inline-block object-cover mx-auto rounded-full sm:mx-0 aspect-square ring-4 ring-white dark:ring-dark"
                  src="https://cdn.midjourney.com/6fcdb019-5fbe-468f-8537-f1f65e364465/0_3_640_N.webp"
                  alt="Image Description"
                />
                <Button variant={"outline"}>Upload</Button>
              </div>
            </div>

            <div className="col-span-5 p-4 pt-0 sm:pt-0 sm:p-7">
              <div className="space-y-1 sm:space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Nombre de usuario</Label>
                    <Input
                      id="subject"
                      placeholder="AdAstra"
                      {...form.register("username")}
                    />
                    {/* <Feedback field={errors.username} /> */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Correo electrónico</Label>
                    <Input
                      id="subject"
                      placeholder="ad.astra@hotmail"
                      {...form.register("email")}
                    />
                    {/* <Feedback field={errors.email} /> */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Información del perfil</Label>
                  <Textarea
                    id="description"
                    placeholder="Soy de huanuco peru"
                    className="resize-none"
                    rows={4}
                    {...form.register("profile_info")}
                  />
                  {/* <Feedback field={errors.profile_info} /> */}
                </div>
              </div>

              <div className="flex mt-5 gap-x-2">
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

export default UpdateAccountForm;

/*

      <div className="grid w-full gap-4 md:gap-10">
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
      </div> 
*/
