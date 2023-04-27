import { ITag } from "@/types/iblog";

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
          className="absolute inset-x-0 z-10 block w-full mt-2 bg-white divide-y divide-gray-100 rounded shadow top-14"
          // style=""
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {suggestedTags?.map((t, idx) => (
              <li key={idx}>
                <label
                  className="flex items-center w-full px-3 py-2 rounded-md cursor-pointer select-none hover:bg-gray-200"
                  htmlFor={t.name}
                >
                  <input
                    id={t.name}
                    type="checkbox"
                    value={t.name}
                    name={t.name}
                    checked={!!tagsAdded.find((ta) => ta.name === t.name)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
