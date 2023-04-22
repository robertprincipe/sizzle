import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { systemTheme, resolvedTheme, theme, setTheme } = useTheme();

  const changeTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const getTheme = () => {
    return theme === "system" ? systemTheme : theme;
  };

  return (
    <Switch
      onCheckedChange={() => changeTheme()}
      checked={getTheme() === "dark"}
    />
  );
}
