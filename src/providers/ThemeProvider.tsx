import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

interface ITheme {
  theme: "light" | "dark";
}

const ThemeContext = createContext<ITheme>({
  theme: "dark",
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || "dark");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setTheme(colorScheme);
      }
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
