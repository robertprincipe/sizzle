import { ITag } from "@/types/tag";

type ISuggestedTagsProps = {
  suggestedTags: ITag[];
  tagsAdded: ITag[];
  openDropdown: boolean;
  toggleTag: (tag: ITag) => void;
};

const SuggestedTags: React.FC<ISuggestedTagsProps> = ({
  suggestedTags,
  toggleTag,
  openDropdown,
  tagsAdded,
}) => {
  const onClickAddTag = (tag: ITag) => {
    toggleTag(tag);
  };

  return (
    <>
      {openDropdown && tagsAdded.length < 3 && (
        <div
          id="dropdownDefaultCheckbox"
          className="absolute inset-x-0 top-14 z-10 mt-2 block w-full divide-y divide-gray-100 rounded bg-white shadow"
          // style=""
        >
          <ul className="space-y-3 p-3 text-sm text-gray-700">
            {suggestedTags?.map((t, idx) => (
              <li key={idx}>
                <label
                  className="flex items-center w-full hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer select-none"
                  htmlFor={t.name}
                >
                  <input
                    id={t.name}
                    type="checkbox"
                    value={t.name}
                    name={t.name}
                    checked={!!tagsAdded.find((ta) => ta.name === t.name)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    onChange={() => onClickAddTag(t)}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {t.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SuggestedTags;
