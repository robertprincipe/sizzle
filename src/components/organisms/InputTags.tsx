import { useState, KeyboardEvent, useEffect, useRef } from "react";

import { ITag } from "@/types/iblog";
import { ZodError, z } from "zod";
import TagField from "../atoms/TagField";
// import Feedback from "../atoms/Feedback";
import SuggestedTags from "../molecules/SuggestedTags";
import { searchTags } from "@/services/blog";
import { useClickAway } from "react-use";

const tagNameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
  message: "La consulta solo puede contener letras y números",
});

type InputTagProps = {
  defaultTags?: ITag[];
  onChange: (tags: ITag[]) => void;
};

const InputTag = ({ defaultTags, onChange }: InputTagProps) => {
  const inputTagRef = useRef<HTMLInputElement>(
    document.querySelector("#input-tags")
  );
  const [tags, setTags] = useState<ITag[] | undefined>(defaultTags);
  const [tagsSuggested, setTagsSuggested] = useState<ITag[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const suggestedTagsRef = useRef<HTMLDivElement>(
    document.querySelector("#suggested-tags")
  );
  useClickAway(suggestedTagsRef, () => setTagsSuggested([]));

  const getSuggestedTags = async (tagQuery: string) => {
    try {
      const tagsSuggested = await searchTags(tagQuery);
      if (tagsSuggested) {
        setTagsSuggested(tagsSuggested);
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (defaultTags) setTags(defaultTags);
  }, [defaultTags]);

  useEffect(() => {
    if (tags) onChange(tags);
  }, [tags, onChange]);

  const getValue = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    let tagQuery = (e.target as HTMLInputElement).value;

    await getSuggestedTags(tagQuery);

    try {
      if ((e.key === "Enter" || e.key === ",") && tagQuery !== "") {
        if (tagQuery.charAt(tagQuery.length - 1) === ",") {
          tagQuery = tagQuery.slice(0, -1);
        }
        const validatedName = tagNameSchema.parse(tagQuery.trim());
        if (tags?.some((t) => t.name === validatedName)) {
          setErrorMessage("El tag ya fue agregado");
          return;
        }

        if (tags && validatedName)
          setTags([
            ...tags,
            {
              name: validatedName,
            },
          ]);
        if (inputTagRef.current) {
          inputTagRef.current.value = "";
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(error.errors[0].message);
        return;
      }
    }

    setInterval(() => {
      setErrorMessage(undefined);
    }, 7000);
  };

  const removeTag = (name: string) => {
    if (tags) setTags(tags.filter((ptag) => ptag.name !== name));
  };

  const addTag = (tag: ITag) => {
    if (tags && tags?.length > 1) {
      setTagsSuggested([]);
    }
    if (tags?.some((t) => t.name === tag.name)) {
      setTags((prev) => prev?.filter((t) => t.name !== tag.name));
      return;
    }
    if (tags?.length === 0) {
      setTags([tag]);
    } else if (tags) {
      setTags([...tags, tag]);
    }
    if (tagsSuggested.length === 1) {
      setTagsSuggested([]);
    }
    if (inputTagRef.current) {
      inputTagRef.current.value = "";
      inputTagRef.current.focus();
    }
  };

  // eliminar onKeyUp tag
  const deleteOnBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return e.preventDefault();
    }
    // eliminar el ultimo tag cuando se haga click a borrar
    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      if (tags) {
        // elimnar el ultimo elemento de tags
        setTags(tags.slice(0, -1));
      }
      return;
    }
  };

  return (
    <label
      htmlFor="input-tags"
      className="relative block text-sm text-app-dark bg-transparent cursor-text dark:text-light"
    >
      <div className="flex mb-2">
        <div className="flex space-x-1">
          {tags?.map((tag, idx) => (
            <TagField key={idx} tag={tag} removeTag={removeTag} />
          ))}
        </div>
        {tags && tags?.length < 3 ? (
          <input
            id="input-tags"
            name="input-tags"
            className={`w-full min-w-[50%] bg-transparent focus:outline-none ${
              tags.length > 0 ? "pl-3" : ""
            }`}
            onKeyUp={getValue}
            autoComplete="off"
            onKeyDown={deleteOnBackspace}
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
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}

      <div id="suggested-tags" ref={suggestedTagsRef}>
        <SuggestedTags
          tagsAdded={tags || []}
          addTag={addTag}
          openDropdown={!!tagsSuggested.length}
          suggestedTags={tagsSuggested}
        />
      </div>
    </label>
  );
};

export default InputTag;
