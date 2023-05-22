import Table from "@editorjs/table";
import Header from "@editorjs/header";

import { useRef, useState, useCallback, useEffect } from "react";

import EditorJS, { ToolConstructable } from "@editorjs/editorjs";

import Wizzard from "../plugin/Wizzard";
import MarkerTool from "../plugin/InlineWizz";
import ImageKit from "../plugin/CustomImage";
import { uploadByFile } from "@/services/image";
import API from "@/lib/api";

type IRichTextEditorProps = {
  initialBlocks?: any;
  onChange: (blocks: any) => void;
};

const RichTextEditor = ({ initialBlocks, onChange }: IRichTextEditorProps) => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: JSON.parse(initialBlocks),
        onReady() {
          ref.current = editor;
        },
        onChange: async () => {
          onChange(JSON.stringify(await editor.saver.save()));
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          image: {
            class: ImageKit as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              uploader: {
                uploadByFile: (file: File) => {
                  const formData = new FormData();
                  formData.append("image", file);
                  return API.post("upload-image", formData).then(({ data }) => {
                    return {
                      success: 1,
                      file: {
                        url: `https://ik.imagekit.io/huvmeuk1y/${data.name}`,
                        imageId: data.image_id,
                      },
                    };
                  });
                },
              },
            },
          },

          header: Header,
          table: Table,
          wizzard: Wizzard,
          mark: MarkerTool,
        },
      });
    }
  }, [initialBlocks]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <>
      <div id="editor" className="min-h-[200px]" />
      <p className="hidden text-sm text-gray-500 md:block">
        Use{" "}
        <kbd className="px-1 text-xs uppercase border rounded-md bg-slate-50">
          Tab
        </kbd>{" "}
        to open the command menu.
      </p>
    </>
  );
};

export default RichTextEditor;
