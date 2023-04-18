import useClickOutside from "@/hooks/useClickOutside";
import { ITag } from "@/types/tag";
import { X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import AutosizeInput from "react-18-input-autosize";

type ITagFieldProps = {
  tag: ITag;
  updatedTag: (tag: ITag) => void;
  removeTag: (name: string) => void;
};

const TagField = ({ tag, removeTag, updatedTag }: ITagFieldProps) => {
  const [editTag, setEditTag] = useState<ITag>();
  const inputEditRef = useRef<HTMLInputElement>(
    document.querySelector("#tag-field")
  );

  const getValue = async (e: KeyboardEvent<HTMLInputElement>) => {
    let tagQuery = (e.target as HTMLInputElement).value;
    if ((e.key === "Enter" || e.key === ",") && tagQuery !== "") {
      updatedTag({ ...tag, name: tagQuery });
      setEditTag(undefined);
    }
  };

  const autoWidth = () => {
    console.log("auto2");
    if (inputEditRef.current) {
      inputEditRef.current.style.width = `${inputEditRef.current.value.length}ch`;
      console.log("auto3");
    }
  };

  const onEditTag = () => {
    console.log("auto1");
    autoWidth();
    if (inputEditRef.current) inputEditRef.current.focus();
    setEditTag(tag);
  };

  return (
    <div
      className={`flex items-center whitespace-nowrap rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-bold text-gray-800 ${
        editTag ? "bg-blue-300" : "bg-gray-300"
      }`}
      onClick={() => onEditTag()}
    >
      #
      <input
        id="tag-field"
        className={`bg-transparent border-none focus:outline-none ${
          editTag ? "block" : "hidden"
        }`}
        onKeyUp={getValue}
        ref={inputEditRef}
        defaultValue={tag.name}
        onChange={() => autoWidth()}
      />
      <span
        className={`bg-transparent border-none focus:outline-none ${
          editTag ? "hidden" : "block"
        }`}
      >
        {tag.name}
      </span>
      <X
        className="h-4 ml-2 cursor-pointer"
        onClick={() => removeTag(tag.name)}
      />
    </div>
  );
};

export default TagField;
