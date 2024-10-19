import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Game() {
  return (
    <View>
      <Stack.Screen options={{ title: "Game", headerShown: true }} />
      <Text>This is a game screen</Text>
    </View>
  );
}
