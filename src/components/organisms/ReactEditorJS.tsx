import React from "react";

import { createReactEditorJS } from "react-editor-js";

const ReactEditor = createReactEditorJS();

import Table from "@editorjs/table";

import Image from "@editorjs/image";

import Header from "@editorjs/header";

import Wizzard from "../plugin/Wizzard";
import MarkerTool from "../plugin/InlineWizz";

type IRichTextEditorProps = {
  initialBlocks?: any;
  setBlocks: (blocks: any) => void;
};

export const EDITOR_JS_TOOLS = {
  table: Table,
  image: Image,
  header: Header,
  wizzard: Wizzard,
  mark: MarkerTool,
};

const ReactEditorJS = ({ setBlocks, initialBlocks }: IRichTextEditorProps) => {
  return (
    <ReactEditor
      tools={EDITOR_JS_TOOLS}
      defaultValue={initialBlocks}
      onChange={setBlocks}
      minHeight={200}
    />
  );
};

export default ReactEditorJS;
