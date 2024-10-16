import { toast } from "sonner";
import { activation } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivatePage = () => {
  const { uid, token } = useParams();
  const router = useNavigate();

  const { mutate, isError, error, isLoading } = useMutation(activation, {
    onSuccess: () => {
      router("/auth/login");
      toast("Tu registro se realizo correctamente");
    },
  });
  useEffect(() => {
    if (!uid || !token) return;
    mutate({ uid, access: token });
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        isError && (
          <div>
            <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto xl:px-0 dark:bg-indigo-500">
              <div className="block mb-5 md:max-w-md">
                <img
                  src="https://flowbite-admin-dashboard.vercel.app/images/illustrations/maintenance.svg"
                  alt="maintenance image"
                />
              </div>
              <div className="text-center xl:max-w-4xl">
                <p className="mb-5 text-base font-normal text-muted md:text-lg dark:text-muted">
                  {isAxiosError(error)
                    ? error?.response?.data?.detail
                    : "Algo salío mal, intente más tarde."}
                </p>
                <a
                  href="https://flowbite-admin-dashboard.vercel.app/"
                  className="text-light bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Go back home
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ActivatePage;
