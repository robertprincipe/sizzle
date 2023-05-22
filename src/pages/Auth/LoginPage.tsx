import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Feedback from "@/components/atoms/Feedback";

const signUpSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/,
      "Solo puede contener punto, guion y subraya sin espacios."
    )
    .min(3, "Nombre de usuario debe tener al menos 3 caracteres.")
    .max(150, "Nombre de usuario debe tener maximo 150 caracteres."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

type loginData = z.infer<typeof signUpSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuthStore();

  const [params] = useSearchParams();

  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: loginData) => {
    setIsLoading(true);
    login(data.username, data.password);
    setIsLoading(false);
  };
  if (isAuthenticated) return <Navigate to={params.get("backTo") ?? "/"} />;

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hola de nuevo
          </h1>
          <p className="text-sm text-gray-300">
            Ingresa tu nombre de usuario y contraseña
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                placeholder="Nombre de usuario"
                disabled={isLoading}
                {...register("username")}
              />
              <Feedback field={errors.username} />
              <Input
                placeholder="Contraseña"
                type="password"
                disabled={isLoading}
                {...register("password")}
              />
              <Feedback field={errors.password} />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Ingresar
            </Button>
          </div>
        </form>

        <div className="flex flex-col">
          <Link
            to={"/auth/forgot-password"}
            className="text-center uppercase text-xs mb-2"
          >
            Olvidaste tu contraseña?
          </Link>

          <Link
            to={"/auth/signup"}
            className="relative flex justify-center text-xs uppercase"
          >
            <span className="px-2 bggray-900 text-gray-300">
              Soy nuevo quiero registrarme
            </span>
          </Link>
        </div>

        <p className="px-8 text-sm text-center text-gray-300">
          By clicking continue, you agree to our{" "}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
