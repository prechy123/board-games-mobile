import { MD3DarkTheme, MD3LightTheme, PaperProvider as Provider, adaptNavigationTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/color";
import React from "react";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);


export default function PaperProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  
  return (
    <Provider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
