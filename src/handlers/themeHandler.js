import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Custom hook for theme management using next-themes
 * Separates theme logic from components
 */
export const useThemeHandler = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  /**
   * Set a specific theme
   * @param {string} newTheme - 'light', 'dark', or 'system'
   */
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  /**
   * Check if current theme is dark
   */
  const isDark = resolvedTheme === "dark";

  /**
   * Check if current theme is light
   */
  const isLight = resolvedTheme === "light";

  /**
   * Get current theme name (resolved, not 'system')
   */
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
