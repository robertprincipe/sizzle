import { Link } from "react-router-dom";
import NotFound from "@/assets/images/404.png";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen py-6 bg-white dark:bg-gray-900 sm:py-8 lg:py-12">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <div className="flex flex-col items-center">
          <img src={NotFound} className="h-96" alt="alt" />
          {/* <a
            href="/"
            className="text-black-800 mb-8 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="w-6 h-auto text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            Flowrift
          </a> */}

          <p className="mb-4 text-sm font-semibold text-indigo-500 uppercase md:text-base">
            Error 404
          </p>
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl dark:text-white">
            Pagina No Encontrada
          </h1>

          <p className="max-w-screen-md mb-6 text-center text-gray-500 md:text-lg">
            No encontramos el recurso que estas buscando
          </p>

          <Link
            to="/"
            className="inline-block px-8 py-3 text-sm font-semibold text-center text-gray-500 transition duration-100 bg-gray-200 rounded-lg outline-none ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
