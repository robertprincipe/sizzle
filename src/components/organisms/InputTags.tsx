import { KeyboardEvent, useEffect } from "react";
import { createRef, useState } from "react";

import { ITag } from "@/types/iblog";
import { ZodError, z } from "zod";
import TagField from "../atoms/TagField";
import Feedback from "../atoms/Feedback";

const tagNameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
  message: "La consulta solo puede contener letras y números",
});

type InputTagProps = {
  defaultTags?: ITag[];
  onChange: (tags: ITag[]) => void;
};

const InputTag = ({ defaultTags, onChange }: InputTagProps) => {
  const inputTagRef = createRef<HTMLInputElement>();
  const [tags, setTags] = useState<ITag[] | undefined>(defaultTags);

  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (defaultTags) setTags(defaultTags);
  }, [defaultTags]);

  useEffect(() => {
    if (tags) onChange(tags);
  }, [tags, onChange]);

  const getValue = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    let tagQuery = (e.target as HTMLInputElement).value;

    // eliminar el ultimo tag cuando se haga click a borrar
    if (e.key === "Backspace" && tagQuery === "") {
      if (tags) {
        // elimnar el ultimo elemento de tags
        setTags(tags.slice(0, -1));
      }
      return;
    }

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

        if (inputTagRef.current) inputTagRef.current.value = "";
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

  return (
    <label
      htmlFor="input-tags"
      className={`relative block cursor-text bg-transparent text-sm text-gray-900 dark:text-white`}
    >
      <div className="flex">
        <div className="flex space-x-1">
          {tags?.map((tag, idx) => (
            <TagField key={idx} tag={tag} removeTag={removeTag} />
          ))}
        </div>
        {tags && tags?.length < 3 ? (
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
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </label>
  );
};

export default InputTag;
