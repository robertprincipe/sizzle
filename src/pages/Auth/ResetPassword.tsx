import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import Feedback from "@/components/atoms/Feedback";
import { resetPassword } from "@/services/auth";
import { toastError } from "@/lib/errors";

const resetPasswordSchema = z.object({
  email: z.string().email("Correo electrónico no es un formato valido."),
});

type resetPasswordData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuthStore();

  const [params] = useSearchParams();

  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: resetPasswordData) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setIsLoading(false);
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Olvido su contraseña
          </h1>
          <p className="text-sm text-muted">
            Le enviaremos un email para que pueda cambiarla nuevamente.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                placeholder="Correo electrónico"
                type="email"
                className={
                  errors.email ? "border-red-500 focus:ring-red-400" : ""
                }
                disabled={isLoading}
                {...register("email")}
              />
              {/* <Feedback field={errors.email} /> */}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enviar
            </Button>
          </div>
        </form>

        <div className="flex flex-col">
          <Link
            to={"/auth/login"}
            className="mb-2 text-xs text-center uppercase"
          >
            Creo que me acuerdo
          </Link>
        </div>

        <p className="px-8 text-sm text-center text-muted">
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

export default ResetPassword;
