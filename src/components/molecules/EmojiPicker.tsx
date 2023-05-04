import { useTheme } from "@/hooks/useTheme";
import EmojiPicker from "@emoji-mart/react";

const EmojiPick = ({ reactToPost }: { reactToPost: (emoji: any) => void }) => {
  const { systemTheme, resolvedTheme } = useTheme();
  return (
    <div className="absolute -translate-x-1/2 bottom-14 left-1/2">
      <EmojiPicker
        theme={systemTheme === "system" ? "auto" : resolvedTheme}
        showPreview={false}
        emojiTooltip={true}
        onEmojiSelect={reactToPost}
      />
    </div>
  );
};

export default EmojiPick;
