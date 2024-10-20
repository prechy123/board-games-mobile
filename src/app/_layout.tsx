import { Stack, Tabs } from "expo-router";
import AllProvider from "../providers/AllProvider";
import { useSelector } from "react-redux";
import { RootState } from "../types/user";

export default function RootLayout() {
  const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated)
  console.log(isAuthenticated)
  return (
    <AllProvider>
      {/* {isAuthenticated ?  */}
      {/* ( */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="tic-tac-toe" options={{ headerShown: false }} />
      </Stack>

      {/* ): (
        <Tabs>
          <Tabs.Screen name="sign-in"/>
          <Tabs.Screen name="sign-Up"/>
        </Tabs>
      )} */}
    </AllProvider>
  );
}
