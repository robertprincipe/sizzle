import { Link, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";
import { useQuery } from "@tanstack/react-query";
import { profileUser } from "@/services/user";
import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";
import { CogIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import IsAuthenticatedSameUserProfile from "@/components/shared/IsAuthenticatedSameUserProfile";

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
      <div className="relative bg-white shadow rounded-xl dark:bg-dark">
        <img
          src={user?.banner as string}
          alt=""
          className="object-cover w-full h-40 rounded-lg"
        />

        <IsAuthenticatedSameUserProfile username={user?.username || ""}>
          <Link
            to={`/config`}
            className="absolute right-2 top-2 active:scale-95 inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-dark dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset--dark data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-dark bg-dark text-light hover:bg-dark dark:bg-slate-50 dark:text--dark h-9 px-2 rounded-md"
          >
            <CogIcon className="hover:text-light" />
          </Link>
        </IsAuthenticatedSameUserProfile>

        <div className="p-4 pt-0 sm:pt-0 sm:p-7">
          <div className="space-y-1 sm:space-y-3">
            <div>
              <div className="grid items-center sm:flex sm:gap-x-3">
                <img
                  className="relative z-10 inline-block object-cover w-24 h-24 mx-auto -mt-8 rounded-full sm:mx-0 ring-4 ring-white dark:ring-dark"
                  src={user?.picture as string}
                  alt="Image Description"
                />

                <div className="flex flex-col items-center justify-center mt-2 md:mt-0 md:items-start">
                  <div className="font-bold text-dark dark:text-light">
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
                      {/* <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-dark text-light py-1.5 px-3 dark:bg-indigo-500">
                    Sponsored
                  </span> */}
                    </div>

                    <div className="mt-2">
                      <h3 className="text-2xl font-bold text-dark group-hover:text-dark dark:text-muted">
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
