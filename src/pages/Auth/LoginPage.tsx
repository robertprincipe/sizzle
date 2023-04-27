import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Loader2 } from "lucide-react";
import { useState } from "react";

import { Command } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Head from "@/components/shared/Head";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Feedback from "@/components/atoms/Feedback";

interface LoginPageProps extends React.HTMLAttributes<HTMLDivElement> {}

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

const LoginPage = ({ className, ...props }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuthStore();

  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: loginData) {
    setIsLoading(true);
    login(data.username, data.password);
    setTimeout(() => {
      setIsLoading(false);
      router({ pathname: "/" });
    }, 1000);
  }

  return (
    <section className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Head title="Iniciar sesión" />
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        <Home />
      </Link>
      <div className="relative flex-col hidden h-screen p-10 text-white bg-muted lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="w-6 h-6 mr-2" /> Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before. Highly recommended!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
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
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Ingresar
                </Button>
              </div>
            </form>
          </div>

          <Link
            to={"/signup"}
            className="relative flex justify-center text-xs uppercase"
          >
            <span className="px-2 bg-background text-muted-foreground">
              O registrate
            </span>
          </Link>

          <p className="px-8 text-sm text-center text-muted-foreground">
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
    </section>
  );
};

export default LoginPage;
