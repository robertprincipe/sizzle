import { formatDate } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, MessageCircle, Share2, SmilePlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Blocks from "editorjs-blocks-react-renderer";
import Head from "@/components/shared/Head";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Comments from "@/components/organisms/Comments";

export default function PostPage() {
  const { resolvedTheme } = useTheme();
  const { slug } = useParams();
  const { data, isLoading } = useQuery(["postDetail"], () =>
    postDetail(slug || "")
  );

  const [isOpenReactions, setIsOpenReactions] = useState(false);
  const emojisRef = useClickOutside(() => setIsOpenReactions(false));

  useEffect(() => {
    window.scroll({ behavior: "smooth" });
  }, []);

  return (
    <section>
      {isLoading ? (
        <></>
      ) : (
        <section className="container relative max-w-3xl py-6 lg:py-10">
          <Head title={data?.data.title || ""} />
          <div>
            <time
              dateTime={""}
              className="block text-sm text-slate-600 dark:text-slate-300"
            >
              {formatDate(data?.data.created_at as Date)}
            </time>
            <h1 className="inline-block mt-2 text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl dark:text-white">
              {data?.data.title}
            </h1>
          </div>

          <img
            src={data?.data.cover_image as string}
            alt={data?.data.title}
            width={720}
            height={405}
            className="my-8 transition-colors rounded-md bg-slate-200 group-hover:border-slate-900"
          />
          <div className="prose prose-cyan max-w-none dark:prose-invert">
            <Blocks
              data={JSON.parse(
                data?.data.content ||
                  `{
              "time": 1564767102436,
              "blocks": [
                {
                  "type": "header",
                  "data": {
                    "level": 3,
                    "text": "Editor.js React Renderer"
                  }
                }
              ],
              "version": "2.14.0"
            }`
              )}
            />
          </div>

          <div>
            {data?.data.tags &&
              data?.data.tags.map((tag) => (
                <Link
                  className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                  to="/"
                  key={tag.id}
                >
                  {tag.name}
                </Link>
              ))}
          </div>

          <div className="sticky inset-x-0 text-center bottom-6">
            <div
              className="relative inline-block px-4 py-3 bg-white rounded-full shadow-md dark:bg-gray-800"
              ref={emojisRef}
            >
              {isOpenReactions && (
                <div className="absolute -translate-x-1/2 bottom-14 left-1/2">
                  <Picker
                    theme={resolvedTheme === "system" ? "auto" : resolvedTheme}
                    data={emojiData}
                    showPreview={false}
                    emojiTooltip={true}
                    onEmojiSelect={console.log}
                  />
                </div>
              )}
              <div className="flex items-center gap-x-1.5">
                <div className="inline-block hs-tooltip">
                  <button
                    className="flex items-center text-sm text-gray-500 hs-tooltip-toggle gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setIsOpenReactions(!isOpenReactions)}
                  >
                    <SmilePlus className="h-5" />
                    875
                    <span
                      className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded-md shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-black"
                      role="tooltip"
                    >
                      Like
                    </span>
                  </button>
                </div>

                <div className="block h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>

                <div className="inline-block hs-tooltip">
                  <a
                    className="flex items-center text-sm text-gray-500 hs-tooltip-toggle gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    href="#comments"
                  >
                    <MessageCircle className="h-5" />
                    16
                    <span
                      className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded-md shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-black"
                      role="tooltip"
                    >
                      Comment
                    </span>
                  </a>
                </div>

                <div className="block h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>

                <div className="relative inline-flex hs-dropdown">
                  <button
                    id="blog-article-share-dropdown"
                    className="flex items-center text-sm text-gray-500 hs-dropdown-toggle gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Share2 className="w-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Comments post={data?.data || {}} />
        </section>
      )}
    </section>
  );
}
