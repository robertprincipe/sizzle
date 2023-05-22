import { useTheme } from "@/hooks/useTheme";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <Switch
      onCheckedChange={() => toggleTheme()}
      checked={resolvedTheme === "dark"}
    />
  );
}
