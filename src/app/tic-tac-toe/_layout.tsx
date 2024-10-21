import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function TicTacToeLayout() {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("id");
      if (!token) {
        router.replace("/sign-in");
      }
    };
    checkToken();
  }, []);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Play Tic Tac Toe" }} />
      <Stack.Screen name="ticTacToeBoard" options={{ title: "Tic Tac Toe" }} />
    </Stack>
  );
}
