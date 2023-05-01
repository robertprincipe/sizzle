import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MailCheck } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Feedback from "@/components/atoms/Feedback";
import { useAuthStore } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { signup } from "@/services/auth";
import { toastError } from "@/lib/errors";

const signUpSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/,
      "Solo puede contener punto, guion y subraya sin espacios."
    )
    .min(3, "Nombre de usuario debe tener al menos 3 caracteres.")
    .max(150, "Nombre de usuario debe tener maximo 150 caracteres."),
  email: z.string().email("Correo electrónico no es un formato valido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  re_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

type signUpData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // const signup = useAuthStore((state) => state.signup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: signUpData) => {
    setIsLoading(true);
    try {
      await signup(data);
      setIsLoading(false);
      setIsOpenDialog(true);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Registrase
            </h1>
            <p className="text-sm text-muted-foreground">
              Podrás acceder a muchas herramientas y publicaciones ocultas.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Input
                  placeholder="Nombre de usuario"
                  className={
                    errors.username ? "border-red-500 focus:ring-red-400" : ""
                  }
                  disabled={isLoading}
                  {...register("username")}
                />
                <Feedback field={errors.username} />
                <Input
                  placeholder="Correo electrónico"
                  type="email"
                  className={
                    errors.email ? "border-red-500 focus:ring-red-400" : ""
                  }
                  disabled={isLoading}
                  {...register("email")}
                />
                <Feedback field={errors.email} />
                <Input
                  placeholder="Contraseña"
                  type="password"
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                  {...register("password")}
                />
                <Input
                  placeholder="Repetir contraseña"
                  type="password"
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                  {...register("re_password")}
                />
                <Feedback field={errors.password} />
              </div>
              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Registrarme
              </Button>
            </div>
          </form>

          <div className="flex flex-col">
            <Link
              to={"/auth/resend-activation"}
              className="text-center uppercase text-xs mb-2"
            >
              He perdido el correo de activación
            </Link>

            <Link
              to={"/auth/login"}
              className="relative flex justify-center text-xs uppercase"
            >
              <span className="px-2 bg-background text-muted-foreground">
                Ya tengo una cuenta
              </span>
            </Link>
          </div>

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

      <Dialog
        open={isOpenDialog}
        onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
      >
        <DialogContent>
          <DialogHeader>
            <div className="px-4 text-center overflow-y-auto">
              <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                Registo exitoso!!
              </h3>
              <span className="mb-4 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
                <MailCheck className="text-green-600" />
              </span>
              <p className="text-gray-500 mb-3">
                Revisa tu inbox para poder activar tu cuenta
              </p>

              <ul className="flex justify-center space-x-2">
                <li>
                  <a
                    href="https://gmail.com"
                    target="_blank"
                    className="px-3 py-2 w-fit rounded-lg hover:ring-2 border border-gray-200 ring-offset-2 ring-gray-500 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 mr-2"
                      viewBox="52 42 88 66"
                    >
                      <path
                        fill="#4285f4"
                        d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
                      />
                      <path
                        fill="#34a853"
                        d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
                      />
                      <path
                        fill="#fbbc04"
                        d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
                      />
                      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
                      <path
                        fill="#c5221f"
                        d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
                      />
                    </svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://hotmail.com"
                    target="_blank"
                    className="px-3 py-2 w-fit rounded-lg hover:ring-2 border border-gray-200 ring-offset-2 ring-gray-500 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 mr-2"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Livello_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1831.085 1703.335"
                      enableBackground="new 0 0 1831.085 1703.335"
                      xmlSpace="preserve"
                    >
                      <path
                        fill="#0A2767"
                        d="M1831.083,894.25c0.1-14.318-7.298-27.644-19.503-35.131h-0.213l-0.767-0.426l-634.492-375.585  c-2.74-1.851-5.583-3.543-8.517-5.067c-24.498-12.639-53.599-12.639-78.098,0c-2.934,1.525-5.777,3.216-8.517,5.067L446.486,858.693  l-0.766,0.426c-19.392,12.059-25.337,37.556-13.278,56.948c3.553,5.714,8.447,10.474,14.257,13.868l634.492,375.585  c2.749,1.835,5.592,3.527,8.517,5.068c24.498,12.639,53.599,12.639,78.098,0c2.925-1.541,5.767-3.232,8.517-5.068l634.492-375.585  C1823.49,922.545,1831.228,908.923,1831.083,894.25z"
                      />
                      <path
                        fill="#0364B8"
                        d="M520.453,643.477h416.38v381.674h-416.38V643.477z M1745.917,255.5V80.908  c1-43.652-33.552-79.862-77.203-80.908H588.204C544.552,1.046,510,37.256,511,80.908V255.5l638.75,170.333L1745.917,255.5z"
                      />
                      <path
                        fill="#0078D4"
                        d="M511,255.5h425.833v383.25H511V255.5z"
                      />
                      <path
                        fill="#28A8EA"
                        d="M1362.667,255.5H936.833v383.25L1362.667,1022h383.25V638.75L1362.667,255.5z"
                      />
                      <path
                        fill="#0078D4"
                        d="M936.833,638.75h425.833V1022H936.833V638.75z"
                      />
                      <path
                        fill="#0364B8"
                        d="M936.833,1022h425.833v383.25H936.833V1022z"
                      />
                      <path
                        fill="#14447D"
                        d="M520.453,1025.151h416.38v346.969h-416.38V1025.151z"
                      />
                      <path
                        fill="#0078D4"
                        d="M1362.667,1022h383.25v383.25h-383.25V1022z"
                      />
                      <linearGradient
                        id="SVGID_1_"
                        gradientUnits="userSpaceOnUse"
                        x1="1128.4584"
                        y1="811.0833"
                        x2="1128.4584"
                        y2="1.9982"
                        gradientTransform="matrix(1 0 0 -1 0 1705.3334)"
                      >
                        <stop offset="0" style={{ stopColor: "#35B8F1" }} />
                        <stop offset="1" style={{ stopColor: "#28A8EA" }} />
                      </linearGradient>
                      <path
                        fill="url(#SVGID_1_)"
                        d="M1811.58,927.593l-0.809,0.426l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-10.777,5.132-22.481,8.029-34.407,8.517l-34.663-20.27c-2.929-1.47-5.773-3.105-8.517-4.897L447.167,906.003h-0.298  l-21.036-11.753v722.384c0.328,48.196,39.653,87.006,87.849,86.7h1230.914c0.724,0,1.363-0.341,2.129-0.341  c10.18-0.651,20.216-2.745,29.808-6.217c4.145-1.756,8.146-3.835,11.966-6.217c2.853-1.618,7.75-5.152,7.75-5.152  c21.814-16.142,34.726-41.635,34.833-68.772V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z"
                      />
                      <path
                        opacity="0.5"
                        fill="#0A2767"
                        enableBackground="new    "
                        d="M1797.017,891.397v44.287l-663.448,456.791L446.699,906.301  c0-0.235-0.191-0.426-0.426-0.426l0,0l-63.023-37.899v-31.938l25.976-0.426l54.932,31.512l1.277,0.426l4.684,2.981  c0,0,645.563,368.346,647.267,369.197l24.698,14.478c2.129-0.852,4.258-1.703,6.813-2.555  c1.278-0.852,640.879-360.681,640.879-360.681L1797.017,891.397z"
                      />
                      <path
                        fill="#1490DF"
                        d="M1811.58,927.593l-0.809,0.468l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-24.641,12.038-53.457,12.038-78.098,0c-2.918-1.445-5.76-3.037-8.517-4.769L446.657,928.061l-0.766-0.468  c-12.25-6.642-19.93-19.409-20.057-33.343v722.384c0.305,48.188,39.616,87.004,87.803,86.7c0.001,0,0.002,0,0.004,0h1229.636  c48.188,0.307,87.5-38.509,87.807-86.696c0-0.001,0-0.002,0-0.004V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z"
                      />
                      <path
                        opacity="0.1"
                        enableBackground="new    "
                        d="M1185.52,1279.629l-9.496,5.323c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l241.405,285.479l421.107,101.476c11.539-8.716,20.717-20.178,26.7-33.343L1185.52,1279.629  z"
                      />
                      <path
                        opacity="0.05"
                        enableBackground="new    "
                        d="M1228.529,1255.442l-52.505,29.51c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l113.101,311.838l549.538,74.989c21.649-16.254,34.394-41.743,34.407-68.815v-9.326  L1228.529,1255.442z"
                      />
                      <path
                        fill="#28A8EA"
                        d="M514.833,1703.333h1228.316c18.901,0.096,37.335-5.874,52.59-17.033l-697.089-408.331  c-2.929-1.47-5.773-3.105-8.517-4.897L447.125,906.088h-0.298l-20.993-11.838v719.914  C425.786,1663.364,465.632,1703.286,514.833,1703.333C514.832,1703.333,514.832,1703.333,514.833,1703.333z"
                      />
                      <path
                        opacity="0.1"
                        enableBackground="new    "
                        d="M1022,418.722v908.303c-0.076,31.846-19.44,60.471-48.971,72.392  c-9.148,3.931-19,5.96-28.957,5.962H425.833V383.25H511v-42.583h433.073C987.092,340.83,1021.907,375.702,1022,418.722z"
                      />
                      <path
                        opacity="0.2"
                        enableBackground="new    "
                        d="M979.417,461.305v908.302c0.107,10.287-2.074,20.469-6.388,29.808  c-11.826,29.149-40.083,48.273-71.54,48.417H425.833V383.25h475.656c12.356-0.124,24.533,2.958,35.344,8.943  C962.937,405.344,979.407,432.076,979.417,461.305z"
                      />
                      <path
                        opacity="0.2"
                        enableBackground="new    "
                        d="M979.417,461.305v823.136c-0.208,43-34.928,77.853-77.927,78.225H425.833V383.25  h475.656c12.356-0.124,24.533,2.958,35.344,8.943C962.937,405.344,979.407,432.076,979.417,461.305z"
                      />
                      <path
                        opacity="0.2"
                        enableBackground="new    "
                        d="M936.833,461.305v823.136c-0.046,43.067-34.861,78.015-77.927,78.225H425.833  V383.25h433.072c43.062,0.023,77.951,34.951,77.927,78.013C936.833,461.277,936.833,461.291,936.833,461.305z"
                      />
                      <linearGradient
                        id="SVGID_2_"
                        gradientUnits="userSpaceOnUse"
                        x1="162.7469"
                        y1="1383.0741"
                        x2="774.0864"
                        y2="324.2592"
                        gradientTransform="matrix(1 0 0 -1 0 1705.3334)"
                      >
                        <stop offset="0" style={{ stopColor: "#1784D9" }} />
                        <stop offset="0.5" style={{ stopColor: "#107AD5" }} />
                        <stop offset="1" style={{ stopColor: "#0A63C9" }} />
                      </linearGradient>
                      <path
                        fill="url(#SVGID_2_)"
                        d="M78.055,383.25h780.723c43.109,0,78.055,34.947,78.055,78.055v780.723  c0,43.109-34.946,78.055-78.055,78.055H78.055c-43.109,0-78.055-34.947-78.055-78.055V461.305  C0,418.197,34.947,383.25,78.055,383.25z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M243.96,710.631c19.238-40.988,50.29-75.289,89.17-98.495c43.057-24.651,92.081-36.94,141.675-35.515  c45.965-0.997,91.321,10.655,131.114,33.683c37.414,22.312,67.547,55.004,86.742,94.109c20.904,43.09,31.322,90.512,30.405,138.396  c1.013,50.043-9.706,99.628-31.299,144.783c-19.652,40.503-50.741,74.36-89.425,97.388c-41.327,23.734-88.367,35.692-136.011,34.578  c-46.947,1.133-93.303-10.651-134.01-34.067c-37.738-22.341-68.249-55.07-87.892-94.28c-21.028-42.467-31.57-89.355-30.745-136.735  C212.808,804.859,223.158,755.686,243.96,710.631z M339.006,941.858c10.257,25.912,27.651,48.385,50.163,64.812  c22.93,16.026,50.387,24.294,78.353,23.591c29.783,1.178,59.14-7.372,83.634-24.358c22.227-16.375,39.164-38.909,48.715-64.812  c10.677-28.928,15.946-59.572,15.543-90.404c0.33-31.127-4.623-62.084-14.649-91.554c-8.855-26.607-25.246-50.069-47.182-67.537  c-23.88-17.79-53.158-26.813-82.91-25.55c-28.572-0.74-56.644,7.593-80.184,23.804c-22.893,16.496-40.617,39.168-51.1,65.365  c-23.255,60.049-23.376,126.595-0.341,186.728L339.006,941.858z"
                      />
                      <path
                        fill="#50D9FF"
                        d="M1362.667,255.5h383.25v383.25h-383.25V255.5z"
                      />
                    </svg>
                    <span>Inbox</span>
                  </a>
                </li>
              </ul>

              <div className="mt-3 flex justify-center gap-x-4">
                <Link
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  to={"/auth/login"}
                >
                  Ingresar
                </Link>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpPage;
