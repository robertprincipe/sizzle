import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { createRef, useState } from "react";

import { ITag } from "@/types/iblog";
import { ZodError, z } from "zod";
import TagField from "../atoms/TagField";

const tagNameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
  message: "La consulta solo puede contener letras y números",
});

type InputTagProps = {
  tags: ITag[];
  setTags: Dispatch<SetStateAction<ITag[]>>;
};

const InputTag = ({ tags, setTags }: InputTagProps) => {
  const inputTagRef = createRef<HTMLInputElement>();

  const [errorMessage, setErrorMessage] = useState<string>();

  // const [openDropdown, setOpenDropdown] = useState(false);
  // const collectionDropdownRef = useClickOutside(() => setOpenDropdown(false));

  const validateTagName = (tagQuery: string): string | undefined => {
    try {
      if (tagQuery.charAt(tagQuery.length - 1) === ",") {
        tagQuery = tagQuery.slice(0, -1);
      }
      const validatedName = tagNameSchema.parse(tagQuery);
      if (tags?.some((t) => t.name === validatedName)) {
        throw new Error("El tag ya fue agregado");
      }
      return validatedName;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.errors[0].message);
      }
    }
  };

  const getValue = async (e: KeyboardEvent<HTMLInputElement>) => {
    let tagQuery = (e.target as HTMLInputElement).value;
    try {
      if ((e.key === "Enter" || e.key === ",") && tagQuery !== "") {
        const validatedName = validateTagName(tagQuery);
        setTags([
          ...tags,
          {
            name: validatedName || "",
          },
        ]);

        if (inputTagRef.current) inputTagRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(error.errors[0].message);
      }
    }

    // if (tagQuery.length > 0) {
    //   setOpenDropdown(true);
    // } else {
    //   setOpenDropdown(false);
    // }
  };

  const updatedTag = (tag: ITag) => {
    const validatedName = validateTagName(tag.name);
    setTags((prev) =>
      prev.map((ptag) => {
        if (tag && tag.name === ptag.name) {
          return { ...ptag, name: validatedName || "" };
        }
        return ptag;
      })
    );
  };

  const removeTag = (name: string) => {
    setTags((prev) => prev.filter((ptag) => ptag.name !== name));
  };

  return (
    <label
      htmlFor="input-tags"
      className={`relative block cursor-text bg-transparent py-2.5 text-sm text-gray-900 dark:text-white`}
      // ref={collectionDropdownRef}
    >
      <div className="flex">
        <div className="flex space-x-1">
          {tags?.map((tag, idx) => (
            <TagField
              key={idx}
              tag={tag}
              updatedTag={updatedTag}
              removeTag={removeTag}
            />
          ))}
        </div>
        {tags.length < 3 ? (
          <input
            id="input-tags"
            name="input-tags"
            className={`w-full min-w-[50%] bg-transparent py-2 focus:outline-none ${
              tags.length > 0 ? "pl-3" : ""
            }`}
            onKeyUp={getValue}
            autoComplete="off"
            onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : null)}
            placeholder={`${
              tags.length > 0
                ? "Agregar otro"
                : "Agrega hasta 3 etiquetas con coma o enter"
            }`}
            ref={inputTagRef}
          />
        ) : null}
      </div>

      {errorMessage && (
        <span className="text-sm font-medium text-red-500">{errorMessage}</span>
      )}

      {/* <SuggestedTags
        toggleTag={[] as ITag[]}
        tagsAdded={tags}
        suggestedTags={suggestedCollections}
        openDropdown={openDropdown}
      /> */}
    </label>
  );
};

export default InputTag;
