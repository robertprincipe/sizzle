import { ITag } from "@/types/iblog";
import { Hash } from "lucide-react";

type ISuggestedTagsProps = {
  suggestedTags: ITag[];
  tagsAdded: ITag[];
  openDropdown: boolean;
  addTag: (tag: ITag) => void;
};

const SuggestedTags: React.FC<ISuggestedTagsProps> = ({
  suggestedTags,
  addTag,
  openDropdown,
  tagsAdded,
}) => {
  const onClickAddTag = (tag: ITag) => {
    addTag(tag);
  };

  return (
    <>
      <div
        id="dropdownDefaultCheckbox"
        className={`h-fit transition-[height] duration-200 ease-in-out absolute inset-x-0 z-10 block w-full mt-2 bg-white dark:text-light dark:bg-dark divide-y divide-muted rounded shadow top-14`}
        // style=""
      >
        <ul className="pl-0 my-0 space-y-1 text-sm list-none">
          {suggestedTags?.map((t, idx) => (
            <li className="pl-0 my-0" key={idx}>
              <div
                className={`w-full overflow-hidden rounded-md cursor-pointer select-none hover:bg-muted dark:bg-dark dark:hover:bg-dark ${
                  tagsAdded.find((ta) => ta.name === t.name)
                    ? "bg-muted dark:bg-sky-400/70"
                    : ""
                }`}
                onClick={() => onClickAddTag(t)}
              >
                <div
                  className={`w-full px-3 py-1 border-muted rounded focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all duration-100`}
                >
                  <div className="flex items-center">
                    <span>#</span>
                    <span>{t.name}</span>
                  </div>
                  <span className="text-xs font-light mt-0.5">
                    {t?.description}
                  </span>
                </div>

                <div
                  className="w-full h-1"
                  style={{ backgroundColor: t.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SuggestedTags;
