import Tags from "@yaireo/tagify/dist/react.tagify";

const baseTagifySettings = {
  blacklist: [],
  maxTags: 6,
  backspace: "edit",
  placeholder: "type something",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {},
};

const TagField = ({ label, name, initialValue = [] }: any) => {
  const handleChange = (e: any) => {
    console.log(
      e.type,
      " ==> ",
      e.detail.tagify.value.map((item: any) => item.value)
    );
  };

  const suggestions = [
    "apple",
    "banana",
    "cucumber",
    "dewberries",
    "elderberry",
    "farkleberry",
    "grapes",
    "hackberry",
    "imbe",
    "jambolan",
    "kiwi",
    "lime",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberries",
    "strawberries",
    "tangerine",
    "ugni",
    "voavanga",
    "watermelon",
    "xigua",
    "yangmei",
    "zucchini",
  ];

  const settings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
    },
  };

  return (
    <div className="form-group">
      <label htmlFor={"field-" + name}>{label}</label>
      <Tags settings={settings} initialValue={initialValue} />
    </div>
  );
};

// ================= APP ======================

export default TagField;
