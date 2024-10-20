import { Stack, Tabs } from "expo-router";
import AllProvider from "../providers/AllProvider";
import { useAuth } from "../providers/AuthProvider";

export default function RootLayout() {
  return (
    <AllProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="tic-tac-toe" options={{ headerShown: false }} />
      </Stack>
    </AllProvider>
  );
}
