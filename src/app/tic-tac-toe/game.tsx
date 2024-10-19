import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/providers/ThemeProvider";
import copyToClipboard from "@/src/utils/copyToClipboard";
import MyTiles from "@/src/components/tic-tac-toe/MyTiles";

export default function Game() {
  const [roomFull, setRoomFull] = useState(true);
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Game", headerShown: true, headerBackTitle: "Back" }} />
      {roomFull ? (
        <MyTiles />
      ) : (
        <View>
          <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 15 }}>
            Waiting for other player
          </Text>
          <Pressable onPress={() => copyToClipboard("test random")}>
            <View>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Room Code: 303030{" "}
                <MaterialIcons
                  name="content-paste"
                  size={18}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
