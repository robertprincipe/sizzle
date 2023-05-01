import EmojiPicker from "@emoji-mart/react";
import { useTheme } from "next-themes";

const EmojiPick = ({ reactToPost }: { reactToPost: (emoji: any) => void }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="absolute -translate-x-1/2 bottom-14 left-1/2">
      <EmojiPicker
        theme={resolvedTheme === "system" ? "auto" : resolvedTheme}
        showPreview={false}
        emojiTooltip={true}
        onEmojiSelect={reactToPost}
      />
    </div>
  );
};

export default EmojiPick;
