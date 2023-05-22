import { createContext, useContext, useState, useEffect } from "react";

type INativeTheme = "system" | "light" | "dark";
type IAppTHeme = "light" | "dark";

interface ThemeContextProps {
  theme: INativeTheme;
  systemTheme: IAppTHeme;
  resolvedTheme?: IAppTHeme;
  setTheme: (theme: INativeTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  systemTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [theme, setTheme] = useState<INativeTheme>(
    () => (localStorage.getItem("front-theme") as INativeTheme) || "system"
  );

  const [resolvedTheme, setResolvedTheme] = useState<IAppTHeme>(
    theme === "system" ? systemTheme : theme
  );

  useEffect(() => {
    const resolveTheme = theme === "system" ? systemTheme : theme;
    document.documentElement.classList.value = resolveTheme;
    localStorage.setItem("front-theme", theme);
    setResolvedTheme(resolveTheme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider
      value={{ theme, systemTheme, setTheme, toggleTheme, resolvedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
