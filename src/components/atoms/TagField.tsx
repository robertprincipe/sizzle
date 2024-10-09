import useClickOutside from "@/hooks/useClickOutside";
import { ITag } from "@/types/iblog";
import { X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import AutosizeInput from "react-18-input-autosize";

type ITagFieldProps = {
  tag: ITag;
  removeTag: (name: string) => void;
};

const TagField = ({ tag, removeTag }: ITagFieldProps) => {
  return (
    <div
      className={`flex text-foreground items-center whitespace-nowrap rounded-lg border border-border p-1.5 text-xs font-bold cursor-default select-none`}
    >
      #{tag.name}
      <X className="h-4 cursor-pointer" onClick={() => removeTag(tag.name)} />
    </div>
  );
};

export default TagField;
