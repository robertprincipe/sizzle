import EditorJS, { ToolConstructable } from "@editorjs/editorjs";

import Table from "@editorjs/table";
import Header from "@editorjs/header";

import { useRef, useState, useCallback, useEffect } from "react";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import Paragraph from "@editorjs/paragraph";

import Wizzard from "../plugin/Wizzard";
import MarkerTool from "../plugin/InlineWizz";
import ImageKit from "../plugin/CustomImage";
import ColorPlugin from "editorjs-text-color-plugin";
import TextAlign from "@canburaks/text-align-editorjs";

import { uploadByFile } from "@/services/image";
import API from "@/lib/api";
// import Timeline from "../plugin/Timeline";

type IRichTextEditorProps = {
  initialBlocks?: any;
  onChange: (blocks: any) => void;
};

const RichTextEditor = ({ initialBlocks, onChange }: IRichTextEditorProps) => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleReady = (editor: EditorJS) => {
    ref.current = editor;
    new Undo({ editor });
    new DragDrop(editor);
  };

  const initializeEditor = useCallback(async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: JSON.parse(initialBlocks),
        onReady() {
          handleReady(editor);
        },
        onChange: async () => {
          onChange(JSON.stringify(await editor.saver.save()));
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          header: {
            class: Header,
          },
          paragraph: {
            class: Paragraph,
          },
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
          // timeLine: Timeline,
          table: Table,
          textAlign: TextAlign,
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              colorCollections: [
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
              ],
              defaultColor: "#FF1300",
              type: "text",
              customPicker: true, // add a button to allow selecting any colour
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paintbrush"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>`,
            },
          },
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              defaultColor: "#FFBF00",
              colorCollections: [
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
              ],
              customPicker: true, // add a button to allow selecting any colour
              type: "marker",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-highlighter"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>`,
            },
          },
          wizzard: Wizzard,
          paraphrase: MarkerTool,
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
      <p className="hidden text-sm text-muted md:block">
        Use{" "}
        <kbd className="px-1 text-xs uppercase border rounded-md bg-light">
          Tab
        </kbd>{" "}
        to open the command menu.
      </p>
    </>
  );
};

export default RichTextEditor;
