import { useTheme } from "@/hooks/useTheme";
import EmojiPicker from "@emoji-mart/react";

const EmojiPick = ({ reactToPost }: { reactToPost: (emoji: any) => void }) => {
  const { resolvedTheme } = useTheme();
  return (
    <EmojiPicker
      theme={resolvedTheme}
      showPreview={false}
      emojiTooltip={true}
      onEmojiSelect={reactToPost}
    />
  );
};

export default EmojiPick;
