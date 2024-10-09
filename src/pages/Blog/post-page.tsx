import { fromNow } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";
import Comments from "@/components/organisms/Comments";
import useWebSocket from "react-use-websocket";
import { useAuthStore } from "@/store/auth";
import { IReactionList } from "@/types/iblog";
import { lazy, useState } from "react";

import { ChevronUpIcon, Instagram, SmilePlusIcon, Twitter } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { MessagesSquareIcon } from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SmoothScrollLink } from "./smooth-link";
import { TOC } from "@/components/TOC";
import CardGlowing from "./card-glowing";

const ContentPost = lazy(() => import("@/components/molecules/ContentPost"));

export default function PostPage() {
  const token = useAuthStore((state) => state.access);
  const { slug } = useParams();
  const { data: post, isLoading } = useQuery(
    ["postDetail", slug],
    () => postDetail(slug || ""),
    {
      retry: false,
    }
  );

  const [reactionList, setReactionList] = useState<IReactionList>();

  const { isMobile } = useMediaQuery();

  const { sendJsonMessage } = useWebSocket(
    post?.id && token
      ? `ws://127.0.0.1:8000/ws/react-post/${post.id}/?token=${token}`
      : null,
    {
      onOpen: () => {
        console.log("Connected!");
      },
      onClose: () => {
        console.log("Disconnected!");
      },
      onMessage: (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        switch (data.type) {
          case "reaction_list":
            setReactionList(data.reactions);
            break;
          default:
            console.error("Received unknown message type: ", data.type);
            break;
        }
      },
    }
  );

  if (!post) return null;

  return (
    <>
      <Head title={post?.title || "Cargando..."} />

      <section className="max-w-6xl mx-auto">
        <div className="py-8 md:px-12">
          <h1 className="max-w-2xl mb-6 text-3xl font-bold md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="text-sm text-accent-foreground">
                <span>By {post.author?.username}</span>{" "}
                <time className="text-muted-foreground">
                  {fromNow(post.created_at || new Date())}
                </time>
              </div>
              <span>&bull;</span>
              <p className="max-w-lg font-medium text-muted-foreground">
                {post.reading_time} minuto de lectura
              </p>
              <div className="flex gap-2">
                <a href="#reactions">
                  <SmilePlusIcon className="w-5 h-5" />
                </a>
                <SmoothScrollLink to="#comments">
                  <MessagesSquareIcon className="w-5 h-5" />
                </SmoothScrollLink>
              </div>
            </div>

            <div className="flex gap-1.5 flex-wrap">
               <span className='relative inline-block overflow-hidden rounded-full p-[1px]'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium text-white rounded-full cursor-pointer bg-slate-950/90 backdrop-blur-3xl'>
        Badge Text
      </div>
    </span>
              {post.tags?.map((tag, idx) => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.name}`}
                  className={`${
                    idx === 0
                      ? "text-muted-foreground"
                      : "bg-muted text-muted-foreground"
                  } text-sm rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline`}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <img src={post.cover_image as string} className="rounded-2xl" alt="" />
        <div className="py-8 md:px-12">
          <div className="grid flex-col-reverse lg:grid-cols-5">
            <div className="col-span-2">
              <div className="sticky top-20">
                {isMobile ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button
                        className="fixed inset-x-0 flex items-center justify-between w-full px-4 py-2 text-white bg-black bottom-3"
                        type="button"
                      >
                        <span className="font-mono text-lg font-semibold">
                          Details
                        </span>
                        <ChevronUpIcon />
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="flex h-[80%] flex-col space-y-5 bg-zinc-50 py-8 text-zinc-950">
                      <ul className="flex flex-col gap-4 text-xs text-muted-foreground">
                        <li>Step 1: Assess your business needs</li>
                        <li>Identify your target market</li>
                        <li>Analyze your product or service</li>
                        <li>Determine financial features to embed</li>
                        <li>
                          Step 2: Choose the right embedded finance platform
                        </li>
                        <li>Types of financial partners to consider</li>
                        <li>Evaluate potential partners</li>
                        <li>Establish a strong partnership</li>
                        <li>
                          Step 3: Overcome common challenges with implementation
                        </li>
                      </ul>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <TOC selector=".prose" />
                )}
                <div className="mt-10">
                  <h3 className="mb-2 text-xl font-semibold text-secondary-foreground">
                    Reacciones
                  </h3>
                  <div
                    className="grid max-w-[200px] grid-cols-4 gap-2 text-2xl"
                    id="reactions"
                  >
                    <Toggle className="text-xl">🔥</Toggle>

                    <Toggle className="text-xl">🚀</Toggle>

                    <Toggle className="text-xl">🤖</Toggle>

                    <Toggle className="text-xl">🦄</Toggle>

                    <Toggle className="text-xl">👾</Toggle>

                    <Toggle className="text-xl">🦾</Toggle>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 ">
              <div className="prose prose-p:text-muted-foreground prose-p:leading-[1.2] prose-p:mb-4 prose-h2:mt-0 prose-h3:mt-0 prose-h2:mb-3 prose-h3:mb-3 prose-h2:text-secondary-foreground dark:prose-invert">
                <ContentPost content={post.content} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-xs text-muted-foreground">
                  SHARE THIS ARTICLE
                </span>
                <div className="flex gap-2">
                  <Twitter className="text-lg" />
                  <Instagram className="text-lg" />
                </div>
              </div>
              {post && <Comments post={post} />}
            </div>
          </div>
        </div>
        <div className="grid gap-3 pb-10 md:grid-cols-2 lg:grid-cols-3">
          <article>
            <img
              src="https://pipe.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F141240%2F1400x840%2Fb2c8314c04%2Fhow-to-utilize-business-loans-for-expansion.png&w=1080&q=75"
              alt=""
              className="p-12"
            />
            <div className="text-xs text-medium text-muted-foreground">
              <time>July 20, 2023</time> — <span>9min read</span>
            </div>
            <div className="flex gap-1.5 my-2">
              <span className="text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-2300 dark:border-zinc-800 hover:underline">
                Tools and Resources
              </span>
              <span className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline">
                Product
              </span>
              <span className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline">
                Product Partnerships
              </span>
            </div>
            <h3 className="text-3xl font-bold">
              How to utilize business loans for expansion
            </h3>
          </article>
          <article>
            <img
              src="https://pipe.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F141240%2F1400x840%2Fb2c8314c04%2Fhow-to-utilize-business-loans-for-expansion.png&w=1080&q=75"
              alt=""
              className="p-12"
            />
            <div className="text-xs text-medium text-muted-foreground">
              <time>July 20, 2023</time> — <span>9min read</span>
            </div>
            <div className="flex gap-1.5 my-2">
              <span className="text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-2300 dark:border-zinc-800 hover:underline">
                Tools and Resources
              </span>
              <span className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline">
                Product
              </span>
              <span className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline">
                Product Partnerships
              </span>
            </div>
            <h3 className="text-3xl font-bold">
              How to utilize business loans for expansion
            </h3>
          </article>
          <article>
            <img
              src="https://pipe.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F141240%2F1400x840%2Fb2c8314c04%2Fhow-to-utilize-business-loans-for-expansion.png&w=1080&q=75"
              alt=""
              className="p-12"
            />
            <div className="text-xs text-medium text-muted-foreground">
              <time>July 20, 2023</time> — <span>9min read</span>
            </div>
            <div className="flex gap-1.5 my-2">
              <span className="text-muted-foreground animate-background-shine rounded-full px-2.5 py-0.5 font-medium border border-zinc-2300 dark:border-zinc-800 hover:underline bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] text-xs text-slate-300 backdrop-blur-3xl">
                Tools and Resources
              </span>
              <span className="inline-flex h-full hover:animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-2.5 py-0.5 text-xs font-medium text-slate-300 backdrop-blur-3xl">
                Web develop
              </span>
            </div>
            <h3 className="text-3xl font-bold">
              How to utilize business loans for expansion
            </h3>
          </article>
        </div>
      </section>
    </>
  );
}
