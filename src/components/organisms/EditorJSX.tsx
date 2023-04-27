import Table from "@editorjs/table";
import Header from "@editorjs/header";
import Image from "@editorjs/image";

import { useRef, useState, useCallback, useEffect } from "react";

import EditorJS from "@editorjs/editorjs";

import Wizzard from "../plugin/Wizzard";
import MarkerTool from "../plugin/InlineWizz";

type IEditorJSXProps = {
  blocks?: any;
  setBlocks: (blocks: any) => void;
};

const EditorJSX = ({ blocks, setBlocks }: IEditorJSXProps) => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    // const body = ;
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: blocks,
        onReady() {
          ref.current = editor;
        },
        onChange: async () => {
          setBlocks(await editor.saver.save());
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        // data: body.content,
        tools: {
          image: {
            class: Image,
            inlineToolbar: true,
          },
          header: Header,
          table: Table,
          wizzard: Wizzard,
          mark: MarkerTool,
        },
      });
    }
  }, []);

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

export default EditorJSX;
