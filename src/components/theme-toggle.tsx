import { useTheme } from "@/hooks/useTheme";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="sm" onClick={() => toggleTheme()}>
      <Icons.sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    // <Switch
    //   onCheckedChange={() => toggleTheme()}
    //   checked={resolvedTheme === "dark"}
    // />
  );
}
