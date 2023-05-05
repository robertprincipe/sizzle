import Table from "@editorjs/table";
import Header from "@editorjs/header";
import Image from "@editorjs/image";

import { useRef, useState, useCallback, useEffect } from "react";

import EditorJS from "@editorjs/editorjs";

import Wizzard from "../plugin/Wizzard";
import MarkerTool from "../plugin/InlineWizz";

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
