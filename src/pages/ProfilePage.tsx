import { useParams } from "react-router-dom";

import Head from "@/components/shared/Head";

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Head title="Perfil" />
      <div className="max-w-2xl mx-auto lg:max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
            Mi perfil
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-start mt-12 lg:gap-16">
          <div className="lg:w-1/3">
            <img
              src="https://via.placeholder.com/350x350"
              alt="Profile"
              className="rounded-full w-56 h-56 mx-auto"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Nombre del usuario
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Biografía del usuario
            </p>
            <div className="mt-4 flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Seguir
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300">
                Mensaje
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Publicaciones recientes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://via.placeholder.com/500x500"
                alt="Post"
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">
                Título del post
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Descripción del post
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://via.placeholder.com/500x500"
                alt="Post"
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">
                Título del post
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Descripción del post
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://via.placeholder.com/500x500"
                alt="Post"
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">
                Título del post
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Descripción del post
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
