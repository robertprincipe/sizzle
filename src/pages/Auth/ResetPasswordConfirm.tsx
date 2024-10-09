import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import Feedback from "@/components/atoms/Feedback";
import { resetPasswordConfirm } from "@/services/auth";
import { toastError } from "@/lib/errors";

const resetPasswordConfirmSchema = z.object({
  new_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  re_new_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

type resetPasswordConfirmData = z.infer<typeof resetPasswordConfirmSchema>;

const ResetPasswordConfirm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, access } = useAuthStore();

  const [params] = useSearchParams();

  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordConfirmData>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    mode: "onSubmit",
  });
  //   router({ pathname: params.get("backTo") ?? "/" });

  const onSubmit = async (data: resetPasswordConfirmData) => {
    setIsLoading(true);
    try {
      await resetPasswordConfirm(
        user?.id || "",
        access || "",
        data.new_password,
        data.re_new_password
      );
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
            Cambiar contreña
          </h1>
          <p className="text-sm text-muted">
            Ponga una contraseña dificil pero a la vez que pueda recordar
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Input
                placeholder="Nueva contraseña"
                type="password"
                disabled={isLoading}
                {...register("new_password")}
              />
              {/* <Feedback field={errors.new_password} /> */}
              <Input
                placeholder="Repetir nueva contraseña"
                type="password"
                disabled={isLoading}
                {...register("re_new_password")}
              />
              {/* <Feedback field={errors.re_new_password} /> */}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Cambiar contraseña
            </Button>
          </div>
        </form>

        <div className="flex flex-col">
          <Link
            to={"/auth/forgot-password"}
            className="mb-2 text-xs text-center uppercase"
          >
            Olvidaste tu contraseña?
          </Link>

          <Link
            to={"/auth/resetPasswordConfirm"}
            className="relative flex justify-center text-xs uppercase"
          >
            <span className="px-2 text-muted bg-card">O registrate</span>
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

export default ResetPasswordConfirm;
