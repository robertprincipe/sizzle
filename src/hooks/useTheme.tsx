import { createContext, useContext, useState, useEffect } from "react";

type Theme = "system" | "dark" | "light";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(theme || systemTheme); // Aquí se utiliza la variable theme en lugar de savedTheme
    localStorage.setItem("theme", theme || systemTheme);
  }, [theme]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.classList.remove("dark", "light");
      html.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const savedTheme = localStorage.getItem("theme") as Theme;
  console.log(savedTheme);
  const resolvedTheme = theme === "system" ? savedTheme || systemTheme : theme;

  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { systemTheme, resolvedTheme, theme, setTheme: updateTheme };
};
