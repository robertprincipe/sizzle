import { ITag } from "@/types/iblog";
import { X } from "lucide-react";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import TagField from "./InputTags";

type ITagsAddedProps = {
  tagsAdded: ITag[];
  validateTagName: (tagQuery: string, key: string) => string | undefined;
  removeTag: (tag: ITag) => void;
  setTags: Dispatch<SetStateAction<ITag[]>>;
};

/*
maick
gi5o3o2i9
*/

const TagsAdded: React.FC<ITagsAddedProps> = ({
  tagsAdded,
  removeTag,
  validateTagName,
  setTags,
}) => {
  const [editTag, setEditTag] = useState<ITag>();

  return (
    <div className="flex space-x-1">
      {tagsAdded?.map((tag, idx) => (
        <TagField />
      ))}
    </div>
  );
};

export default TagsAdded;
