import { Link, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";
import { useQuery } from "@tanstack/react-query";
import { profileUser } from "@/services/user";
import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";

const ProfilePage = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useQuery(
    ["profileUser", username],
    () => profileUser(username || ""),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(user);

  return (
    <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
      <div className="bg-white shadow rounded-xl dark:bg-slate-900">
        <div className="relative h-40 rounded-t-xl bg-[url('https://cdn.midjourney.com/6fcdb019-5fbe-468f-8537-f1f65e364465/0_3_640_N.webp')] bg-no-repeat bg-cover bg-center">
          <div className="absolute top-0 right-0 p-4"></div>
        </div>

        <div className="p-4 pt-0 sm:pt-0 sm:p-7">
          <div className="space-y-1 sm:space-y-3">
            <div>
              <div className="grid items-center sm:flex sm:gap-x-3">
                <img
                  className="relative z-10 inline-block w-24 h-24 mx-auto -mt-8 rounded-full sm:mx-0 ring-4 ring-white dark:ring-gray-800"
                  src="https://cdn.midjourney.com/6fcdb019-5fbe-468f-8537-f1f65e364465/0_3_640_N.webp"
                  alt="Image Description"
                />

                <div className="flex flex-col items-center justify-center mt-2 md:mt-0 md:items-start">
                  <div className="font-bold text-gray-800">
                    @{user?.username}
                  </div>
                  <p>{user?.profile_info}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl py-6">
        <h2 className="text-3xl font-bold text-center">Publicaciones</h2>
        {isLoading ? (
          <ArticlesSkeleton />
        ) : (
          <>
            {user?.posts?.length ? (
              <div className="grid gap-10 mt-6 sm:grid-cols-2">
                {user?.posts?.map((post) => (
                  <Link
                    className="overflow-hidden group rounded-xl"
                    to={`/post/${post.slug}`}
                    key={post.id}
                  >
                    <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                      <img
                        className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 ease-in-out rounded-lg group-hover:scale-105"
                        src={post.cover_image as string}
                        alt="Image Description"
                      />
                      {/* <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                    Sponsored
                  </span> */}
                    </div>

                    <div className="mt-2">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                        {post.title}
                      </h3>
                      {post.tags && (
                        <div className="space-x-2">
                          {post.tags.map((tag) => (
                            <span
                              className="mt-2 text-sm text-blue-500"
                              key={tag.name}
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center mt-4 text-lg font-semibold">
                No hay publicaciones
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
