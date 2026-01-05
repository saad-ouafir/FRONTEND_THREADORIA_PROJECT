import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeHandler = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";
  const currentTheme = resolvedTheme;

  return {
    theme, // Raw theme value ('light', 'dark', 'system')
    resolvedTheme, // Actual theme being used (resolves 'system')
    systemTheme, // System preference
    currentTheme, // Alias for resolvedTheme
    mounted, // Whether component has mounted (for SSR)
    isDark, // Boolean: is dark mode active
    isLight, // Boolean: is light mode active
    toggleTheme, // Function: toggle between light/dark
    changeTheme, // Function: set specific theme
    setTheme, // Raw setTheme from next-themes
  };
};

export default useThemeHandler;
